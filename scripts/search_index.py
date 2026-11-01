"""Extract public page content without repeated site navigation or footer text."""
from html.parser import HTMLParser


class SearchText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.parts = []
        self.headings = []

    def handle_starttag(self, tag, attrs):
        blocked = any(skip for _, skip in self.stack) or tag in {'script', 'style', 'svg'} or 'hidden' in dict(attrs)
        if tag not in {'img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'area', 'wbr', 'embed', 'param', 'track', 'col', 'base'}:
            self.stack.append((tag, blocked))

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        if any(skip for _, skip in self.stack):
            return
        text = ' '.join(data.split())
        if text:
            self.parts.append(text)
            if any(tag in {'h1', 'h2', 'h3'} for tag, _ in self.stack):
                self.headings.append(text)


def search_entry(title, url, body):
    parser = SearchText()
    parser.feed(body)
    return dict(title=title, url=url, headings=' '.join(parser.headings), content=' '.join(parser.parts))
