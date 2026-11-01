# Footer composition — 1 November 2026

Polish guided by [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop),
CC BY 4.0, and the existing Rusetat design system.

## Audit and direction

The previous footer gave a full-width search form and four conventional link
columns similar weight. Its small type and uniform arrangement left the supplied
logo and the site's stamp language with little presence.

- Product: travel, visa and migration service discovery.
- Character: experienced, personal, well travelled.
- World: a travel desk and the documents for a journey.
- Moments: a large editorial brand statement beside a pale search slip.
- Signature: the existing Rusetat SVG stamp, printed in blue on the search panel.

## Implementation

The original logo and existing words remain intact. The brand statement and phone
link sit beside a pale search panel, with a small angled decorative stamp beside
its label. The panel uses existing paper, blue, navy, purple and type tokens.
There are no additional raster downloads, gradients, glows or looping motion.

Below, a dashed rule leads into a three-part navigation directory. Larger serif
headings, 44px navigation rows and a separate legal strip give the sections a
clear hierarchy. Tablet and phone layouts stack the brand and search; the phone
directory uses two columns and the legal strip follows source order.

The logo is unchanged and retains its alt text. The stamp is hidden from screen
readers and has its own SVG filter ID so it does not collide with the page hero.
DOM order matches visual order. Form labels, search-result IDs, all navigation,
contact and legal links, preview wording and the separate chat widget are retained.

## Checks and limits

All 69 pages build and pass link, asset, duplicate-ID and image-alternative checks.
Machine-surface checks and the existing search/chat/corporate interaction tests
pass. No new test was added for this presentation-only change. The local raster
logo and stamp specimen were inspected; the existing SVG family was reused.

Browser inspection is disabled in this session. Actual desktop/tablet/phone
rendering, search-expanded layout, zoom/reflow and visual comparison have not been
verified. This is a local implementation, not a deployed or visually signed-off
footer. Confirm those views when browser access is available.
