# Stamp backlog and resumption guide

Updated 1 November 2026. Authoritative checkpoint for resuming artwork generation.

## Current state

- 69 content pages; Home retains its photo hero, 68 pages have stamp slots.
- 20 page-specific stamps approved by owner and integrated.
- One shared footer seal generated and integrated under the owner's instruction. Its larger export is also the generic placeholder for unfinished pages.
- **48 page-specific stamps remain.** Footer generation is complete; do not count older revisions as additional designs.
- Pause new generation here. Resume in batches of five with owner approval between batches; the last batch contains three.

## Files and responsibilities

| File | Purpose |
|---|---|
| `scripts/inventory.py` | Canonical route inventory |
| `assets/illustrations/catalogue.json` | Selected masters, exact routes, inks, approval status |
| `content/stamps.json` | Delivery filenames, dimensions, byte sizes and route mapping |
| `scripts/stamps.py` | Exact route selection and generic fallback |
| `scripts/build.py` | Resolves stamp slot using canonical slug, renders footer |
| `scripts/export_stamps.py` | Optional authoring export, needs Pillow locally only |
| `scripts/check_stamps.py` | Published coverage, correct identity, asset budgets and source exclusion checks |
| `images/stamps/` | Production WebPs only, content-hashed filenames |
| `assets/illustrations/review-batch-01/` to `review-batch-04/` | Masters, prompt/source manifests, review exports and galleries; excluded from published dist |
| `assets/illustrations/footer/` | Shared seal master, generation prompt/source and grey preview |
| `docs/stamp-map-and-prompt.md` | Reusable structured generation prompt and earlier audit |
| `docs/stamp-format-benchmark.md` | Historical format test; sizes are not guarantees for new artwork |
| `docs/illustration-plan.md` | Earlier route subjects; old sparse monoline direction is superseded |

## Approved route and master register

| # | Route | Selected master |
|---|---|---|
| 1 | `/travel/` | `assets/illustrations/review-batch-01/travel-master.png` |
| 2 | `/visas/south-africa/study/` | `assets/illustrations/review-batch-01/study-visa-master.png` |
| 3 | `/visas/south-africa/work/corporate/` | `assets/illustrations/review-batch-01/corporate-visa-master.png` |
| 4 | `/relocation/` | `assets/illustrations/review-batch-01/relocation-master.png` |
| 5 | `/travel/destinations/kruger/` | `assets/illustrations/review-batch-01/kruger-master.png` |
| 6 | `/travel/destinations/` | `assets/illustrations/review-batch-02/destinations-v2-master.png` |
| 7 | `/travel/corporate/` | `assets/illustrations/review-batch-02/corporate-travel-master.png` |
| 8 | `/visas/` | `assets/illustrations/review-batch-02/visa-support-master.png` |
| 9 | `/visas/south-africa/` | `assets/illustrations/review-batch-02/south-africa-visas-v3-master.png` |
| 10 | `/visas/international/` | `assets/illustrations/review-batch-02/international-visas-master.png` |
| 11 | `/au-pair/` | `assets/illustrations/review-batch-03/au-pair-master.png` |
| 12 | `/recruitment/` | `assets/illustrations/review-batch-03/recruitment-master.png` |
| 13 | `/about/` | `assets/illustrations/review-batch-03/about-rusetat-master.png` |
| 14 | `/guides/` | `assets/illustrations/review-batch-03/guides-master.png` |
| 15 | `/about/contact-us/` | `assets/illustrations/review-batch-03/contact-master.png` |
| 16 | `/travel/destinations/cape-town/` | `assets/illustrations/review-batch-04/cape-town-master.png` |
| 17 | `/travel/destinations/kariba/` | `assets/illustrations/review-batch-04/lake-kariba-master.png` |
| 18 | `/travel/destinations/victoria-falls/` | `assets/illustrations/review-batch-04/victoria-falls-master.png` |
| 19 | `/travel/destinations/zanzibar/` | `assets/illustrations/review-batch-04/zanzibar-master.png` |
| 20 | `/travel/destinations/mauritius/` | `assets/illustrations/review-batch-04/mauritius-master.png` |

