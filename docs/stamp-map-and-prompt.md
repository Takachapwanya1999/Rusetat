# Rusetat stamp map and structured art prompt

Draft for review · 1 November 2026 · No artwork or website changes in this task.

## Authority and direction

The owner's supplied 12-stamp reference (WhatsApp Image 2026-11-01 at 09.14.04.jpeg) is the visual benchmark. The earlier conversation establishes page-specific subjects and shapes, imperfect ink, consistent typography, no glossy rendering, photographs inside stamps or gradients. The new reference replaces the sparse monoline interpretation with illustrated rubber-stamp emblems: bold silhouettes, substantial borders, expressive serif Rusetat lettering and restrained visible wear.

This draft supersedes the old illustration plan's overly minimal drawing rules, uppercase sans-serif-only lettering and narrow frame selection for future artwork. Existing branch layouts, photographic Home hero, actual services and brand logo remain the implementation baseline. The reference's red, green, brown and orange inks are inspiration; extending the website's navy/blue/purple ink palette remains a proposed art choice rather than an implemented palette change.

## Existing placement inventory

Source: scripts/build.py stamp(), branch_intro(), editorial(), hero() and footer(); website.css and branch-layouts.css. Generated local dist HTML inspected, not the deployed website.

Current local output: **69 public content pages, 68 page-opening stamp instances and 69 footer stamp instances.** The additional `/contact/` HTML file is a redirect to `/about/contact-us/` and has no stamp.

- Home: photographic hero; no hero stamp. Shared footer stamp still appears.
- Travel/destinations: atlas heading stamp; corporate travel has its own planning-strip composition.
- Visa/service/country pages: page-opening illustration beside the application introduction.
- Recruitment: career-mark slot; Au Pair: exchange-mark slot.
- About/team/process: letterhead mark; Guides: reading-title mark.
- Relocation: arrival composition beside the opening content.
- Contact/FAQs/sitemap: compact service introduction; policies: compact document mark.
- Footer: one shared blue brand stamp beside website search, repeated across routes. Design once, not a different footer illustration per page.
- Legacy root index.html contains an intro-stamp support badge. Treat it separately from generated dist output; do not count it as a current public hero.
- assets/illustrations contains the original raster specimen and review-set-01 candidates. They are reference/review assets, not the current inline SVG page stamps.

The current generator hashes page title/category to choose among four frames, five generic icons and eight captions. This makes combinations vary but does not map imagery or captions to page meaning. Replace that selection with an explicit route-to-approved-art manifest during implementation.

## Exact route audit

