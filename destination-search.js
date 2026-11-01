/* Local catalogue search. No queries or visitor data leave the browser. */
(function (root) {
  'use strict';
  const aliases = {
    beaches: 'beach', coastal: 'beach', coast: 'beach', seaside: 'beach',
    cities: 'city', urban: 'city', safaris: 'safari',
    dessert: 'desert', deserts: 'desert', families: 'family',
    kids: 'family', children: 'family', swimming: 'swim',
    mountains: 'mountain', islands: 'island', resorts: 'resort',
    activities: 'activity', amenities: 'amenity',
  };
  const ignored = new Set('a an the i we want looking for with and to go places place destinations destination holiday holidays show me somewhere where please'.split(' '));
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const words = value => (normalize(value).match(/[a-z0-9]+/g) || []).map(word => aliases[word] || word);

  // Permit one insertion, deletion or substitution for words of five letters or more.
  function near(a, b) {
    if (a === b) return true;
    if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a.length >= b.length) i++;
      if (b.length >= a.length) j++;
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }

  function matches(text, query) {
    const index = new Set(words(text));
    const groups = normalize(query).split(/\bor\b/).map(part => words(part).filter(word => !ignored.has(word)));
    if (groups.every(group => group.length === 0)) return true;
    return groups.some(group => group.length > 0 && group.every(term =>
      [...index].some(word => word === term || (term.length >= 4 && word.startsWith(term)) || near(term, word))));
  }

  function init(document) {
    const search = document.querySelector('#destination-search');
    if (!search) return;
    const cards = [...document.querySelectorAll('[data-destination-search]')];
    const filters = [...document.querySelectorAll('[data-filter]')];
    const clear = document.querySelector('#destination-clear');
    let region = 'All destinations';
    function update() {
      let count = 0;
      for (const card of cards) {
        card.hidden = (region !== 'All destinations' && card.dataset.region !== region)
          || !matches(card.dataset.destinationSearch, search.value);
        if (!card.hidden) count++;
      }
      document.querySelector('#destination-count').textContent = `${count} ${count === 1 ? 'destination' : 'destinations'}${search.value.trim() ? ` matching “${search.value.trim()}”` : ''}`;
      document.querySelector('#destination-empty').hidden = count !== 0;
      clear.hidden = !search.value && region === 'All destinations';
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === region)));
    }
    filters.forEach(button => button.addEventListener('click', () => { region = button.dataset.filter; update(); }));
    search.addEventListener('input', update);
    clear.addEventListener('click', () => { search.value = ''; region = 'All destinations'; update(); search.focus(); });
    update();
  }
  const api = { matches, init };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RusetatDestinationSearch = api;
})(globalThis);