Important selected revisions: Destinations **v2 beach/palms/city skyline**; South Africa Visas **v3 Table Mountain, Union Buildings, springbok, flag and passport**. Do not select superseded hiking, map or flag-only versions. Batch-four Lake Kariba and Victoria Falls use the transparency-corrected masters in that batch's manifest.

## Remaining designs - exact route/file checklist

All rows currently use the generic seal. These are proposed briefs, not generated or approved art. Future master filenames are reserved conventions. Export filenames are content-hashed automatically; templates must read the manifest rather than hardcode filenames.

| Next batch | Page / route | Proposed scene | Frame | Exact caption | Future master |
|---|---|---|---|---|---|
| 5 | Dubai: `/travel/destinations/dubai/` | Three geometric skyline blocks with a route arc | Squared rectangle | DUBAI | `assets/illustrations/review-batch-05/travel-destinations-dubai-master.png` |
| 5 | Bali: `/travel/destinations/bali/` | Simplified temple gate and one leaf line | Rounded rectangle | BALI | `assets/illustrations/review-batch-05/travel-destinations-bali-master.png` |
| 5 | Work visas: `/visas/south-africa/work/` | Passport beside a briefcase and one upward route | Squared rectangle | WORK VISAS | `assets/illustrations/review-batch-05/visas-south-africa-work-master.png` |
| 5 | General Work Visa: `/visas/south-africa/work/general-work/` | Document with a simple work-badge shape | Rounded rectangle | GENERAL WORK | `assets/illustrations/review-batch-05/visas-south-africa-work-general-work-master.png` |
| 5 | Critical Skills Visa: `/visas/south-africa/work/critical-skills/` | Skill checklist lines and a small tool mark | Circle | CRITICAL SKILLS | `assets/illustrations/review-batch-05/visas-south-africa-work-critical-skills-master.png` |
| 6 | Intra-company Transfer Visa: `/visas/south-africa/work/intra-company-transfer/` | Two office blocks connected by one route | Squared rectangle | TRANSFER | `assets/illustrations/review-batch-06/visas-south-africa-work-intra-company-transfer-master.png` |
| 6 | Family & partner visas: `/visas/south-africa/family/` | Two overlapping passports connected by one line | Oval | FAMILY VISAS | `assets/illustrations/review-batch-06/visas-south-africa-family-master.png` |
| 6 | Spousal Visa: `/visas/south-africa/family/spousal/` | Two passport covers with a shared route line | Circle | SPOUSAL | `assets/illustrations/review-batch-06/visas-south-africa-family-spousal-master.png` |
| 6 | Life Partner Visa: `/visas/south-africa/family/life-partner/` | Two parallel route lines joining at one waypoint | Oval | LIFE PARTNER | `assets/illustrations/review-batch-06/visas-south-africa-family-life-partner-master.png` |
| 6 | Relative Visa: `/visas/south-africa/family/relative/` | Three simple document tabs linked like a family branch | Rounded rectangle | RELATIVE | `assets/illustrations/review-batch-06/visas-south-africa-family-relative-master.png` |
| 7 | Visit & special-purpose visas: `/visas/south-africa/visit/` | Suitcase and a small calendar block with no date | Rounded rectangle | VISIT VISAS | `assets/illustrations/review-batch-07/visas-south-africa-visit-master.png` |
| 7 | Tourism & Visitor Visa: `/visas/south-africa/visit/tourism/` | Suitcase, plane and one horizon line | Oval | TOURISM | `assets/illustrations/review-batch-07/visas-south-africa-visit-tourism-master.png` |
| 7 | Medical Treatment Visa: `/visas/south-africa/visit/medical/` | Passport beside a simple medical cross | Circle | MEDICAL VISA | `assets/illustrations/review-batch-07/visas-south-africa-visit-medical-master.png` |
| 7 | Volunteer Visa: `/visas/south-africa/visit/volunteer/` | Open hand-like route shape and a document | Rounded rectangle | VOLUNTEER | `assets/illustrations/review-batch-07/visas-south-africa-visit-volunteer-master.png` |
| 7 | Treaty Visa: `/visas/south-africa/visit/treaty/` | Two documents aligned across a connecting line | Squared rectangle | TREATY VISA | `assets/illustrations/review-batch-07/visas-south-africa-visit-treaty-master.png` |
| 8 | Permanent Residence: `/visas/south-africa/permanent-residence/` | House outline with a route arriving at the door | Squared rectangle | RESIDENCE | `assets/illustrations/review-batch-08/visas-south-africa-permanent-residence-master.png` |
| 8 | Extensions & waivers: `/visas/south-africa/extensions-and-waivers/` | Document with a returning arrow and a small note line | Rounded rectangle | EXTENSIONS | `assets/illustrations/review-batch-08/visas-south-africa-extensions-and-waivers-master.png` |
| 8 | Visa Extension: `/visas/south-africa/extensions-and-waivers/extension/` | Passport page with one circular continuation arrow | Oval | EXTENSION | `assets/illustrations/review-batch-08/visas-south-africa-extensions-and-waivers-extension-master.png` |
| 8 | Waiver Assistance: `/visas/south-africa/extensions-and-waivers/waiver/` | Document and a speech note connected by a route | Squared rectangle | WAIVER ASSISTANCE | `assets/illustrations/review-batch-08/visas-south-africa-extensions-and-waivers-waiver-master.png` |
| 8 | Business Visa: `/visas/south-africa/business/` | Briefcase and a document route | Squared rectangle | BUSINESS VISA | `assets/illustrations/review-batch-08/visas-south-africa-business-master.png` |
| 9 | Retirement Visa: `/visas/south-africa/retirement/` | Suitcase, low horizon and an open book | Oval | RETIREMENT VISA | `assets/illustrations/review-batch-09/visas-south-africa-retirement-master.png` |
| 9 | Australia: `/visas/international/australia/` | Southern-cross-like four-point route cluster and a passport | Squared rectangle | AUSTRALIA | `assets/illustrations/review-batch-09/visas-international-australia-master.png` |
| 9 | Canada: `/visas/international/canada/` | Single maple leaf beside a document | Circle | CANADA | `assets/illustrations/review-batch-09/visas-international-canada-master.png` |
| 9 | Czech Republic: `/visas/international/czech-republic/` | Simplified bridge arch and route line | Rounded rectangle | CZECH REPUBLIC | `assets/illustrations/review-batch-09/visas-international-czech-republic-master.png` |
| 9 | Denmark: `/visas/international/denmark/` | Harbour mast and one low wave | Oval | DENMARK | `assets/illustrations/review-batch-09/visas-international-denmark-master.png` |
| 10 | United Arab Emirates: `/visas/international/united-arab-emirates/` | Three skyline strokes and a passport | Squared rectangle | UNITED ARAB EMIRATES | `assets/illustrations/review-batch-10/visas-international-united-arab-emirates-master.png` |
| 10 | Finland: `/visas/international/finland/` | Pine silhouette and a small document | Circle | FINLAND | `assets/illustrations/review-batch-10/visas-international-finland-master.png` |
| 10 | Hungary: `/visas/international/hungary/` | Bridge arch over a single river line | Rounded rectangle | HUNGARY | `assets/illustrations/review-batch-10/visas-international-hungary-master.png` |
| 10 | Lithuania: `/visas/international/lithuania/` | Old-town roofline and route mark | Squared rectangle | LITHUANIA | `assets/illustrations/review-batch-10/visas-international-lithuania-master.png` |
| 10 | New Zealand: `/visas/international/new-zealand/` | Fern frond and passport corner | Oval | NEW ZEALAND | `assets/illustrations/review-batch-10/visas-international-new-zealand-master.png` |
| 11 | Poland: `/visas/international/poland/` | Two city blocks and a route line | Rounded rectangle | POLAND | `assets/illustrations/review-batch-11/visas-international-poland-master.png` |
| 11 | United Kingdom: `/visas/international/united-kingdom/` | Clock face outline with no time and a passport | Circle | UNITED KINGDOM | `assets/illustrations/review-batch-11/visas-international-united-kingdom-master.png` |
| 11 | United States: `/visas/international/united-states/` | Simple skyline, route arc and passport | Squared rectangle | UNITED STATES | `assets/illustrations/review-batch-11/visas-international-united-states-master.png` |
| 11 | For au pair candidates: `/au-pair/candidates/` | Suitcase and host-home outline linked by a route | Rounded rectangle | CANDIDATES | `assets/illustrations/review-batch-11/au-pair-candidates-master.png` |
| 11 | For host families: `/au-pair/host-families/` | Home outline with a welcoming path and document | Squared rectangle | HOST FAMILIES | `assets/illustrations/review-batch-11/au-pair-host-families-master.png` |
| 12 | For jobseekers: `/recruitment/candidates/` | CV sheet with a route leaving its edge | Squared rectangle | JOBSEEKERS | `assets/illustrations/review-batch-12/recruitment-candidates-master.png` |
| 12 | For employers: `/recruitment/employers/` | Office outline, two workstations and a document | Circle | EMPLOYERS | `assets/illustrations/review-batch-12/recruitment-employers-master.png` |
| 12 | Meet the Team: `/about/meet-the-team/` | Four simple portrait circles linked by a speech line | Rounded rectangle | THE TEAM | `assets/illustrations/review-batch-12/about-meet-the-team-master.png` |
| 12 | How it works: `/how-it-works/` | Three stepping lines joined by one forward arrow | Squared rectangle | THE PROCESS | `assets/illustrations/review-batch-12/how-it-works-master.png` |
| 12 | Planning a thoughtful trip: `/guides/travel-planning/` | Folded map and one route line | Oval | TRAVEL PLANNING | `assets/illustrations/review-batch-12/guides-travel-planning-master.png` |
| 13 | Getting your documents organised: `/guides/document-readiness/` | Stacked documents with a clip line | Squared rectangle | DOCUMENT READINESS | `assets/illustrations/review-batch-13/guides-document-readiness-master.png` |
| 13 | Preparing for a family move: `/guides/moving-with-family/` | House, suitcase and linked route | Rounded rectangle | FAMILY MOVE | `assets/illustrations/review-batch-13/guides-moving-with-family-master.png` |
| 13 | Frequently asked questions: `/faqs/` | Two speech bubbles and a small document | Circle | QUESTIONS | `assets/illustrations/review-batch-13/faqs-master.png` |
| 13 | Privacy notice: `/privacy/` | Lock outline integrated with a document | Squared rectangle | PRIVACY | `assets/illustrations/review-batch-13/privacy-master.png` |
| 13 | Service terms: `/terms/` | Document and pen line | Rounded rectangle | TERMS | `assets/illustrations/review-batch-13/terms-master.png` |
| 14 | Travel & booking information: `/travel-terms/` | Travel ticket shape and route line | Oval | TRAVEL TERMS | `assets/illustrations/review-batch-14/travel-terms-master.png` |
| 14 | Website preferences: `/cookies/` | Browser page with a simple settings toggle | Squared rectangle | WEBSITE SETTINGS | `assets/illustrations/review-batch-14/cookies-master.png` |
| 14 | Explore the full website: `/sitemap/` | Branching route map with three clean nodes | Clipped rectangle | SITE MAP | `assets/illustrations/review-batch-14/sitemap-master.png` |