| Route | Page-opening instances | Shared footer instances |
|---|---:|---:|
| `/about/contact-us/` | 1 | 1 |
| `/about/` | 1 | 1 |
| `/about/meet-the-team/` | 1 | 1 |
| `/au-pair/candidates/` | 1 | 1 |
| `/au-pair/host-families/` | 1 | 1 |
| `/au-pair/` | 1 | 1 |
| `/contact/` | 0 | 0 |
| `/cookies/` | 1 | 1 |
| `/faqs/` | 1 | 1 |
| `/guides/document-readiness/` | 1 | 1 |
| `/guides/` | 1 | 1 |
| `/guides/moving-with-family/` | 1 | 1 |
| `/guides/travel-planning/` | 1 | 1 |
| `/how-it-works/` | 1 | 1 |
| `/` | 0 | 1 |
| `/privacy/` | 1 | 1 |
| `/recruitment/candidates/` | 1 | 1 |
| `/recruitment/employers/` | 1 | 1 |
| `/recruitment/` | 1 | 1 |
| `/relocation/` | 1 | 1 |
| `/sitemap/` | 1 | 1 |
| `/terms/` | 1 | 1 |
| `/travel/corporate/` | 1 | 1 |
| `/travel/destinations/bali/` | 1 | 1 |
| `/travel/destinations/cape-town/` | 1 | 1 |
| `/travel/destinations/dubai/` | 1 | 1 |
| `/travel/destinations/` | 1 | 1 |
| `/travel/destinations/kariba/` | 1 | 1 |
| `/travel/destinations/kruger/` | 1 | 1 |
| `/travel/destinations/mauritius/` | 1 | 1 |
| `/travel/destinations/victoria-falls/` | 1 | 1 |
| `/travel/destinations/zanzibar/` | 1 | 1 |
| `/travel/` | 1 | 1 |
| `/travel-terms/` | 1 | 1 |
| `/visas/` | 1 | 1 |
| `/visas/international/australia/` | 1 | 1 |
| `/visas/international/canada/` | 1 | 1 |
| `/visas/international/czech-republic/` | 1 | 1 |
| `/visas/international/denmark/` | 1 | 1 |
| `/visas/international/finland/` | 1 | 1 |
| `/visas/international/hungary/` | 1 | 1 |
| `/visas/international/` | 1 | 1 |
| `/visas/international/lithuania/` | 1 | 1 |
| `/visas/international/new-zealand/` | 1 | 1 |
| `/visas/international/poland/` | 1 | 1 |
| `/visas/international/united-arab-emirates/` | 1 | 1 |
| `/visas/international/united-kingdom/` | 1 | 1 |
| `/visas/international/united-states/` | 1 | 1 |
| `/visas/south-africa/business/` | 1 | 1 |
| `/visas/south-africa/extensions-and-waivers/extension/` | 1 | 1 |
| `/visas/south-africa/extensions-and-waivers/` | 1 | 1 |
| `/visas/south-africa/extensions-and-waivers/waiver/` | 1 | 1 |
| `/visas/south-africa/family/` | 1 | 1 |
| `/visas/south-africa/family/life-partner/` | 1 | 1 |
| `/visas/south-africa/family/relative/` | 1 | 1 |
| `/visas/south-africa/family/spousal/` | 1 | 1 |
| `/visas/south-africa/` | 1 | 1 |
| `/visas/south-africa/permanent-residence/` | 1 | 1 |
| `/visas/south-africa/retirement/` | 1 | 1 |
| `/visas/south-africa/study/` | 1 | 1 |
| `/visas/south-africa/visit/` | 1 | 1 |
| `/visas/south-africa/visit/medical/` | 1 | 1 |
| `/visas/south-africa/visit/tourism/` | 1 | 1 |
| `/visas/south-africa/visit/treaty/` | 1 | 1 |
| `/visas/south-africa/visit/volunteer/` | 1 | 1 |
| `/visas/south-africa/work/corporate/` | 1 | 1 |
| `/visas/south-africa/work/critical-skills/` | 1 | 1 |
| `/visas/south-africa/work/general-work/` | 1 | 1 |
| `/visas/south-africa/work/` | 1 | 1 |
| `/visas/south-africa/work/intra-company-transfer/` | 1 | 1 |

## Proposed art map

The following inherited route inventory records subjects to retain, not final drawing instructions. Apply the richer reference style and overrides below to every row. Shapes are starting points; use shield, scalloped seal, perforated postage frame, triangle, hexagon and oval as meaningful alternatives. No two page masters may differ only by caption, rotation or colour.

### Travel and destinations

