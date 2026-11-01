"""Optional authoring tool: export approved masters as single-ink WebP assets.

Requires Pillow only for re-exporting artwork; the normal build uses committed files.
"""
import hashlib
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def export_art(record, width, suffix=''):
    source = Image.open(ROOT / record['master']).convert('RGBA')
    source.thumbnail((width, width), Image.Resampling.LANCZOS)
    # The reviewed art is one ink: remove generated RGB microvariation and
    # quantise coverage to eight levels, preserving transparent interior gaps.
    alpha = source.getchannel('A').point(lambda value: round(round(value * 7 / 255) * 255 / 7))
    if alpha.getextrema()[0] != 0:
        raise ValueError('Stamp must contain transparent pixels: ' + record['id'])
    ink = tuple(bytes.fromhex(record['ink'].lstrip('#')))
    image = Image.new('RGBA', source.size, (*ink, 0))
    image.putalpha(alpha)
    from io import BytesIO
    encoded = BytesIO()
    image.save(encoded, 'WEBP', lossless=True, method=6)
    payload = encoded.getvalue()
    digest = hashlib.sha256(payload).hexdigest()[:12]
    file = f'images/stamps/{record["id"]}{suffix}-{digest}.webp'
    (ROOT / file).parent.mkdir(parents=True, exist_ok=True)
    (ROOT / file).write_bytes(payload)
    return dict(file=file, width=image.width, height=image.height,
                bytes=len(payload), artwork=record['id'])


def main():
    catalogue = json.loads((ROOT / 'assets/illustrations/catalogue.json').read_text(encoding='utf-8'))
    pages = {}
    for record in catalogue['pages']:
        pages[record['route'].strip('/')] = export_art(record, 800)
    shared = catalogue['shared']
    manifest = dict(pages=pages, default=export_art(shared, 800, '-default'),
                    footer=export_art(shared, 320, '-footer'))
    (ROOT / 'content/stamps.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    entries = list(pages.values()) + [manifest['default'], manifest['footer']]
    print(f'Exported {len(entries)} files: {sum(e["bytes"] for e in entries):,} bytes total; '
          f'largest {max(e["bytes"] for e in entries):,} bytes.')


if __name__ == '__main__':
    main()