## Fixed art direction

Use approved gallery images plus the owner's original twelve-stamp reference. Bold slightly italic heritage-serif Rusetat; exact secondary line Travel & Migration; bold engraved silhouettes, substantial double borders and restrained worn ink. One ink per asset: #092D53 navy, #0756A3 blue or #9221B6 purple. Match the approved lettering and visual weight while giving each page a meaningful distinct scene and frame.

Destination imagery should suggest holidays/vacations with recognizable local scenery. Country visa stamps should highlight the country through landmarks or cultural motifs, rather than random generic icons. Monochrome flags may be used when appropriate. No invented services, official crests, fake dates or approval/guarantee claims. Keep service labels accurate: STUDY VISA, not STUDY ABROAD.

True alpha transparency is required in all unprinted areas, including inside borders, lettering counters, ribbon lettering and ink-wear holes. Inspect on #EEF0F2, white and pale surfaces. Some dark inline tool previews are misleading: composite a review copy before rejecting it. Check for opaque near-white pixels; some transparency at the outer corners alone is insufficient. Use imagegen for artistic/background corrections and preserve superseded originals.

## Resume workflow

1. Read this handoff, catalogue and target route content. Recheck inventory if the app has gained pages.
2. Generate the next five remaining rows using the fixed prompt from stamp-map-and-prompt.md with filled page briefs and approved reference images. One separate transparent asset per generation call.
3. Save masters, exact prompts/source paths, a manifest and a grey/background-switching review gallery in the next review-batch directory. Review spelling, subject, full borders, family consistency and 240px appearance.
4. Obtain owner approval and add only selected approved records to catalogue.json. Unapproved routes keep the generic seal.
5. Run `python scripts/export_stamps.py`. It normalises intended single ink and quantises alpha coverage to eight levels, then losslessly encodes the processed artwork as WebP. This is not lossless relative to the original master; compare visually. Original PNGs stay untouched. Delivery budget: under 64 KiB per file. Do not ship large masters or review galleries.
6. Update counts in scripts/check_stamps.py, this backlog and approval records. Run the checks below, test /Rusetat hosting paths and inspect desktop/phone views.
7. Update README/CHANGELOG; commit/push when requested. No additional artwork generation is scheduled automatically.