| Route | Stamp concept | Shape | Caption | Composition note |
|---|---|---|---|---|
| `/travel/` | Suitcase with one short route line and a small plane | Horizontal oval | JOURNEY | Broad, open frame; the route should feel considered, not like a flight tracker |
| `/travel/destinations/` | Compass point over a simplified horizon line | Circle | DESTINATIONS | Central motif with generous breathing room |
| `/travel/destinations/cape-town/` | Table Mountain profile with one route line | Squared rectangle | CAPE TOWN | Keep the mountain to a few contour lines; no photographic skyline |
| `/travel/destinations/kariba/` | Small boat line on two quiet water bands | Rounded rectangle | LAKE KARIBA | Horizontal frame reinforces the water; no scenic landscape detail |
| `/travel/destinations/victoria-falls/` | Falling vertical lines and a low spray arc | Circle | VICTORIA FALLS | Abstract the falls; avoid a realistic landmark illustration |
| `/travel/destinations/kruger/` | Acacia silhouette with a single animal track line | Squared rectangle | SAFARI | No animal portrait; the track communicates movement and discovery |
| `/travel/destinations/zanzibar/` | Dhow sail and one low wave line | Oval | ZANZIBAR | One sail shape only; retain clear negative space |
| `/travel/destinations/mauritius/` | Island ridge, a single palm frond and wave line | Oval | MAURITIUS | Keep the palm as a small cue, not a tropical illustration |
| `/travel/destinations/dubai/` | Three geometric skyline blocks with a route arc | Squared rectangle | DUBAI | No luxury cues, gold, glow or skyscraper realism |
| `/travel/destinations/bali/` | Simplified temple gate and one leaf line | Rounded rectangle | BALI | Avoid ornate religious detail; use an unmistakable gate silhouette |
| `/travel/corporate/` | Briefcase, meeting table line and a short route | Squared rectangle | CORPORATE TRAVEL | Administrative and useful; no people or boardroom photography inside |

### Visas and South African migration

| Route | Stamp concept | Shape | Caption | Composition note |
|---|---|---|---|---|
| `/visas/` | Passport, globe grid and a short connecting route | Oval | VISA SUPPORT | This is the parent stamp for the whole visa family |
| `/visas/south-africa/` | Document sheet with a simple southern-Africa outline | Rounded rectangle | SOUTH AFRICA VISAS | Use a geographic cue, not a flag or government emblem |
| `/visas/south-africa/work/` | Passport beside a briefcase and one upward route | Squared rectangle | WORK VISAS | No employment guarantee language or “approved” mark |
| `/visas/south-africa/work/general-work/` | Document with a simple work-badge shape | Rounded rectangle | GENERAL WORK | Badge is a document cue, not an accreditation seal |
| `/visas/south-africa/work/critical-skills/` | Skill checklist lines and a small tool mark | Circle | CRITICAL SKILLS | Avoid stars; the tool line communicates practical expertise |
| `/visas/south-africa/work/intra-company-transfer/` | Two office blocks connected by one route | Squared rectangle | TRANSFER | Keep both blocks equal; no corporate logo shapes |
| `/visas/south-africa/work/corporate/` | Office document and briefcase | Rounded rectangle | CORPORATE VISA | A practical document impression, not a company certification |
| `/visas/south-africa/family/` | Two overlapping passports connected by one line | Oval | FAMILY VISAS | Avoid literal faces and hearts; relationship is expressed by connection |
| `/visas/south-africa/family/spousal/` | Two passport covers with a shared route line | Circle | SPOUSAL | Keep the pair abstract and dignified |
| `/visas/south-africa/family/life-partner/` | Two parallel route lines joining at one waypoint | Oval | LIFE PARTNER | No romantic iconography; focus on shared planning |
| `/visas/south-africa/family/relative/` | Three simple document tabs linked like a family branch | Rounded rectangle | RELATIVE | Use structure rather than cartoon people |
| `/visas/south-africa/study/` | Open book with a small passport corner | Circle | STUDY VISA | Keep the book linework spare and sturdy |
| `/visas/south-africa/visit/` | Suitcase and a small calendar block with no date | Rounded rectangle | VISIT VISAS | The blank calendar means planning, not a promised appointment |
| `/visas/south-africa/visit/tourism/` | Suitcase, plane and one horizon line | Oval | TOURISM | No camera or postcard decoration |
| `/visas/south-africa/visit/medical/` | Passport beside a simple medical cross | Circle | MEDICAL VISA | Cross must remain a neutral topic cue, never an official seal |
| `/visas/south-africa/visit/volunteer/` | Open hand-like route shape and a document | Rounded rectangle | VOLUNTEER | Use one continuous helping line; avoid charity clichés |
| `/visas/south-africa/visit/treaty/` | Two documents aligned across a connecting line | Squared rectangle | TREATY VISA | No handshake icon; keep it administrative and neutral |
| `/visas/south-africa/permanent-residence/` | House outline with a route arriving at the door | Squared rectangle | RESIDENCE | Home is a planning idea, not a property promise |
| `/visas/south-africa/extensions-and-waivers/` | Document with a returning arrow and a small note line | Rounded rectangle | EXTENSIONS | Arrow communicates continuation, not guaranteed approval |
| `/visas/south-africa/extensions-and-waivers/extension/` | Passport page with one circular continuation arrow | Oval | EXTENSION | Keep the arrow open and modest |
| `/visas/south-africa/extensions-and-waivers/waiver/` | Document and a speech note connected by a route | Squared rectangle | WAIVER ASSISTANCE | Avoid a checkmark, seal or “accepted” language |
| `/visas/south-africa/business/` | Briefcase and a document route | Squared rectangle | BUSINESS VISA | No currency, growth arrow or finance imagery |
| `/visas/south-africa/retirement/` | Suitcase, low horizon and an open book | Oval | RETIREMENT VISA | Calm and considered; no age stereotypes |

