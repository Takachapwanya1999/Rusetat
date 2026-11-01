# Rusetat · Travel & New Beginnings

A responsive 69-page presentation website for Rusetat Migration International. The supplied draft establishes the palette, logo and editorial direction; its original root HTML/CSS/JS files remain as reference. The new site is generated into `dist/`.

## Run locally

Requires Python 3.11+; no third-party build dependencies. Node.js is required for the chat interaction check and optional npm aliases.

```powershell
python scripts/build.py
python scripts/check.py
node --test scripts/chat.test.cjs
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/. With npm, use `npm run build`, `npm test` and `npm run dev`. Opening the original root `index.html` shows the supplied draft, not the generated site. Serve `dist/` over HTTP for clean nested URLs.

## Content and hierarchy

- [Branch layout families](docs/branch-layouts.md): travel, visas, corporate, recruitment, Au Pair, About, guides and relocation have distinct compositions within the shared brand. `branch-layouts.css` owns those differences.
- `content/corporate.json`: corporate destination and event examples. Each example links into the event brief; dates, facilities and supplier availability are confirmed separately. These examples also enter website search and the readable agent surface on build.
- [Dual-surface readiness](docs/dual-surface-readiness.md): canonical domain `rusetatmigration.org`, structured metadata, readable versions of all pages, agent catalogue and explicit preview/production crawler controls. Default builds remain noindex; use `SITE_INDEXABLE=true` only for the public release.
- Every footer includes [website search](docs/site-search.md), covering page titles, headings and main content. Its public index regenerates on build; no external search service or visitor-query tracking is used.
- Destination search matches places, travel interests and activities, with region filters and spelling variants. Edit the `search` fields in `content/destinations.json`; see [search behaviour and checks](docs/destination-search.md). Add amenities only after confirmation.
- [Chat placement recommendations](docs/chat-placement-plan.md) describe useful contextual entry points into the existing shared panel.
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

Draft contact details are retained for presentation and require owner confirmation before public release. Maps connect to Google only after selection. The shared contact widget offers Chat with Ruse and Visa assessment, opening the hosted Dify chatbot in a responsive panel above the contact button. Chat loads only after selection; Back returns to contact options and Close minimises it without removing the loaded frames. Visa assessment uses `?entry=assessment` to select the assessment entry. WhatsApp links open the agency chat; FAQs provide quick answers.

## Imagery

The detailed [design system](design.md) documents the existing website foundation and the new rubber-stamp illustration language. Home keeps its photographic hero; subpages use light-grey introductions with branch-specific compositions and their own deterministic stamp. The frame, caption and scene vary per page while the ink language stays consistent. Existing photos, portraits, flags and the original logo remain in the library and can still appear lower in the page. The first transparent raster specimen and its provenance are in [assets/illustrations](assets/illustrations/README.md).

Final images are served locally as WebP with explicit dimensions. `images/generated/` contains five AI-generated illustrative photographs and prompt/source provenance. They do not depict actual staff, clients or completed placements. Stock notes are in `images/stock-provenance.json`. Kariba/Victoria imagery and the logo came with the draft. Confirm rights and geographic representation before public release. Original PNGs remain in source; build output excludes them except the logo.

## Verification and release boundary

`python scripts/check.py` checks every page, local target, fragment, image alternative, one h1 per page and parent-body child links. `node --check website.js` checks JS syntax. Desktop/mobile browser QA covers filters, menus, sitemap search, contextual enquiries, corporate validation/conditional inputs/review/copy/download and layout containment.

The demo uses noindex/nofollow and disallows crawling. Public release needs approved contacts, final service/visa copy, supplier/placement terms, asset rights and actual hosting/privacy details. If a submission backend is added, define access, retention, spam controls and honest receipt/failure states first. No database, payments or existing private-portal changes are included.

The private Sites identity is in `.openai/hosting.json`. Publication snapshots are prepared separately from this feature branch; the supplied repository main branch is not pushed directly.


## Design cleanup

The website was audited and refined with Unslop by Damir Sokolovsky: https://github.com/heydamir/unslop (CC BY 4.0). See `docs/unslop-audit.md` for direction and the nine-pass report, and `THIRD_PARTY_NOTICES.md` for attribution. The existing brand, photography, routes and service interactions remain the foundation.

Icons are a locally vendored Lucide SVG subset, with upstream license at `assets/icons/LICENSE.txt`; no browser library or package install is required. `scripts/presentation.py` applies shared short-label and icon conventions during generation. `images/dimensions.json` records actual photo dimensions. Styles and scripts receive content-versioned URLs so edits refresh after deployment.


## About subpages and country flags

About Rusetat links from its body and navigation to `/about/meet-the-team/`, `/about/contact-us/` and the existing process page. Contact Us reuses the enquiry form, phone/email and office information. `/contact/` remains as a redirect and preserves query parameters and fragments, so older service/destination enquiries still work.

`content/team.json` holds the team introduction, support-role copy and an optional `people` array. The current roster is Carol (Director), Alettar and Antony (Admin), Alaska (Legal Consultant), and TK (Software Developer), as supplied for this demo. Their portraits are generated illustrations, labelled together beneath the profile grid. No ages are included in page content. Replace the illustrative portraits with approved staff photographs when available; each `people` record has `name`, `role`, `portrait`, `portraitAlt` and `bio`.

The international visa directory uses 12 real 4:3 SVG flag assets served from `images/flags/`. They come from one MIT-licensed flag-icons collection, with a pinned upstream revision, source URLs and hashes recorded in `images/flags/provenance.json`. Each international record has its ISO country code in `countryCode`. No emoji, CDN or runtime flag dependency is used.

## Host on GitHub Pages

The complete site source, content and local images live in this repository. ChatGPT Sites is optional; building and hosting the site requires no connection to it. The root `index.html` is the supplied reference draft; publish the generated `dist/` directory instead.

1. Commit these changes on `chore/github-pages-hosting`, push that branch, and merge it into `main`.
2. In GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Run **Actions → Publish Rusetat to GitHub Pages → Run workflow** on `main`, or push a change to `main`.
4. Open the website address reported by the successful deployment. For this repository the default project address is `https://takachapwanya1999.github.io/Rusetat/`.