## Runtime behaviour and verification

Exact approved route -> its unique stamp. Unfinished route -> shared generic Rusetat seal. Every footer -> compact seal. Home -> existing photo hero and footer seal only. Files use stable content-hashed URLs; pages fetch only their own stamp and the lazy-loaded footer. Decorative art has empty alt text and is hidden from assistive technology, while all useful information remains HTML.

```powershell
python scripts/build.py
python scripts/check.py
python scripts/check_machine_surface.py
python scripts/check_stamps.py
npm test
```

QA inventory: twenty approved route identities; 48 placeholders; 69 footer stamps; Home photograph retained; no white backing; no cropped frames, overlap or horizontal overflow at desktop and phone sizes; masters excluded from dist; project-path assets resolve. Recheck existing chat, contact and search behaviour. Exploratory checks: 320px screen and an unfinished country page. Git push and successful hosted deployment are distinct milestones.

## Integration verification on 1 November 2026

- Domain-root and /Rusetat builds passed all-page route/assets and stamp checks; machine-surface checks and nine existing JavaScript interaction tests passed.
- Browser review covered representative branches at 1440px, 390px and 320px, plus visa stamp/text spacing at 1024px, 900px and 768px. A pre-existing absolute-position overlap was fixed with a two-column grid. Mobile contact options and footer search were exercised.
- Twenty page designs plus one shared design produce 22 delivery variants totalling 771,694 bytes (about 754 KiB). Largest file is 47,848 bytes; footer is 7,206 bytes. Masters and galleries remain outside dist.
- npm audit cannot run without a lockfile; package.json has no runtime or development package dependencies. No new package was installed. Pillow is used only by the optional local authoring tool.
- Existing GitHub Pages workflows failed before this work because Pages is disabled. Connected repository permission is push, not admin; enabling Pages requires a repository administrator. Local preview is served on port 4183. Do not report Git push as a completed hosted deployment.