### International visa destinations

| Route | Stamp concept | Shape | Caption |
|---|---|---|---|
| `/visas/international/` | Globe grid with passport and short route | Circle | INTERNATIONAL VISAS |
| `/visas/international/australia/` | Southern-cross-like four-point route cluster and a passport | Squared rectangle | AUSTRALIA |
| `/visas/international/canada/` | Single maple leaf beside a document | Circle | CANADA |
| `/visas/international/czech-republic/` | Simplified bridge arch and route line | Rounded rectangle | CZECH REPUBLIC |
| `/visas/international/denmark/` | Harbour mast and one low wave | Oval | DENMARK |
| `/visas/international/united-arab-emirates/` | Three skyline strokes and a passport | Squared rectangle | UNITED ARAB EMIRATES |
| `/visas/international/finland/` | Pine silhouette and a small document | Circle | FINLAND |
| `/visas/international/hungary/` | Bridge arch over a single river line | Rounded rectangle | HUNGARY |
| `/visas/international/lithuania/` | Old-town roofline and route mark | Squared rectangle | LITHUANIA |
| `/visas/international/new-zealand/` | Fern frond and passport corner | Oval | NEW ZEALAND |
| `/visas/international/poland/` | Two city blocks and a route line | Rounded rectangle | POLAND |
| `/visas/international/united-kingdom/` | Clock face outline with no time and a passport | Circle | UNITED KINGDOM |
| `/visas/international/united-states/` | Simple skyline, route arc and passport | Squared rectangle | UNITED STATES |
| `/relocation/` | Open doorway, suitcase and route entering the threshold | Rounded rectangle | ARRIVAL |

Country motifs are deliberately simplified and must not become flags, official seals or tourist posters. The country name remains visible as HTML copy outside the stamp.

### Au pair, recruitment and people

| Route | Stamp concept | Shape | Caption |
|---|---|---|---|
| `/au-pair/` | House outline, suitcase and two speech lines | Oval | AU PAIR |
| `/au-pair/candidates/` | Suitcase and host-home outline linked by a route | Rounded rectangle | CANDIDATES |
| `/au-pair/host-families/` | Home outline with a welcoming path and document | Squared rectangle | HOST FAMILIES |
| `/recruitment/` | Document, route and two aligned work blocks | Rounded rectangle | RECRUITMENT |
| `/recruitment/candidates/` | CV sheet with a route leaving its edge | Squared rectangle | JOBSEEKERS |
| `/recruitment/employers/` | Office outline, two workstations and a document | Circle | EMPLOYERS |
| `/about/` | Compass, passport and one open route | Circle | ABOUT RUSETAT |
| `/about/meet-the-team/` | Four simple portrait circles linked by a speech line | Rounded rectangle | THE TEAM |
| `/about/contact-us/` | Speech bubble, phone line and a route marker | Oval | CONTACT |
| `/how-it-works/` | Three stepping lines joined by one forward arrow | Squared rectangle | THE PROCESS |

