const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { matches, init } = require('../destination-search.js');
const html = fs.readFileSync(path.join(__dirname, '../dist/travel/destinations/index.html'), 'utf8');
const decode = text => text.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const cards = [...html.matchAll(/<a class="destination-card" href="[^"]*\/([^/]+)\/" data-region="([^"]+)" data-destination-search="([^"]+)"/g)]
  .map(([, slug, region, text]) => ({ slug, dataset: { region: decode(region), destinationSearch: decode(text) } }));
const results = query => cards.filter(card => matches(card.dataset.destinationSearch, query)).map(card => card.slug).sort();

test('built destination catalogue matches settings, names, activities and common variants', () => {
  assert.equal(cards.length, 8);
  assert.deepEqual(results('beach'), ['bali', 'cape-town', 'dubai', 'mauritius', 'zanzibar']);
  assert.deepEqual(results('places with beaches'), results('beach'));
  assert.deepEqual(results('safari'), ['kruger']);
  assert.deepEqual(results('safri'), ['kruger']);
  assert.deepEqual(results('city'), ['cape-town', 'dubai']);
  assert.deepEqual(results('desert'), ['dubai']);
  assert.deepEqual(results('dessert'), ['dubai']);
  assert.deepEqual(results('UAE'), ['dubai']);
  assert.deepEqual(results('Stone Town'), ['zanzibar']);
  assert.deepEqual(results('houseboat'), ['kariba']);
  assert.deepEqual(results('shopping'), ['dubai']);
  assert.deepEqual(results('beach or safari'), ['bali', 'cape-town', 'dubai', 'kruger', 'mauritius', 'zanzibar']);
  assert.deepEqual(results('beach Tanzania'), ['zanzibar']);
  assert.deepEqual(results(''), cards.map(card => card.slug).sort());
  assert.deepEqual(results('free wifi'), [], 'Unconfirmed amenities must not imply availability');
  assert.deepEqual(results('skiing'), []);
  assert.deepEqual(results('spa'), [], 'Short amenity names must not match unrelated words such as space');
  assert(!results('safari').includes('cape-town'), 'An optional FAQ extension must not misclassify Cape Town');
});

test('search and region compose; no matches and clear filters update accessibly', () => {
  const element = (value = '') => ({ value, hidden: false, listeners: {}, attrs: {},
    addEventListener(name, fn) { this.listeners[name] = fn; },
    setAttribute(name, value) { this.attrs[name] = value; },
    focus() { this.focused = true; },
  });
  const search = element();
  const clear = element();
  const count = element();
  const empty = element();
  const filters = ['All destinations', 'Southern Africa', 'Indian Ocean', 'Further afield']
    .map(region => ({ ...element(), dataset: { filter: region } }));
  const elements = { '#destination-search': search, '#destination-clear': clear, '#destination-count': count, '#destination-empty': empty };
  const displayed = cards.map(card => ({ ...card }));
  init({ querySelector: selector => elements[selector], querySelectorAll: selector => selector === '[data-filter]' ? filters : displayed });
  search.value = 'beach'; search.listeners.input();
  filters[2].listeners.click();
  assert.deepEqual(displayed.filter(card => !card.hidden).map(card => card.slug).sort(), ['mauritius', 'zanzibar']);
  assert.equal(filters[2].attrs['aria-pressed'], 'true');
  assert.equal(empty.hidden, true);
  search.value = 'skiing'; search.listeners.input();
  assert.equal(empty.hidden, false);
  assert.match(count.textContent, /^0 destinations/);
  clear.listeners.click();
  assert.equal(displayed.filter(card => !card.hidden).length, 8);
  assert.equal(search.value, '');
  assert.equal(search.focused, true);
  assert.equal(clear.hidden, true);
  assert.equal(filters[0].attrs['aria-pressed'], 'true');
});
