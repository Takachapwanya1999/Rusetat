const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('chat entries retain frames, isolate loading state and keep direct help available', () => {
  class Element {
    constructor(dataset = {}) { this.dataset = dataset; this.listeners = {}; this.attrs = {}; this.children = []; this.hidden = false; }
    addEventListener(name, fn) { this.listeners[name] = fn; }
    click() { this.listeners.click?.(); }
    focus() {}
    getAttribute(name) { return this.attrs[name]; }
    setAttribute(name, value) { this.attrs[name] = value; }
    append(child) { this.children.push(child); }
    querySelector() { return main; }
    classList = { add() {}, remove() {}, contains() { return true; } };
  }
  const main = new Element({ chatEntry: 'main' });
  const assessment = new Element({ chatEntry: 'assessment' });
  const elements = new Map();
  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, new Element());
      return elements.get(selector);
    },
    querySelectorAll: () => [main, assessment],
    createElement: () => new Element(),
  };
  const timers = new Map();
  let timerId = 0;
  const source = fs.readFileSync(path.join(__dirname, '../website.js'), 'utf8');
  vm.runInNewContext(source.slice(0, source.indexOf("document.addEventListener('keydown'")), {
    document, URL,
    setTimeout: fn => { timers.set(++timerId, fn); return timerId; },
    clearTimeout: id => timers.delete(id),
  });
  main.click();
  const frames = elements.get('#dock-chat-frame').children;
  const status = elements.get('#dock-chat-status');
  assert.equal(frames.length, 1);
  assert.equal(new URL(frames[0].src).searchParams.get('brand'), 'rusetat');
  const fullScreen = elements.get('#dock-chat-external');
  assert.equal(fullScreen.href, frames[0].src);
  assert.match(fullScreen.getAttribute('aria-label'), /Chat with Ruse full screen/);
  assessment.click();
  assert.equal(frames.length, 2);
  assert.equal(new URL(frames[1].src).searchParams.get('entry'), 'assessment');
  assert.equal(new URL(fullScreen.href).searchParams.get('brand'), 'rusetat');
  assert.match(fullScreen.getAttribute('aria-label'), /Visa assessment full screen/);
  assert.equal(frames[0].hidden, true);
  frames[0].listeners.load(); // Background frame must not clear active entry's timer.
  assert.equal(timers.size, 1);
  assert.equal(status.hidden, false);
  [...timers.values()][0]();
  assert.match(status.textContent, /Taking longer/);
  assert.equal(elements.get('#dock-chat-external').href, frames[1].src);
  frames[1].listeners.load();
  assert.equal(status.hidden, true);
  elements.get('#dock-back').click();
  main.click();
  assert.equal(frames.length, 2, 'Reopening preserves the existing conversation frame');
  assert.equal(frames[0].hidden, false);
  assert.equal(status.hidden, true);
});