People stamps use abstract circles and line relationships. They do not depict actual staff, clients, ages or facial likenesses.

### Guides, questions and policies

| Route | Stamp concept | Shape | Caption |
|---|---|---|---|
| `/guides/` | Open booklet with passport corner | Rounded rectangle | GUIDES |
| `/guides/travel-planning/` | Folded map and one route line | Oval | TRAVEL PLANNING |
| `/guides/document-readiness/` | Stacked documents with a clip line | Squared rectangle | DOCUMENT READINESS |
| `/guides/moving-with-family/` | House, suitcase and linked route | Rounded rectangle | FAMILY MOVE |
| `/faqs/` | Two speech bubbles and a small document | Circle | QUESTIONS |
| `/privacy/` | Lock outline integrated with a document | Squared rectangle | PRIVACY |
| `/terms/` | Document and pen line | Rounded rectangle | TERMS |
| `/travel-terms/` | Travel ticket shape and route line | Oval | TRAVEL TERMS |
| `/cookies/` | Browser page with a simple settings toggle | Squared rectangle | WEBSITE SETTINGS |
| `/sitemap/` | Branching route map with three clean nodes | Clipped rectangle | SITE MAP |

Policy stamps must be especially restrained. They support orientation and should never make legal text feel playful or imply a security certification.


## Priority concept overrides from the new reference

| Page | Proposed artwork | Frame | Ink proposal |
|---|---|---|---|
| Travel | Globe with orbiting aircraft; Rusetat prominent | Perforated postage rectangle | Blue |
| Destinations | Mountain, winding path and small traveller silhouette | Hexagon | Navy |
| Corporate travel | Aircraft and airport/terminal scene | Rounded rectangle | Blue |
| Visas | Passport/document consultation scene; no approval claim | Double-border rectangle | Navy |
| Corporate visa | Professionals with city skyline | Shield and short ribbon | Purple |
| Study visa | Graduation cap above open book | Academic shield | Navy |
| Relocation | House, luggage, globe arc and arrival arrow | Scalloped round seal | Blue |
| Kruger | Elephant silhouette, acacia and sun disc | Scalloped scenic seal | Navy |
| Zanzibar | Dhow, palms and coastal horizon | Round seal | Blue |
| Mauritius | Island ridge, lagoon and palm | Oval seal | Blue |
| Contact | Telephone and correspondence scene | Rounded rectangle | Purple |
| Shared footer | Globe and aircraft, Rusetat brand name | Compact oval | Blue |

Use STUDY VISA for the existing study-visa page. Do not introduce a Study Abroad service page or a new tours package claim merely because those labels occur in the reference. Every other route above receives its own relevant central scene, including distinct subjects for related visa and country pages. Policy designs remain quieter and simpler.

## Reusable master prompt

Copy the fixed block unchanged. Fill the page brief below it. Attach the supplied reference image to every generation; use a reviewed new master as a second reference once available. Generate one stamp per image, never a contact sheet as the production asset.

