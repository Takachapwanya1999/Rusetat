"""Check approved route mapping, shared fallbacks and published asset boundaries."""
import json
from html.parser import HTMLParser
from pathlib import Path

from hosting import BASE_PATH
from inventory import PAGES
from stamps import STAMPS, STAMP_SLOT

ROOT = Path(__file__).resolve().parents[1]


class StampPage(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.marks = []
        self.stamp_images = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'div' and 'data-stamp' in attrs:
            self.marks.append(attrs)
        if tag == 'img' and '/images/stamps/' in attrs.get('src', ''):
            self.stamp_images.append(attrs)


def main():
    routes = {p[0] for p in PAGES if p[0]}
    assert set(STAMPS['pages']) <= routes, 'Unknown stamp route'
    assert len(STAMPS['pages']) == 20, 'Update approved count when adding reviewed art'
    approved = fallback = 0
    for slug, _, _, kind in PAGES:
        text = (ROOT / 'dist' / slug / 'index.html').read_text(encoding='utf-8')
        assert STAMP_SLOT not in text, f'Unresolved stamp slot: {slug}'
        page = StampPage(text)
        expected = []
        if kind != 'home':
            art = STAMPS['pages'].get(slug, STAMPS['default'])
            expected.append(art)
            placeholder = slug not in STAMPS['pages']
            assert page.marks[0]['data-stamp-placeholder'] == str(placeholder).lower(), slug
            if placeholder:
                fallback += 1
            else:
                approved += 1
        expected.append(STAMPS['footer'])
        assert len(page.marks) == len(expected), slug
        assert len(page.stamp_images) == len(expected), slug
        for attrs, image, art in zip(page.marks, page.stamp_images, expected):
            assert attrs['data-stamp'] == art['artwork'], slug
            assert image['src'] == BASE_PATH + '/' + art['file'], slug
            assert image['alt'] == '' and image['aria-hidden'] == 'true', slug
            assert int(image['width']) == art['width'] and int(image['height']) == art['height'], slug
            file = ROOT / 'dist' / art['file']
            assert file.is_file() and file.stat().st_size == art['bytes'], slug
            assert art['bytes'] < 64 * 1024, f'Oversize stamp: {file}'
    assert approved == 20 and fallback == 48
    assert not (ROOT / 'dist/assets/illustrations').exists(), 'Masters/review sheets must not ship'
    assert not list((ROOT / 'dist/images/stamps').glob('*.png')), 'PNG master leaked'
    print(f'PASS: {approved} approved page stamps, {fallback} generic placeholders, '
          f'{len(PAGES)} shared footer stamps; published files below 64 KiB.')


if __name__ == '__main__':
    main()
