const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { rankPages, snippet, init } = require('../site-search.js');
const dist = path.join(__dirname, '../dist');
const raw = fs.readFileSync(path.join(dist, 'search-index.json'), 'utf8');
const pages = JSON.parse(raw);
const prefix = pages[0].url.replace(/\/$/, '');

test('index and footer cover every canonical page with correctly prefixed, versioned links', () => {
  const inventory = JSON.parse(fs.readFileSync(path.join(dist, 'page-inventory.json'), 'utf8'));
  assert.equal(pages.length, inventory.length);
  assert.equal(new Set(pages.map(page => page.url)).size, pages.length);
  const version = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 12);
  for (const page of pages) {
    assert(page.content.length > 0);
    assert(!page.content.includes('footer-search-form'));
    const slug = page.url.slice(prefix.length).replace(/^\//, '');
    const html = fs.readFileSync(path.join(dist, slug, 'index.html'), 'utf8');
    assert(html.includes(`data-search-index="${prefix}/search-index.json?v=${version}"`));
    assert(html.includes(`src="${prefix}/site-search.js?v=`));
    assert.equal((html.match(/id="footer-search-query"/g) || []).length, 1);
  }
});

test('search ranks specific titles and matches text beyond page names', () => {
  assert(rankPages(pages, 'critical skills')[0].url.endsWith('/visas/south-africa/work/critical-skills/'));
  assert(rankPages(pages, 'Cape Town')[0].url.endsWith('/travel/destinations/cape-town/'));
  assert(rankPages(pages, 'au pair')[0].url.endsWith('/au-pair/'));
  assert(rankPages(pages, 'privacy')[0].url.endsWith('/privacy/'));
  assert(rankPages(pages, 'passport').some(page => !page.title.toLowerCase().includes('passport')));
  assert.deepEqual(rankPages(pages, 'zzzznonexistent'), []);
  assert.deepEqual(rankPages(pages, 'the and'), []);
  assert.deepEqual(rankPages(pages, ''), []);
  assert(snippet('First paragraph. Café and coastal experiences await.', 'cafe').includes('Café'));
});

function ui(fetchIndex) {
  class Element {
    constructor() { this.children = []; this.listeners = {}; this.dataset = {}; this.value = ''; }
    addEventListener(name, fn) { this.listeners[name] = fn; }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this.children = children; }
    querySelector() { return this.children[0]; }
    focus() { this.focused = true; }
    set innerHTML(value) { throw new Error('Search must render untrusted text using textContent'); }
  }
  const elements = Object.fromEntries(['form', 'query', 'status', 'results', 'more'].map(name => [`#footer-search-${name}`, new Element()]));
  elements['#footer-search-form'].dataset.searchIndex = `${prefix}/search-index.json?v=test`;
  init({ querySelector: selector => elements[selector], createElement: () => new Element() }, fetchIndex);
  return {
    elements,
    async submit(query) {
      elements['#footer-search-query'].value = query;
      await elements['#footer-search-form'].listeners.submit({ preventDefault() {} });
    },
  };
}

test('footer loads lazily once, pages results, and renders safely', async () => {
  let calls = 0;
  const app = ui(async url => {
    calls++;
    assert.equal(url, `${prefix}/search-index.json?v=test`);
    return { ok: true, json: async () => pages };
  });
  assert.equal(calls, 0);
  await app.submit('visa');
  const list = app.elements['#footer-search-results'];
  const more = app.elements['#footer-search-more'];
  assert.equal(list.children.length, 8);
  assert.equal(more.hidden, false);
  more.listeners.click();
  assert.equal(list.children.length, 16);
  assert.equal(list.children[8].children[0].focused, true);
  await app.submit('zzzznonexistent');
  assert.equal(calls, 1);
  assert.equal(list.hidden, true);
  assert.match(app.elements['#footer-search-status'].textContent, /No pages found/);
  await app.submit('');
  assert.equal(list.children.length, 0);
  assert.equal(app.elements['#footer-search-status'].textContent, '');
  const payload = '<img src=x onerror=alert(1)>';
  const safe = ui(async () => ({ ok: true, json: async () => [{ title: payload, headings: 'test', content: payload, url: '/safe/' }] }));
  await safe.submit('img');
  assert.equal(safe.elements['#footer-search-results'].children[0].children[0].textContent, payload);
});

test('network errors can be retried and old searches cannot overwrite newer input', async () => {
  let calls = 0;
  const app = ui(async () => {
    if (++calls === 1) throw new Error('offline');
    return { ok: true, json: async () => pages };
  });
  await app.submit('visa');
  assert.match(app.elements['#footer-search-status'].textContent, /unavailable/);
  await app.submit('visa');
  assert.equal(calls, 2);
  assert.equal(app.elements['#footer-search-results'].hidden, false);
  let release;
  const slow = ui(() => new Promise(resolve => { release = resolve; }));
  const first = slow.submit('visa');
  const second = slow.submit('Cape Town');
  release({ ok: true, json: async () => pages });
  await Promise.all([first, second]);
  assert.match(slow.elements['#footer-search-status'].textContent, /Cape Town/);
  assert.equal(slow.elements['#footer-search-results'].children[0].children[0].textContent, 'Cape Town');
});