```text
TASK
Create ONE finished Rusetat Travel & Migration illustrated rubber-stamp asset for the PAGE BRIEF below. Use the attached twelve-stamp image as the primary visual reference. Match its physical ink-impression character, strong typography and composed scenes.

FIXED FAMILY STYLE
An illustrated agency stamp, with bold engraved-looking silhouettes, supporting contour lines, open negative space, and a substantial outer border plus a thinner inner border. Use modest irregular ink coverage, tiny transparent pinholes and a few worn edges. Preserve a clear silhouette, readable lettering and most of the border. The entire scene, lettering and frame use ONE ink colour. All unprinted space is transparent, including inside the frame.

LETTERING
Exact brand name: "Rusetat" in a bold, slightly italic heritage serif, closely matching the reference's weight and character. Exact secondary line: "Travel & Migration" in consistent bold lettering. Optional short service caption: PAGE BRIEF text exactly, in a bold compact uppercase face, on a ribbon or baseline only when specified. Keep the same lettering character and hierarchy throughout the collection. Do not redraw the company's actual logo.

COMPOSITION
The central scene must express this page's actual purpose. Use one coherent scene with one dominant motif and at most two supporting motifs. Include enough solid ink mass to resemble the supplied illustrations; do not reduce the scene to a tiny generic outline icon. Keep scene, brand name and caption separated. Use the specified frame with natural proportions and approximately 8% transparent clearance beyond its furthest edge. Keep artwork upright; any small presentation rotation belongs in the website layout.

VARIATION
Follow this page's motif and frame. Related pages share craft, typography, ink behaviour and hierarchy, while each has a distinct illustration and composition. Never substitute a random generic icon, change only the caption, or select a scene by hashing the title.

OUTPUT
One isolated transparent PNG master, at least 1536 pixels on the longest edge, sharp enough for display at 240–400 CSS pixels. Fit the whole border and any ribbon within the canvas. No paper, checkerboard baked into the image, background scene, mockup, physical stamping tool or surrounding objects.

EXCLUDE
Gradients, shadows, glow, bevels, 3D, metallic effects, photography, smooth glossy sticker rendering, multicolour ink, heavy scratch overlays, muddy texture, tiny illegible text, unrelated landmarks, official crests, government seals, invented dates or case numbers, approval/acceptance claims and guarantees. Do not copy reference labels that are absent from the page brief.

PAGE BRIEF
Route: {route}
Actual page purpose: {purpose}
Audience: {audience}
Dominant motif: {main_motif}
Supporting motifs, maximum two: {supporting_motifs}
Frame: {frame}
Single ink colour, exact hex: {ink}
Brand text: Rusetat
Secondary text: Travel & Migration
Service caption, exact or NONE: {caption}
Caption treatment: {ribbon / lower arc / straight baseline / none}
Composition: {scene position, lettering position, distinctive arrangement}
Distinct from sibling stamps because: {specific visual difference}
Intended placement and minimum display width: {placement}, {width}px
```

## Filled example: study visa

```text
Route: /visas/south-africa/study/
Actual page purpose: Guidance on South African study visa applications
Audience: Prospective students and families
Dominant motif: Graduation cap above an open book
Supporting motifs: Two restrained laurel sprigs
Frame: Double-bordered academic shield
Single ink colour: #092D53
Brand text: Rusetat
Secondary text: Travel & Migration
Service caption: STUDY VISA
Caption treatment: Short ribbon across lower shield
Composition: Cap and book in upper half; Rusetat large across centre;
secondary line below; service ribbon at base, clear of lettering.
Distinct from siblings: Academic shield and cap/book scene, no passport/briefcase scene.
Intended placement and minimum display width: Study visa opening, 240px
```

## Review and implementation sequence

1. Review five style masters together: Travel, Study Visa, Corporate Visa, Relocation and Kruger. These test lettering, five meaningful scenes and frame variation.
2. Compare each against the supplied reference at full size and 240px: scene recognition, spelling, border weight, transparent gaps and believable wear. Revise the shared prompt if the family drifts.
3. Produce remaining route masters from the map, maintaining the same typography and ink craft. Record route, filename, prompt, reference and review status in an explicit manifest.
4. Prepare a simplified shared footer derivative for its existing 80–112px slot; omit small service text and fine scene details there. Do not shrink the detailed hero artwork blindly.
5. Integrate only reviewed assets, preserving branch-specific placements. Verify phone layout, full borders, accessible alternatives and actual page meaning.

Status: mapping and prompt draft only. No artwork generation, asset replacement, deployment or palette extension performed.
