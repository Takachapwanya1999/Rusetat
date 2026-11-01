const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const content = JSON.parse(fs.readFileSync(path.join(root, 'content/corporate.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'dist/travel/corporate/index.html'), 'utf8');
const source = fs.readFileSync(path.join(root, 'website.js'), 'utf8');
const choose = vm.runInNewContext(source.slice(source.indexOf('function chooseCorporateExample'), source.indexOf("const quoteForm =")) + ';chooseCorporateExample;');

test('corporate locations and event examples are visible and present in search and agent copy', () => {
  assert.equal(content.locations.length, 8);
  assert.equal(content.events.length, 6);
  const index = JSON.parse(fs.readFileSync(path.join(root, 'dist/search-index.json'), 'utf8'));
  const entry = index.find(page => page.url.endsWith('/travel/corporate/'));
  const markdown = fs.readFileSync(path.join(root, 'dist/agent/pages/travel/corporate/index.md'), 'utf8');
  for (const example of content.locations) {
    assert(html.includes(`href="${index[0].url.replace(/\/$/, '')}/travel/destinations/${example.destination}/"`));
    assert(entry.content.includes(example.heading));
    assert(markdown.includes(example.description));
    assert(html.includes(`data-brief-event="${example.event}"`));
  }
  for (const example of content.events) {
    assert(entry.content.includes(example.title));
    assert(markdown.includes(example.text));
    assert(html.includes(`<option>${example.event}</option>`));
  }
});

test('selecting an example preserves the rest of a draft and rejects invalid choices atomically', () => {
  const controls = {
    event: { value: '', options: [...content.events.map(item => ({ value: item.event }))] },
    destination: { value: 'Cape Town', options: [{ value: 'Cape Town' }, { value: 'Lake Kariba' }] },
    organisation: { value: 'Existing organisation' },
    dates: { value: 'April' }, attendees: { value: '25' },
  };
  const form = { elements: { namedItem: name => controls[name] } };
  assert(choose(form, { briefEvent: 'Corporate retreat', briefDestination: 'Lake Kariba' }));
  assert.equal(controls.event.value, 'Corporate retreat');
  assert.equal(controls.destination.value, 'Lake Kariba');
  assert(choose(form, { briefEvent: 'Training or workshop' }));
  assert.equal(controls.destination.value, 'Lake Kariba');
  assert.equal(controls.organisation.value, 'Existing organisation');
  assert.equal(controls.dates.value, 'April');
  assert.equal(controls.attendees.value, '25');
  assert.equal(choose(form, { briefEvent: 'Conference', briefDestination: 'Unlisted venue' }), false);
  assert.equal(controls.event.value, 'Training or workshop');
  assert.equal(controls.destination.value, 'Lake Kariba');
});
