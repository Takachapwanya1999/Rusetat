"""Shared output craft: consistent icons and short-label typography."""
import re
from functools import lru_cache
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

@lru_cache(maxsize=None)
def icon(name):
    svg = (ROOT/'assets/icons'/f'{name}.svg').read_text(encoding='utf-8').strip()
    svg = re.sub(r'<!--.*?-->', '', svg, flags=re.S)
    svg = svg[svg.index('<svg'):]
    svg = re.sub(r'\sclass="[^"]*"', '', svg)
    return svg.replace('<svg', '<svg class="icon" aria-hidden="true" focusable="false"', 1)

GLYPHS = {'↗':'arrow-up-right', '→':'arrow-right', '←':'arrow-left', '↓':'download', '☰':'menu', '⌄':'chevron-down'}
SHORT_CLASSES = {'eyebrow', 'label', 'step-label', 'image-caption', 'photo-credit', 'day'}

class Presentation(HTMLParser):
    """Polish generated labels without changing article paragraphs or form values."""
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.parts=[]
        self.context=[]

    def handle_starttag(self, tag, attrs):
        self.parts.append(self.get_starttag_text())
        if tag not in {'img','input','meta','link','br','hr','source','area','base','embed','param','track','wbr'}:
            classes=set(dict(attrs).get('class','').split())
            self.context.append((tag, classes))

    def handle_endtag(self, tag):
        if tag=='summary':
            self.parts.append(icon('plus'))
        self.parts.append(f'</{tag}>')
        for index in range(len(self.context)-1, -1, -1):
            if self.context[index][0]==tag:
                del self.context[index:]
                break

    def handle_startendtag(self, tag, attrs):
        self.parts.append(self.get_starttag_text())

    def handle_data(self, data):
        if any(tag in {'script', 'style'} for tag, _ in self.context):
            self.parts.append(data)
            return
        short = any(tag in {'h1','h2','h3','button'} or classes & SHORT_CLASSES for tag,classes in self.context)
        if short:
            data=re.sub(r'\.(\s*)$', r'\1', data)
            if data.strip().isupper() and len(data.strip())>3:
                data=data.lower()
                data=re.sub(r'\S', lambda m:m.group().upper(), data, count=1)
                data=data.replace('Rusetat','RUSETAT')
        for glyph,name in GLYPHS.items():
            data=data.replace(glyph,icon(name))
        self.parts.append(data)

    def handle_entityref(self,name):
        self.parts.append('&'+name+';')

    def handle_charref(self,name):
        self.parts.append('&#'+name+';')

    def handle_decl(self,decl):
        self.parts.append('<!'+decl+'>')

def finish_markup(html):
    parser=Presentation()
    parser.feed(html)
    return ''.join(parser.parts)
