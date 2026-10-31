"""Check the built catalogue: routes, assets, fragment targets and body child links."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from inventory import PAGES

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist'

class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.links=[];self.assets=[];self.ids=set();self.h1=0;self.main=False;self.body_links=[];self.missing_alt=0;self.markup_errors=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if len(a)!=len(attrs):self.markup_errors.append('duplicate attribute on '+tag)
        if tag=='main':self.main=True
        if tag=='h1':self.h1+=1
        if 'id' in a:
            if a['id'] in self.ids:self.markup_errors.append('duplicate id '+a['id'])
            self.ids.add(a['id'])
        if tag=='a' and a.get('href'):
            self.links.append(a['href'])
            if self.main:self.body_links.append(a['href'])
        if tag in ['img','script','link']:
            src=a.get('src') or a.get('href')
            if src:self.assets.append(src)
        if tag=='img' and not a.get('alt'):self.missing_alt+=1
    def handle_endtag(self,tag):
        if tag=='main':self.main=False

errors=[];parsed={}
for slug,title,parent,kind in PAGES:
    file=OUT/slug/'index.html'
    if not file.exists():errors.append('Missing page '+slug);continue
    p=Page(file.read_text(encoding='utf-8'));parsed[slug]=p
    if p.h1!=1:errors.append(f'{slug}: expected one h1; found {p.h1}')
    if p.missing_alt:errors.append(f'{slug}: missing image alt')
    errors.extend(f'{slug}: {message}' for message in p.markup_errors)
    for marker in ['\u00c2\u00b7','\u00e2\u20ac','\ufffd']:
        if marker in file.read_text(encoding='utf-8'):errors.append(f'{slug}: corrupted text encoding')
for slug,p in parsed.items():
    for href in p.links+p.assets:
        u=urlsplit(href)
        if u.scheme or u.netloc:continue
        path=unquote(u.path).lstrip('/')
        target=OUT/path if path else OUT/slug
        if not Path(path).suffix:target=target/'index.html'
        if not target.exists():errors.append(f'{slug}: broken local target {href}');continue
        if u.fragment and target.suffix=='.html':
            other=Page(target.read_text(encoding='utf-8'))
            if unquote(u.fragment) not in other.ids:errors.append(f'{slug}: missing fragment {href}')
for slug,title,parent,kind in PAGES:
    if parent and parent in parsed:
        expected='/'+slug+'/'
        if expected not in parsed[parent].body_links:errors.append(f'{slug}: missing body link from parent {parent}')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print(f'PASS: {len(parsed)} pages, all local links/assets/fragments, image alternatives, unique h1 and parent-body navigation.')