The workflow builds and checks all pages before uploading `dist/`. It derives the domain and project path from GitHub Pages settings, so links, images, redirects and the XML sitemap also work under `/Rusetat/` or on a configured custom domain. Pull requests run build checks without deploying. No packages, credentials or database are needed. GitHub Pages must be enabled before the workflow configuration step can succeed.

To preview the project path locally in PowerShell:

```powershell
$env:SITE_ORIGIN = 'https://takachapwanya1999.github.io'
$env:SITE_BASE_PATH = '/Rusetat'
python scripts/build.py
python scripts/check.py
```

For the ordinary local server, remove `SITE_BASE_PATH` and rebuild. `SITE_ORIGIN` is the domain only; the builder appends the path. Environment examples are documentation, not automatically loaded settings. `dist/` stays ignored because Actions generates it. The demo remains marked noindex and its enquiry forms prepare messages without sending to a backend.


## Chat branding status

The corner panel uses the supplied Rusetat logo and the website's shared colour,
font and radius tokens. Iframe URLs request `brand=rusetat`; this is a scoped
frontend theme flag, not an API credential. The inner document cannot inherit
website CSS across domains. The corresponding Dify theme package is at
`../../services/ruse-intake/infra/dify-website-theme/`. It is prepared locally,
not deployed or visually verified against the hosted frontend. Full inner-chat
branding is still pending that build and browser QA; the flag alone does not
change the live Dify app.

The panel now includes a quiet loading state and persistent links to open the
chat separately or contact the team. After 15 seconds without an iframe load,
it offers those alternatives. A cross-origin load event does not prove that the
chat service is healthy; the links therefore remain visible after loading.
On phones the panel uses the available dynamic viewport and safe-area spacing.
Switching entries or closing the panel retains the two conversation frames.

Before building the hosted theme, run `node sync-tokens.cjs --check` in its
directory. Use `node sync-tokens.cjs` to copy the 12 shared website tokens after
a design change. See [chat integration status](docs/chat-integration-status.md)
for verification and remaining release work.

Both modes have a **Full screen (new tab)** link. The prepared hosted theme now
supports branded standalone tabs with the supplied logo and mode heading, but
remains undeployed. The link opens the selected mode; exact active-conversation
transfer is not implemented. Assessment can start again in the new tab.
