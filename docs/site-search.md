# Website search

Every canonical page has a search form at the top of its footer. Results appear
below the form as linked page titles with matching content previews. Search runs
as the visitor types or submits the form. Eight results appear initially; Show
more reveals the next eight and moves keyboard focus to the first new link.
All matching pages remain reachable. Empty searches clear the results, and empty
matches or loading failures provide guidance and a working website-map link.

The builder creates `dist/search-index.json` from each page's rendered main
content. It includes all 69 canonical pages, their titles, headings and text.
Repeated site navigation, the footer/chat widget, SVG artwork, scripts, styles
and hidden elements are excluded. Redirects and the 404 page are not indexed.
Page titles and headings receive higher search weights than body text.
Meaningful words must all match, with common plurals, travel synonyms, accents
and prefixes supported. This is deterministic text search, not an AI service.

The browser loads the public index only on the first meaningful search. Queries
stay in the current page; no query analytics, backend or search dependency is
added. Index URLs are versioned by a content hash, so rebuilds invalidate old
content. `SITE_BASE_PATH` prefixes both the index URL and result links for GitHub
Pages project hosting. Rendered results use DOM textContent, not HTML injection.

Content updates enter the index automatically on the next `python scripts/build.py`.
Run `npm test` after building. Checks cover page/index coverage, real-content
ranking, content-only matches, paging/focus, safe rendering, network retry and
stale-request protection, alongside existing website and destination/chat tests.
Browser visual QA and deployment remain outside the verified local result.
