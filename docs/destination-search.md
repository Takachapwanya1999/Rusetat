# Destination discovery

The destinations page now searches locally as the visitor types. It matches
names, countries, regions, introductions, moods, highlights and curated search
terms in `content/destinations.json`. No search requests leave the browser.

Each destination's `search` object contains locations, activities, keywords and
amenities. Add facilities to `amenities` only after they are confirmed for the
offered stay; these arrays currently remain empty. General destination interests
are inspiration, not a promise of hotel facilities or included excursions.
FAQs, longer overviews and itineraries are excluded because they suggest combined
journeys; they must not make Kruger a city destination or Cape Town a safari.

Examples: beach returns Cape Town, Zanzibar, Mauritius, Dubai and Bali; safari
returns Kruger; city returns Cape Town and Dubai; desert/dessert returns Dubai;
Stone Town returns Zanzibar; houseboat returns Kariba; shopping returns Dubai.

Multiple meaningful words narrow the results (for example `beach Tanzania`).
An explicit `or` broadens the search (`beach or safari`). Common variants and a
single inserted, deleted or substituted letter in longer words are supported.
This is a small deterministic catalogue search, not unrestricted AI search.
Region and query are applied together. Clear filters resets both, and the empty
state explains how to recover. Without JavaScript all destination links remain
visible. The native search field supplies its normal keyboard interactions.

Validation: build first, then `npm test`, or run the Python page check and
`node --test scripts/chat.test.cjs scripts/destination-search.test.cjs`.
The tests use the generated catalogue, including actual search attributes, and
cover examples, false-positive guards, filtering and empty/reset states.
Visual browser QA remains unavailable in this session.
