# Branch layout families — 1 November 2026

The owner's latest direction supersedes the earlier universal subpage template:
branding stays shared, while each main service path gets its own composition.
Sibling pages within a path may deliberately share a layout. This is a structural
change to page templates and reading flow, not a palette change.

Design polish guided by [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop),
CC BY 4.0, and the current Rusetat brand contract.

## Audit and direction

Most subpages previously called the same editorial intro. Recruitment and Au Pair
also used the same audience cards, three preparation cards and dark process split.
Guides reused the visa-style sidebar/article layout. A different stamp alone did
not give the branches different identities.

- Product: help visitors explore travel, application support and people services.
- Character: experienced, personal, organised.
- World: destination atlases, application guides, role briefs and travel journals.
- Moments: the branch-specific reading flow and existing relevant photography.
- Signature: Rusetat's stamp grammar, navy/blue/purple palette and serif headings.

## Implemented families

| Path | Composition |
|---|---|
| Home | Existing photographic entry point |
| Travel and destinations | Atlas masthead, wide destination imagery, discovery and itinerary sections |
| Corporate travel | Large event title with a separate planning strip; location and event examples lead into the existing brief |
| Visa and country pages | Existing application-guide family, with route navigation, preparation and FAQs |
| Recruitment | Role-brief intro, horizontal candidate/employer pathways, preparation desk with stacked discussion rows, horizontal process stages |
| Au Pair | Centred people-first intro, paired audience perspectives, photographic journal spread, vertical responsibilities/process timeline |
| About, team and process | Letterhead intro, editorial principles rows, portrait directory and existing company/process content |
| Guides | Magazine-style collection with a featured article; guide contents above a centred reading column and takeaway panel |
| Relocation | Arrival opening, chronological milestone list and practical scope beside supporting imagery |
| Contact, FAQs and website map | Compact service openings; their form, question directory and site-tree bodies remain task-specific |
| Policies | Compact document heading and narrow policy copy |

`branch_intro()` produces separate hero markup per family. Recruitment and Au Pair
have different body templates. `layout_family()` marks each generated main element
with its owning family. `branch-layouts.css` scopes the new compositions to page
content; shared navigation, footer, contact widget, forms, brand assets and tokens
keep their common behaviour. Templates are reused within each branch.

Existing service copy and outcome limitations remain. No live vacancies, host
families, visa results, staff metrics or new service promises were introduced.
Sibling/parent links remain crawlable. Page content still regenerates into local
search, structured metadata and the readable agent surface.

## Verification

All 69 pages build and pass existing route, asset, fragment, parent-link, single-h1,
image-alternative and duplicate-ID checks. Machine-surface and existing search,
chat and corporate interaction checks pass. Representative generated outputs were
inspected for their distinct family/hero markup. Responsive rules collapse the
multi-column compositions on narrow screens; no animation was added.

Browser rendering is disabled in this session. The actual desktop, tablet and
phone layouts, zoom/reflow, image crops and visual differentiation have **not**
been visually verified. This is a local implementation, not a deployed or visually
signed-off redesign. Review the branch hubs and one child page from each family
when browser access is available.
