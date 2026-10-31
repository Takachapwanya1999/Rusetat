# Rusetat · Travel & New Beginnings

A responsive 68-page presentation website for Rusetat Migration International. The supplied draft establishes the palette, logo and editorial direction; its original root HTML/CSS/JS files remain as reference. The new site is generated into `dist/`.

## Run locally

Requires Python 3.11+; no third-party build dependencies. Node.js is optional for npm aliases.

```powershell
python scripts/build.py
python scripts/check.py
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/. With npm, use `npm run build`, `npm test` and `npm run dev`. Opening the original root `index.html` shows the supplied draft, not the generated site. Serve `dist/` over HTTP for clean nested URLs.

## Content and hierarchy

- `scripts/inventory.py`: authoritative page hierarchy. Every route needs a renderer; no empty fallback pages.
- `scripts/build.py`: shared templates, navigation and editorial sections.
- `content/destinations.json`: eight individual destinations.
- `content/visas.json`: 17 SA visa/process pages under useful parent groups.
- `content/international.json`: 12 country-specific international enquiry pages.
- `content/guides.json`: three preparation articles.
- `website.css` and `website.js`: shared responsive design and interactions.
- `/sitemap/`: searchable full website map. Every child links from its immediate parent page body.
- `scripts/sitemap.py`: exports the full hierarchy to the workspace `docs/website-plan/` on every build, including the earlier main visual-sitemap link.

Add a page to the inventory and its substantive content/renderer, then build and check. The page count, website map, external planning map and XML sitemap evolve together. Set `SITE_ORIGIN` in the shell for sitemap.xml; see `.env.example`.

## Demo behaviour

The corporate brief has five stages, conditional questions, back/edit navigation, review, email draft, copy and text download. Destination pages can preselect the corporate destination. Contact adapts to travel, visas and opportunity enquiries. Both forms run in the current page, do not persist answers and do not submit to a backend. Email/WhatsApp sharing is a deliberate visitor action. No booking, appointment, job or placement is confirmed by this website.

Draft contact details are retained for presentation and require owner confirmation before public release. Maps connect to Google only after selection. There is no live Dify embed or WhatsApp Business API integration: WhatsApp links open the agency chat; FAQs provide quick answers.

## Imagery

Final images are served locally as WebP with explicit dimensions. `images/generated/` contains five AI-generated illustrative photographs and prompt/source provenance. They do not depict actual staff, clients or completed placements. Stock notes are in `images/stock-provenance.json`. Kariba/Victoria imagery and the logo came with the draft. Confirm rights and geographic representation before public release. Original PNGs remain in source; build output excludes them except the logo.

## Verification and release boundary

`python scripts/check.py` checks every page, local target, fragment, image alternative, one h1 per page and parent-body child links. `node --check website.js` checks JS syntax. Desktop/mobile browser QA covers filters, menus, sitemap search, contextual enquiries, corporate validation/conditional inputs/review/copy/download and layout containment.

The demo uses noindex/nofollow and disallows crawling. Public release needs approved contacts, final service/visa copy, supplier/placement terms, asset rights and actual hosting/privacy details. If a submission backend is added, define access, retention, spam controls and honest receipt/failure states first. No database, payments or existing private-portal changes are included.

The private Sites identity is in `.openai/hosting.json`. Publication snapshots are prepared separately from this feature branch; the supplied repository main branch is not pushed directly.
