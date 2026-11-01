/* Search public site content locally; no visitor queries are sent to a service. */
(function (root) {
  'use strict';
  const aliases = { visas: 'visa', permits: 'permit', applications: 'application', documents: 'document',
    beaches: 'beach', coastal: 'beach', coast: 'beach', cities: 'city', safaris: 'safari', dessert: 'desert' };
  const ignored = new Set('a an the and for to of in on with i we want looking show me please'.split(' '));
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const words = value => (normalize(value).match(/[a-z0-9]+/g) || []).map(word => aliases[word] || word);
  const has = (list, word) => list.some(item => item === word || (word.length >= 4 && item.startsWith(word)));

  function rankPages(pages, query) {
    const terms = [...new Set(words(query).filter(term => !ignored.has(term)))];
    if (!terms.length) return [];
    return pages.map(page => {
      const title = words(page.title), headings = words(page.headings), content = words(page.content);
      if (!terms.every(term => has(title, term) || has(headings, term) || has(content, term))) return null;
      const score = terms.reduce((total, term) => total + (has(title, term) ? 20 : 0)
        + (has(headings, term) ? 6 : 0) + (has(content, term) ? 1 : 0), 0)
        + (normalize(page.title).includes(normalize(query).trim()) ? 30 : 0);
      return { page, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title)).map(item => item.page);
  }

  function snippet(content, query) {
    const terms = words(query).filter(term => !ignored.has(term));
    // Slice the original string to retain punctuation and accented characters.
    const tokens = [...content.matchAll(/[\p{L}\p{N}]+/gu)];
    const match = tokens.find(token => words(token[0]).some(word => terms.some(term => has([word], term))));
    let start = Math.max(0, (match?.index || 0) - 56);
    if (start) {
      const boundary = content.indexOf(' ', start);
      if (boundary !== -1) start = boundary + 1;
    }
    const excerpt = content.slice(start, start + 200);
    return `${start ? '…' : ''}${excerpt}${start + 200 < content.length ? '…' : ''}`;
  }

  function init(document, fetchIndex = root.fetch.bind(root)) {
    const form = document.querySelector('#footer-search-form');
    if (!form) return;
    const input = document.querySelector('#footer-search-query');
    const status = document.querySelector('#footer-search-status');
    const list = document.querySelector('#footer-search-results');
    const more = document.querySelector('#footer-search-more');
    let indexPromise, timer, generation = 0, results = [], shown = 0;
    function appendResults() {
      const next = results.slice(shown, shown + 8);
      for (const page of next) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = page.url;
        link.textContent = page.title;
        const preview = document.createElement('p');
        preview.textContent = snippet(page.content, input.value);
        item.append(link, preview);
        list.append(item);
      }
      shown += next.length;
      more.hidden = shown >= results.length;
      more.textContent = `Show more results (${results.length - shown} remaining)`;
    }
    async function search() {
      const request = ++generation;
      const query = input.value.trim().slice(0, 120);
      list.replaceChildren(); list.hidden = true; more.hidden = true;
      if (query.length < 2 || !words(query).some(term => !ignored.has(term))) {
        status.textContent = query ? 'Enter at least two letters and a word to search for.' : '';
        return;
      }
      status.textContent = 'Searching the website…';
      try {
        if (!indexPromise) indexPromise = fetchIndex(form.dataset.searchIndex).then(response => {
          if (!response.ok) throw new Error('Search index unavailable');
          return response.json();
        }).catch(error => { indexPromise = undefined; throw error; });
        const pages = await indexPromise;
        if (request !== generation) return;
        results = rankPages(pages, query); shown = 0;
        status.textContent = results.length ? `${results.length} ${results.length === 1 ? 'page' : 'pages'} found for “${query}”.`
          : `No pages found for “${query}”. Try a broader term or explore the website map.`;
        list.hidden = results.length === 0;
        appendResults();
      } catch {
        if (request === generation) status.textContent = 'Search is unavailable right now. Try again or use the website map below.';
      }
    }
    input.addEventListener('input', () => {
      ++generation; clearTimeout(timer);
      list.replaceChildren(); list.hidden = true; more.hidden = true;
      status.textContent = '';
      timer = setTimeout(search, 250);
    });
    form.addEventListener('submit', event => { event.preventDefault(); clearTimeout(timer); return search(); });
    more.addEventListener('click', () => {
      const firstNew = shown;
      appendResults();
      list.children[firstNew]?.querySelector('a')?.focus();
    });
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { rankPages, snippet, init };
  else init(root.document);
})(globalThis);
