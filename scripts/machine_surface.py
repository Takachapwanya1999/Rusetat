"""Banya dual-surface adaptation for a read-only, static public website."""
import hashlib
import json
import os
import re
from html import escape
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, quote

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}


class PublicCopy(HTMLParser):
    """Preserve headings, links, lists, paragraphs and image descriptions."""
    def __init__(self, origin, base_path, slug=''):
        super().__init__(convert_charrefs=True)
        self.origin, self.base_path = origin, base_path
        self.page_url = origin + base_path + '/' + (slug.strip('/') + '/' if slug else '')
        self.stack, self.output, self.lead = [], [], []

    def absolute(self, href):
        if href.startswith('/') and not href.startswith('//'):
            return self.origin + self.base_path + href
        return urljoin(self.page_url, href)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        blocked = any(item[1] for item in self.stack) or tag in {'svg', 'script', 'style'} or 'hidden' in attrs
        if tag not in VOID:
            self.stack.append((tag, blocked, attrs))
        if blocked:
            return
        if tag in {'h1', 'h2', 'h3', 'h4'}:
            self.output.append('\n\n' + '#' * int(tag[1]) + ' ')
        elif tag == 'summary':
            self.output.append('\n\n### ')
        elif tag == 'li':
            self.output.append('\n- ')
        elif tag in {'p', 'section', 'article', 'div', 'form', 'ul', 'ol', 'table'}:
            self.output.append('\n\n')
        elif tag in {'br', 'option', 'tr'}:
            self.output.append('\n')
        elif tag == 'a' and attrs.get('href'):
            self.output.append('[')
        elif tag == 'img' and attrs.get('alt', '').strip():
            self.output.append(' ' + attrs['alt'] + ' ')

    def handle_endtag(self, tag):
        index = next((i for i in range(len(self.stack)-1, -1, -1) if self.stack[i][0] == tag), None)
        if index is None:
            return
        _, blocked, attrs = self.stack[index]
        del self.stack[index:]
        if blocked:
            return
        if tag == 'a' and attrs.get('href'):
            self.output.append('](' + quote(self.absolute(attrs['href']), safe=':/?#[]@!$&\'*,;=%+~-._') + ')')
        elif tag in {'p', 'h1', 'h2', 'h3', 'h4', 'summary', 'section', 'article', 'li', 'div', 'label', 'button', 'td', 'th'}:
            self.output.append('\n\n' if tag != 'li' else '\n')

    def handle_data(self, data):
        if any(item[1] for item in self.stack):
            return
        text = ' '.join(data.split())
        if text:
            self.output.append(text + ' ')
            if any(tag == 'p' and 'lead' in attrs.get('class', '').split() for tag, _, attrs in self.stack):
                self.lead.append(text)

    def markdown(self):
        text = re.sub(r'[ \t]+\n', '\n', ''.join(self.output))
        return re.sub(r'\n{3,}', '\n\n', text).strip() + '\n'


