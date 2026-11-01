"""Verify generated discovery assets, public/preview controls and copy parity."""
import json
import os
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path
from unittest.mock import patch
from urllib.parse import urlsplit, unquote

from inventory import PAGES
from machine_surface import MachineSurface, PublicCopy

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'dist'


class Head(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.metas, self.json_ld, self.images = [], {}, [], []
        self.in_ld = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link': self.links.append(attrs)
        if tag == 'meta': self.metas[attrs.get('name') or attrs.get('property')] = attrs.get('content')
        if tag == 'script': self.in_ld = attrs.get('type') == 'application/ld+json'
        if tag == 'img': self.images.append(attrs)

    def handle_endtag(self, tag):
        if tag == 'script': self.in_ld = False

    def handle_data(self, data):
        if self.in_ld: self.json_ld.append(json.loads(data))


class DiscoveryChecks(unittest.TestCase):
    def test_every_page_has_canonical_readable_copy_and_structured_navigation(self):
        catalogue = json.loads((OUT/'agent/catalogue.json').read_text(encoding='utf-8'))
        self.assertEqual(len(catalogue['pages']), len(PAGES))
        self.assertEqual(len({p['canonicalUrl'] for p in catalogue['pages']}), len(PAGES))
        base = catalogue['basePath']
        for page, (slug, title, parent, kind) in zip(catalogue['pages'], PAGES):
            with self.subTest(page=slug):
                html = (OUT/slug/'index.html').read_text(encoding='utf-8')
                head = Head(html)
                canonical = [link['href'] for link in head.links if link.get('rel') == 'canonical']
                self.assertEqual(canonical, [page['canonicalUrl']])
                self.assertEqual(head.metas['og:url'], page['canonicalUrl'])
                self.assertEqual(head.metas['description'], page['description'])
                self.assertTrue(head.metas['robots'].startswith('index,' if catalogue['indexable'] else 'noindex,'))
                self.assertEqual(len(head.json_ld), 1)
                graph = {item['@type']: item for item in head.json_ld[0]['@graph']}
                self.assertEqual(graph['WebPage']['url'], page['canonicalUrl'])
                self.assertEqual(graph['BreadcrumbList']['itemListElement'][-1]['item'], page['canonicalUrl'])
                self.assertNotIn('telephone', graph['Organization'], 'Unapproved contact details must not become structured business claims')
                self.assertIn(page['markdownUrl'], [link['href'] for link in head.links])
                markdown_path = unquote(urlsplit(page['markdownUrl']).path)[len(base):].lstrip('/')
                markdown = (OUT/markdown_path).read_text(encoding='utf-8')
                self.assertIn(page['canonicalUrl'], markdown)
                self.assertNotIn('footer-search-form', markdown)
                self.assertNotIn('stamp-wear', markdown)
                self.assertNotIn('<script', markdown)
                self.assertTrue(markdown.startswith('# '+title))
                for image in head.images:
                    self.assertIn('alt', image)
                    self.assertTrue(image['alt'].strip() or image.get('aria-hidden') == 'true' or image.get('role') == 'presentation')
                    if '/images/generated/' in image['src'] or '/images/team/' in image['src']:
                        self.assertIn('Illustrative', image['alt'])
        guide = (OUT/'llms.txt').read_text(encoding='utf-8')
        for page in catalogue['pages']:
            self.assertIn(page['markdownUrl'], guide)
        manifest = json.loads((OUT/'agent/manifest.json').read_text(encoding='utf-8'))
        self.assertEqual(manifest['actions'], [])
        self.assertIsNone(manifest['mcpEndpoint'])
        for resource in manifest['resources'].values():
            target = unquote(urlsplit(resource).path)[len(base):].lstrip('/')
            self.assertTrue((OUT/target).is_file(), target)
        robots = (OUT/'robots.txt').read_text(encoding='utf-8')
        self.assertIn('Sitemap: '+manifest['resources']['sitemap'], robots)
        self.assertIn('User-agent: GPTBot\nDisallow: /' if catalogue['indexable'] else 'User-agent: *\nDisallow: /', robots)

    def test_public_copy_retains_actual_words_and_links_without_hidden_or_decorative_noise(self):
        copy = PublicCopy('https://rusetatmigration.org', '/Rusetat')
        copy.feed('<h1>Visa support</h1><p class="lead">Family &amp; work.</p><ul><li>Prepare documents</li></ul>'
                  '<details><summary>What next?</summary><p>Ask us.</p></details>'
                  '<a href="/about/contact-us/">Contact</a><img src="x" alt="Application folder">'
                  '<svg><text>stamp noise</text></svg><div hidden>hidden draft</div><script>secretScript()</script>')
        text = copy.markdown()
        for expected in ['# Visa support', 'Family & work.', '- Prepare documents', '### What next?', 'Ask us.',
                         'https://rusetatmigration.org/Rusetat/about/contact-us/', 'Application folder']:
            self.assertIn(expected, text)
        for excluded in ['stamp noise', 'hidden draft', 'secretScript']:
            self.assertNotIn(excluded, text)

    def test_public_build_controls_and_project_paths(self):
        (ROOT/'artifacts').mkdir(exist_ok=True)
        for enabled in ['true', 'false']:
            with self.subTest(indexable=enabled), tempfile.TemporaryDirectory(dir=ROOT/'artifacts') as temp:
                out = Path(temp)
                with patch.dict(os.environ, {'SITE_INDEXABLE': enabled, 'SITE_ORIGIN': 'https://rusetatmigration.org'}):
                    machine = MachineSurface(ROOT, out, [('', 'Home', None, 'home')], '/Rusetat')
                    _, markup = machine.page_head('', 'Home', None, 'home', '<h1>Home</h1><p class="lead">Travel and visa support.</p>')
                    machine.write()
                self.assertIn('https://rusetatmigration.org/Rusetat/', markup)
                self.assertIn('content="index,follow' if enabled == 'true' else 'content="noindex,nofollow', markup)
                robots = (out/'robots.txt').read_text()
                self.assertIn('OAI-SearchBot' if enabled == 'true' else 'User-agent: *\nDisallow: /', robots)
        for origin in ['http://localhost:4173', 'https://example.chatgpt.site', 'https://rusetatmigration.org/wrong-path']:
            with self.subTest(origin=origin), patch.dict(os.environ, {'SITE_INDEXABLE': 'true', 'SITE_ORIGIN': origin}):
                with self.assertRaises(ValueError):
                    MachineSurface(ROOT, OUT, PAGES, '')


if __name__ == '__main__':
    unittest.main(verbosity=2)