class MachineSurface:
    def __init__(self, root, out, pages, base_path):
        self.out, self.pages, self.base = out, pages, base_path
        self.by_slug = {page[0]: page for page in pages}
        config = json.loads((root/'content/site.json').read_text(encoding='utf-8'))
        self.origin = os.environ.get('SITE_ORIGIN', config['origin']).rstrip('/')
        parsed = urlsplit(self.origin)
        if parsed.scheme not in {'http', 'https'} or not parsed.netloc or parsed.path or parsed.query or parsed.fragment or parsed.username or parsed.password:
            raise ValueError('SITE_ORIGIN must be an http(s) origin only, with no credentials, path, query or fragment')
        setting = os.environ.get('SITE_INDEXABLE', 'false').lower()
        if setting not in {'true', 'false'}:
            raise ValueError('SITE_INDEXABLE must be true or false')
        self.indexable = setting == 'true'
        if self.indexable and (parsed.scheme != 'https' or parsed.hostname in {'localhost', '127.0.0.1', '::1'} or parsed.hostname.endswith('.chatgpt.site')):
            raise ValueError('Public indexing requires an HTTPS production origin, not a local or demo host')
        self.records, self.documents = [], []

    def absolute(self, slug=''):
        return self.origin + self.base + '/' + (slug.strip('/') + '/' if slug else '')

    def markdown_url(self, slug):
        return self.origin + self.base + '/agent/pages/' + (slug.strip('/') + '/' if slug else '') + 'index.md'

    def page_head(self, slug, title, parent, kind, body):
        copy = PublicCopy(self.origin, self.base, slug)
        copy.feed(body)
        description = ' '.join(copy.lead) or f'{title} — travel planning, visa application preparation and migration support from Rusetat Migration International.'
        if len(description) > 190:
            description = description[:187].rsplit(' ', 1)[0] + '…'
        canonical, home = self.absolute(slug), self.absolute()
        chain = []
        current = slug
        while current:
            page = self.by_slug[current]
            chain.append({'@type': 'ListItem', 'name': page[1], 'item': self.absolute(current)})
            current = page[2]
        chain = [{'@type': 'ListItem', 'name': 'Home', 'item': home}] + list(reversed(chain))
        for position, item in enumerate(chain, 1):
            item['position'] = position
        structured = {'@context': 'https://schema.org', '@graph': [
            {'@type': 'Organization', '@id': home+'#organization', 'name': 'Rusetat Migration International', 'url': home,
             'logo': self.origin+self.base+'/images/Rusetat%20logo.png'},
            {'@type': 'WebSite', '@id': home+'#website', 'url': home, 'name': 'Rusetat Migration International', 'inLanguage': 'en', 'publisher': {'@id': home+'#organization'}},
            {'@type': 'WebPage', '@id': canonical+'#webpage', 'url': canonical, 'name': title, 'description': description,
             'inLanguage': 'en', 'isPartOf': {'@id': home+'#website'}, 'breadcrumb': {'@id': canonical+'#breadcrumbs'}},
            {'@type': 'BreadcrumbList', '@id': canonical+'#breadcrumbs', 'itemListElement': chain},
        ]}
        record = dict(id=slug or 'home', title=title, kind=kind, canonicalUrl=canonical, markdownUrl=self.markdown_url(slug),
                      description=description, parentUrl=self.absolute(parent) if parent is not None else None,
                      children=[self.absolute(p[0]) for p in self.pages if p[2] == slug])
        self.records.append(record)
        status = 'public-build' if self.indexable else 'preview — not approved for search indexing'
        document = f'# {title}\n\nCanonical: {canonical}\nStatus: {status}\n\n' + copy.markdown()
        target = self.out/'agent/pages'/slug/'index.md'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(document, encoding='utf-8')
        self.documents.append(document)
        json_ld = json.dumps(structured, ensure_ascii=False).replace('<', '\\u003c')
        robots = 'index,follow,max-image-preview:large' if self.indexable else 'noindex,nofollow'
        return description, (f'<meta name="robots" content="{robots}"><link rel="canonical" href="{escape(canonical, quote=True)}">'
            f'<meta property="og:type" content="website"><meta property="og:title" content="{escape(title, quote=True)}">'
            f'<meta property="og:description" content="{escape(description, quote=True)}"><meta property="og:url" content="{escape(canonical, quote=True)}">'
            f'<link rel="alternate" type="text/markdown" href="{escape(self.markdown_url(slug), quote=True)}" title="Readable content">'
            f'<link rel="describedby" type="application/json" href="{self.origin+self.base}/agent/manifest.json">'
            f'<script type="application/ld+json">{json_ld}</script>')

    def write(self):
        root_url = self.origin + self.base
        policy = ('User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\n'
                  'User-agent: GPTBot\nDisallow: /\n\n' if self.indexable else 'User-agent: *\nDisallow: /\n\n')
        (self.out/'robots.txt').write_text(policy+f'Sitemap: {root_url}/sitemap.xml\n', encoding='utf-8')
        catalogue = {'schemaVersion': 1, 'origin': self.origin, 'basePath': self.base, 'indexable': self.indexable, 'pages': self.records}
        (self.out/'agent/catalogue.json').write_text(json.dumps(catalogue, ensure_ascii=False, indent=2), encoding='utf-8')
        manifest = {'schemaVersion': 1, 'name': 'Rusetat Migration International', 'surface': 'public-content-read-only',
            'indexable': self.indexable, 'canonicalHome': self.absolute(),
            'resources': {'catalogue': root_url+'/agent/catalogue.json', 'searchIndex': root_url+'/search-index.json',
                          'llms': root_url+'/llms.txt', 'fullText': root_url+'/llms-full.txt', 'sitemap': root_url+'/sitemap.xml'},
            'capabilities': ['read public page content', 'follow catalogue parent/child links', 'search downloaded public index locally'],
            'actions': [], 'mcpEndpoint': None,
            'limitations': ['No booking, payment, enquiry submission or visa decision API is provided.',
                            'Website enquiry forms prepare drafts; visitors decide whether to send them.',
                            'Hosted chat and assessment are separate interactive services, not this read-only surface.',
                            'Visa requirements and eligibility need current official-source and consultant confirmation.']}
        (self.out/'agent/manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
        guide = '# Rusetat Migration International\n\n> Travel planning, visa application preparation and migration support.\n\n'
        guide += ('This is a public-indexable build.\n\n' if self.indexable else 'This is a preview build. Content is not approved for search indexing.\n\n')
        guide += ('This read-only surface mirrors visible public website content. It does not offer booking, payment, enquiry submission or visa decisions. '
                  'Requirements and eligibility need current official sources and consultant confirmation.\n\n')
        guide += f'## Navigation\n\n- [Machine catalogue]({root_url}/agent/catalogue.json): Page hierarchy, descriptions and readable URLs.\n'
        guide += f'- [Capabilities]({root_url}/agent/manifest.json): Read-only resources and actual limitations.\n'
        guide += f'- [Search index]({root_url}/search-index.json): Download and search public page text locally.\n\n## Pages\n\n'
        guide += ''.join(f'- [{p["title"]}]({p["markdownUrl"]}): {p["description"]}\n' for p in self.records)
        guide += f'\n## Optional\n\n- [All public page text]({root_url}/llms-full.txt): Combined readable copy; prefer individual pages for focused questions.\n'
        (self.out/'llms.txt').write_text(guide, encoding='utf-8')
        (self.out/'llms-full.txt').write_text(guide.split('## Pages')[0]+'\n---\n\n'+'\n---\n\n'.join(self.documents), encoding='utf-8')
        return hashlib.sha256(guide.encode('utf-8')).hexdigest()[:12]
