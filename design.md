# Rusetat design system

Version 1.0 · 1 November 2026 · Website, brand illustrations and shared digital experiences

## 1. Purpose and authority

Rusetat helps people and organisations navigate travel, migration and related opportunities. Its design must make a complex journey feel understandable, personal and well organised. Clear information and a useful next action come first; the visual identity gives that information a recognisable home.

This document extends the existing website design and image library. It establishes **the rubber stamp as Rusetat’s core illustration language**. Every page hero gets its own unique rubber-stamp design illustration. The page’s subject, caption, frame shape, scale, angle and small scene details may vary, while the ink colour, line economy, imperfect texture and typography keep the identity recognisable.

This is a design contract, not evidence that every rule has already been implemented or that the website is approved for public release. It does not authorise changes to service scope, applications, payments, private client data or operational systems.

### Source hierarchy

1. The user’s current brand direction, recorded here, governs new illustration work.
2. `website.css` defines the current generated website tokens and components. `scripts/build.py` generates the site served from `dist/`.
3. `images/`, the existing logo, generated imagery, destination photographs, team illustrations and flags remain the asset library. Preserve their provenance and use restrictions.
4. `docs/unslop-audit.md` records the preceding website cleanup. Its objection to an arbitrary decorative stamp is superseded for deliberate brand illustration by this document; its restrained layout and usability principles still apply.
5. The workspace-level `../../DESIGN.md` is an earlier staff-portal contract, with different historical tokens and typography. Do not silently apply its Poppins/royal-blue/magenta choices to this website, or this website’s Georgia/Arial choices to the staff portal.

When code and this document differ, distinguish existing implementation from the intended rule. Update the owning component deliberately rather than introducing an isolated exception.

## 2. Brand character

| Quality | Visual expression | Avoid |
|---|---|---|
| Experienced | Measured composition, clear hierarchy, believable ink impressions | Claims of official authority or guaranteed outcomes |
| Personal | Warm, direct copy and room for individual circumstances | Faceless corporate jargon or sentimental stock slogans |
| Well travelled | Passport/airport stamp vocabulary, economical journey scenes | Random landmark collages and travel clichés in every section |
| Organised | Stable grids, consistent controls, useful steps and labels | Decorative dashboard panels and unnecessary numbering |
| Trustworthy | Honest states, readable details, visible limits and next actions | False approval marks, invented credentials and misleading success messages |

The distinctive combination is editorial typography, blue and purple, quiet surfaces, existing imagery and restrained ink-stamp illustrations. A page should feel like Rusetat even without an illustration; the illustration should remain recognisable when viewed by itself.

## 3. Existing assets and the new illustration layer

This is an addition to the design system, not a replacement of the existing images.

### Subpage hero direction

**Current branch-layout rule — 1 November 2026:** retain the shared palette,
typography and stamp grammar, but give each main path a distinct UI composition
and reading flow. Consistency is required within a branch, not one repeated
layout across all services. [Branch layout families](docs/branch-layouts.md)
records the implemented structure and supersedes older copy-left/stamp-right
requirements wherever they conflict. Grey subpage surfaces remain; photography
can support the body without turning every intro into the same image split.

Subpages retain a neutral light-grey opening and a matching stamp, with placement
and reading flow determined by their branch. They do not use a full-bleed photo
behind the intro copy. Home remains the photographic entry-point exception.
The route-by-route [art briefs](docs/illustration-plan.md) guide illustration
subjects rather than enforcing one shared page composition.

Current hero token: `--hero-gray: #EEF0F2`. Copy stays dark `--deep` blue and the
stamp uses one contrasting ink colour. Supporting photography appears where it
provides destination or service context. The branch layouts still require visual
browser review; implementation is not a record of visual approval.

- Keep the supplied `images/Rusetat logo.png` as the logo. Preserve its aspect ratio, artwork and transparency. Do not distress it, put it through a texture filter or recreate it as stamp lettering.
- Keep destination photographs as destination imagery. Do not clip them into a stamp or convert them into photographic stamp scenes.
- Keep the existing generated travel imagery and team portraits under their existing provenance and labelling. A generated portrait is not evidence of someone’s actual appearance; do not remove existing disclosures.
- Keep country flags accurate and separate from illustrations. They identify a country and are not decorative stamp motifs.
- Keep the vendored Lucide interface icons for navigation and actions. Clean functional icons and textured brand illustrations have different jobs.
- New illustrated scenes follow the stamp grammar. Existing imagery may coexist outside the stamp, with enough space to avoid a collage.

### Asset selection

| Communication need | Preferred asset |
|---|---|
| Identify the company | Original logo |
| Show an actual place or existing travel offering | Existing appropriately sourced destination image |
| Explain migration, preparation, consultation or a journey concept | Rubber-stamp illustration |
| Identify a country in a directory | Existing flag plus visible country name |
| Operate a control | Clean, consistent interface icon plus label where needed |
| Explain a process precisely | HTML text and structured steps, optionally supported by one stamp |

## 4. Colour system

### Current website tokens

These values come from `website.css`, inspected on 1 November 2026. They are the website reference, not a fresh extraction from the live public website.

| CSS token | Value | Role |
|---|---|---|
| `--blue` | `#0756A3` | Brand blue, links and selected supporting accents |
| `--deep` | `#092D53` | Header, dark sections and default stamp ink |
| `--accent` | `#9221B6` | Primary action and the purple contact strip |
| `--accent-hover` | `#741493` | Primary-action hover |
| `--paper` | `#F7F9FC` | Default page canvas |
| `--pale` | `#EDF1F6` | Secondary quiet surface |
| `--ink` | `#1B2C43` | Main text |
| `--secondary` | `#4E6076` | Secondary text |
| `--muted` | `#5B6C80` | Supporting labels and metadata |
| `--line` | `#DCE2E9` | Nonessential dividers |
| `--light-ink` | `#F5F7FA` | Primary text on dark surfaces |
| `--light-secondary` | `#D1DCE8` | Supporting text on dark surfaces |
| `--light-line` | `#FFFFFF24` | Quiet dividers on dark surfaces |

Use white for forms and other raised surfaces. Purple is purposeful: primary actions, the established contact strip and limited brand accents. Avoid making each card a different colour. Use dark blue as the default stamp ink; blue or purple are optional single-ink variants when the surrounding composition calls for them.

### Stamp colour rules

- One ink colour per impression. The transparent gaps reveal the surface underneath.
- Default ink: `#092D53`; alternatives: `#0756A3` or `#9221B6`.
- A light single-ink derivative may be prepared for dark backgrounds, but it must be reviewed independently. Do not assume the navy master works on dark blue.
- Do not use multicolour landmarks, black photographic shading, coloured shadows, metallic effects or rainbow accents inside a stamp.
- Ink irregularity is local loss of coverage, not a colour gradient. Never use a gradient to simulate stamping pressure.
- Do not lower the entire illustration’s opacity until it resembles a watermark. Keep the impression clear and let local texture create variation.

## 5. Typography

### Interface and editorial type

The generated website uses Georgia with Times New Roman/serif fallback for headings, and Arial with Helvetica/sans-serif fallback for body text. Keep this pairing. No new webfont dependency is required by this extension.

| Role | Desktop reference | Phone reference | Treatment |
|---|---|---|---|
| Main page title | 48–72px | 40–48px when needed | Georgia, regular, line-height about 1.1 |
| Section heading | 36–48px | 30–36px | Georgia, regular, line-height 1.1–1.2 |
| Card/detail heading | 24–28px | 24–28px | Georgia, regular, line-height 1.2 |
| Lead paragraph | 18px | 18px | Arial, line-height 1.6–1.65 |
| Body and input | 16px | 16px | Arial, line-height 1.65 |
| Navigation and control | 14–16px | 14–16px | Arial, clear weight and spacing |
| Supporting metadata | 12–14px | Prefer 14px for essential information | Arial; never hide conditions in tiny copy |

The phone ranges above are design targets; check the actual responsive selectors before changing a component. Use sentence case for headings, buttons and normal labels. Avoid repeated italics, all-caps section labels and widely tracked body copy.

### Stamp lettering

Stamp typography is a controlled exception: short uppercase mechanically set sans-serif lettering belongs inside the impression. It should resemble the practical lettering on a passport stamp, not a distressed novelty typeface.

- Use one consistent sturdy condensed sans-serif treatment across the illustration family.
- For editable production artwork, use Arial Bold with modest tracking as the installed baseline. If a dedicated condensed family is later approved, record its name, licence and local font source before adopting it across the family.
- Do not squeeze text nonuniformly to fit a border. Shorten the caption or choose a wider frame.
- Keep letters recognisable despite ink wear. Never break a letter so far that its identity changes.
- Use at most two short text zones: brand identifier and service/topic caption. Prefer two to four words for the caption.
- Curved lettering is allowed on circular/oval frames; straight lettering suits rectangular frames. Preserve the same weight, uppercase convention and optical scale.
- Do not rotate individual characters, mix slab serif and sans serif, or introduce a different novelty font for each destination.
- AI-generated lettering is a visual reference, not an editable font master. Inspect every word; recreate with the approved type treatment if precision is required.

## 6. Rubber-stamp illustration grammar

### Required appearance

Each illustration must look as if a carved rubber die was pressed once onto a passport page. It is flat, economical and slightly imperfect. Authenticity comes from restrained uneven ink coverage and the relationship between border, lettering and scene, not from decorative clutter.

The illustration contains four layers:

1. **Frame:** a practical stamp silhouette, with a single or double border.
2. **Lettering:** short brand/topic text with stable typographic treatment.
3. **Scene:** one main object and at most two supporting elements, reduced to essential lines.
4. **Ink character:** small irregularities within the printed marks, with transparent negative space.

No photographic imagery, gloss, bevels, drop shadows, lighting effects, gradients, dimensional rendering, ornamental filigree, confetti or decorative background patterns belong inside this system.

### Shape adapts to content

| Shape | Suitable content | Construction guidance |
|---|---|---|
| Horizontal oval | Travel, arrival, general brand specimen | Broad central scene, short arc lettering, generous internal margin |
| Circle | Consultation, service category, compact section anchor | Central single motif; keep text away from the scene |
| Rounded rectangle | Documents, preparation, bookings and structured tasks | Straight caption bands, simple horizontal divisions |
| Squared rectangle | Corporate travel or document organisation | Practical administrative impression, not a decorative seal |
| Restrained polygon | Occasional distinct service/topic | Simple clipped corners; use rarely to preserve family coherence |

Do not assign a shape merely to make neighbouring cards look different. Choose the frame that best contains the content. Avoid shield badges, rosettes, award ribbons and starbursts, which suggest certification or official status.

### Scene design

- Reduce the topic to its simplest recognisable idea. Travel: passport and plane. Consultation: two simple speech outlines. Preparation: a document and checklist. Study: an open book with a small travel cue. Corporate travel: a briefcase and route.
- Draw objects as sparse outlines; no realistic faces, fabric folds, perspective-heavy buildings or photographic landmarks.
- Use one visual focus. A plane, passport, globe, suitcase, skyline and people together are too much for one stamp.
- Keep the scene inside the frame. Do not add swooshes or icons spilling beyond it.
- Use a route only when it helps explain movement; one short route is enough.
- Do not use genuine government crests, border-control insignia, visa security patterns, machine-readable zones or real application numbers.
- Avoid “APPROVED”, “VISA GRANTED”, “OFFICIAL” or entry/exit dates as decoration. A brand illustration must not imply that Rusetat issues visas or guarantees decisions.

### Construction measurements

The following are starting specifications for new artwork, not dimensions extracted from an existing official stamp.

| Property | Master-art guidance |
|---|---|
| Artboard | About 1536 × 1024px for an oval/rectangular raster master; 1024 × 1024px for a square master |
| Safe outer margin | At least 8% of the artboard on all sides |
| Occupied area | Approximately 65–80% of the artboard width |
| Main line | About 0.5–0.8% of the stamp width; adjust optically for small use |
| Secondary line | At least 70% of the main line weight; avoid hairlines |
| Double-border gap | About 1.5–2.5 times the main stroke |
| Internal clear space | At least 5% of stamp width between scene, lettering and border |
| Rotation | 0° default; up to ±3° where a natural impression helps |
| Texture coverage | Starting target: roughly 3–8% local ink dropout; judge by legibility |
| Main visual weight | Scene remains subordinate to neither an oversized border nor an oversized caption |

Use optical judgement. If the scene disappears or text closes up at its final size, simplify or create a small-use derivative rather than adding contrast tricks.

### Ink texture

Texture should reveal the stamping process. Use small pinholes in solid strokes, a few broken edges and modest variation in pressure. Preserve the majority of each border and character. The silhouette should read cleanly at a glance.

Texture is part of the artwork, not a page-wide CSS noise overlay. Distribute it irregularly; do not repeat an obvious tiled pattern. Avoid dense scratches, broad erased areas, blurred edges, repeated offset impressions and splattered ink around the stamp. Keep thin lines strong enough to survive compression and scaling.

Texture is never applied to UI labels, body copy, form controls, flags or the original logo.

## 7. Reference illustration

The initial specimen is **Travel & migration**: a horizontal oval impression in deep-blue ink, with a passport and a small ascending plane. It establishes the family’s frame/scene/text balance and restrained wear.

![Rusetat travel and migration rubber-stamp reference](assets/illustrations/rusetat-travel-migration-stamp.png)

Asset: `assets/illustrations/rusetat-travel-migration-stamp.png`. Creation and use details: `assets/illustrations/README.md`.

This is an AI-generated brand illustration, not an actual passport impression, official document, government seal or certification. Use it as a design-system specimen and an illustration asset after reviewing the intended placement. The generated site also renders a unique, inline per-page hero stamp from the shared stamp grammar; the PNG remains the primary raster reference specimen.

### Page-by-page uniqueness

Every generated page has a deterministic hero-stamp identity derived from its page title and eyebrow. The builder varies the frame family (oval, circle, rounded rectangle or squared rectangle), a restrained angle, a short caption and one minimal scene motif. This ensures the 69-page site does not reuse one generic illustration everywhere while avoiding a separate runtime request or an untracked asset for every route.

Home retains its photographic hero. Subpage stamps now sit in the composition of
their branch: an atlas masthead, letterhead, centred exchange opening, role brief,
reading-room title or another documented family. Destination pages retain their
stamp before their own destination photograph. Stamp size follows its role in
the composition; compact seals do not need the dimensions of a feature image.

The title and eyebrow are the source of identity, not arbitrary random noise. A future change to either may legitimately change the stamp; review it as a visual change. Keep each scene tied to the page’s subject and choose a caption from the approved short vocabulary. If a page needs a hand-authored special stamp, add its brief and provenance beside the generated family and pass it through the same component rather than hard-coding a one-off hero.

### Family consistency test

Put any two illustrations next to each other. They should share ink behaviour, approximate line weight, letter style, internal breathing room and scene simplicity. They may differ in shape and subject. If they could plausibly belong to unrelated companies, revise them before adding to the library.

## 8. Layout and placement

The page stays calm and functional. A stamp supports the story rather than becoming the layout itself.

### Layout foundations

- Use the existing maximum content width of 1280px and the established `.wrap` container.
- Follow a 4px spacing rhythm. Common gaps: 8, 12, 16, 24, 32, 48, 64 and 96px.
- Existing desktop section spacing is fluid between 64 and 96px. Maintain clear separation between unrelated sections.
- Use readable text measures: about 45–75 characters for sustained reading; shorter for leads and cards.
- Align headings, paragraphs and controls to a shared edge. Let imagery create variety without moving every element to a different axis.
- Prefer separators and whitespace over a box around every group. Existing controls/panels use an 8px base radius; do not convert the whole UI into postage-stamp edges.

### Stamp sizing and density

| Context | Recommended rendered width | Rule |
|---|---|---|
| Design-system specimen | 320–560px | Show texture clearly with generous space |
| Desktop hero or feature split | 240–400px | One main stamp; copy and action remain dominant |
| Phone feature section | 200–280px, within container | Place above/below copy, never obscure it |
| Service/supporting illustration | 160–240px | Keep nearby text outside the image |
| Very small slot | Below 160px | Use a reviewed simplified derivative or omit the stamp |

These are targets for the full illustration, not icon sizes. Do not shrink the reference to a 24px control. At small sizes, omit embedded wording and repeat the meaning in HTML rather than accepting illegible lettering.

Use one principal stamp per section and usually no more than three distinct impressions in a normal page. Do not repeat one on every card, every heading, every footer link or every process step. A long reference catalogue may show more because the artwork itself is the content.

### Pairing with existing images

Keep photography in its own rectangular image area. Place a stamp in adjacent negative space or in a separate supporting section. Avoid putting a textured mark over faces, document details or busy scenery. If a stamp must accompany a photograph, use a separate solid panel; never put the photograph inside the stamp border.

Leave clear space of at least 8% of stamp width around the visible impression. Do not overlap body text, buttons, navigation or legal information. Do not crop off the frame as a decorative effect.

The prohibition on gradients applies to new illustrations and stamp compositions. Existing photographic hero overlays in `website.css` remain part of the retained image treatment; this document does not replace them or extend gradients into new illustration work.

## 9. Components and interaction

### Navigation

Keep the original logo prominent on the dark-blue header, with consistent menu labels and visible contact access. Stamps do not become navigation items. Dropdowns and the mobile menu must support keyboard focus, Escape dismissal and returning focus to their trigger. Use visible labels for unfamiliar icons.

### Buttons and links

- Primary action: existing purple fill, white label and the existing darker hover tone.
- Secondary action: outline or text-link treatment matched to the background.
- Keep one dominant action in each decision area. Labels name the task: “Discuss your travel plans”, “View visa requirements”, “Prepare an enquiry”.
- Use at least 44px touch targets; current inputs are 48px high.
- Keep text links identifiable beyond colour where they appear within prose.
- Do not make controls textured, rotated or shaped like rubber stamps. Their job is reliable interaction.

### Cards and directories

Use actual titles, useful summaries and clear next links. Group comparable services consistently. Destination cards may retain existing photography; country directories retain flags. A stamp can introduce a collection but is not required on every entry. Filter selection must expose a written state and a meaningful result count/empty state.

### Forms

Use persistent labels, concise help text and 16px input text. Mark optional/required fields clearly. Put errors next to the relevant field and explain the correction. Preserve entered answers after validation failures. Ensure conditional fields are revealed in reading order and only active fields are validated.

Corporate briefs and enquiries currently prepare messages without a submission backend. Use wording that matches that behaviour: preparing, copying or downloading a brief does not mean the agency received it. Do not add a stamped “Received” or “Confirmed” image unless the underlying event genuinely occurred.

### Process and status

Use plain text, clean icons and structured steps for exact operational states. Keep enquiry, appointment, booking, application and government decision states distinct. A rubber stamp is a brand illustration, not a substitute for a status model. Colour and artwork must never be the only source of meaning.

### Empty, loading and failure states

| State | Required communication | Illustration use |
|---|---|---|
| Loading | What is being loaded; preserve layout | Optional static mark, never fake progress |
| Empty | What belongs here and an appropriate next action | One small relevant stamp if useful |
| No results | Current filter/search context and how to reset | Usually text only |
| Validation failure | Specific field correction; preserve answers | None needed |
| Connection failure | What failed, retained data and safe recovery | No success/approval imagery |
| Success | State only the completed action | Optional supporting mark; text remains authoritative |

## 10. Responsive behaviour

The current shared stylesheet uses breakpoints at 1200, 900 and 600px. Work with those before adding another breakpoint.

- Large screens: use established editorial splits and shared gutters; a stamp may balance a block of copy.
- At 900px and below: collapse complex layouts and use the existing mobile navigation treatment. Keep illustrations secondary to the reading order.
- At 600px and below: use a single-column flow, readable headings and controls that fit naturally. A stamp must fit within the content width including its transparent margins.
- Verify at 360px and 390px, plus 768px, 1280px and 1440px. No horizontal page overflow or hidden primary action.
- At 200% zoom, content must reflow and remain operable. Never put essential form guidance inside the stamp image.
- Use intrinsic `width` and `height` on raster assets to reserve space. Use `object-fit: contain` for stamps; `cover` may crop their borders.

## 11. Accessibility

Target WCAG 2.2 AA. Normal text needs at least 4.5:1 contrast, large text at least 3:1, and meaningful control boundaries/focus cues at least 3:1 against adjacent surfaces. Check actual combinations and states, including textured ink; a colour token alone does not establish compliance.

- Decorative stamp beside equivalent copy: use `alt=""`.
- Meaningful standalone illustration: use concise alt text such as “Rusetat travel and migration stamp with a passport and plane”. Explain the meaning, not every scratch.
- Repeat any necessary label or action in HTML. Embedded image text is not a replacement for accessible content.
- Keep stamped words readable at the intended size. If wear or scaling makes them ambiguous, simplify the artwork or remove the words in a derivative.
- Use semantic headings, lists, links and buttons. Preserve keyboard order and visible focus.
- Do not use colour alone for selected, failed or completed states.
- Keep brand illustrations static by default. No spinning stamps, bouncing entry effects or simulated stamping on every scroll. Honour reduced-motion preferences for any future animation.
- Do not make ink texture an animated overlay; it impairs reading and adds no useful information.

## 12. Copy and content

Write directly to the customer. Name the service, what information is needed and what happens next. Keep marketing copy separate from exact legal, pricing and visa eligibility statements; those require an owning source and review.

Use sentence case in UI and short uppercase captions only inside the stamp. Avoid “your next chapter”, “limitless possibilities” and vague exploration labels when a concrete task is available. Do not introduce public-facing pilot, trial or demo language as brand messaging. Internal environment labelling remains an operational decision.

Do not invent placement numbers, turnaround times, approval rates, testimonials or accreditations. Never imply that an illustration is evidence of a real journey or a successful application. Keep personal data, application numbers and realistic document identifiers out of decorative assets.

## 13. Production and asset delivery

### File organisation

```text
assets/illustrations/
  README.md
  rusetat-travel-migration-stamp.png
  provenance.json
```

Use descriptive kebab-case names: `rusetat-<topic>-stamp.<extension>`. Include a variant suffix only when it conveys a real difference, such as `-blue`, `-light` or `-small`. Preserve the original before producing a derivative. Do not overwrite an approved file to hide a changed style.

### Master and derivatives

- Retain a transparent high-resolution PNG master. Do not bake white or paper into an asset intended for multiple surfaces.
- If editable vector artwork is later commissioned, retain the source and a production SVG with controlled, legible texture. Avoid thousands of tiny paths or runtime filter noise merely to imitate wear.
- Produce a web derivative only after checking alpha, text and thin-line quality. WebP may be suitable when supported by the build pipeline; do not flatten transparency or introduce halos.
- Record the actual pixel dimensions and file size. Supply meaningful alternative text at the point of use, where its purpose is known.
- Use fixed-colour assets for brand consistency. A raster reference cannot be reliably recoloured with CSS filters.
- Do not add a new illustration dependency or font package for this extension.
- Keep the family’s reference specimen available locally; do not depend on an expiring generation URL.

### HTML placement example

Example only; this does not add an illustration to a current template. Replace the dimension placeholders with the file’s actual intrinsic dimensions when implementing.

```html
<!-- In a page template; image dimensions must match the actual asset. -->
<figure class="brand-illustration">
  <img src="/assets/illustrations/rusetat-travel-migration-stamp.png"
       alt="" loading="lazy" decoding="async">
</figure>
```

```css
/* Proposed component; add to website.css when a placement is implemented. */
.brand-illustration {
  width: min(100%, 360px);
  margin: 0;
}
.brand-illustration img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
```

Use the builder’s base-path handling when wiring an asset into generated pages; a root-relative path in this generic example is not a deployment implementation for GitHub Pages project paths. Confirm the build copies the asset and the checker can resolve its final URL.

### Provenance

For every new illustration record the file, creation date, method/tool, purpose, prompt or artist brief, ink colour, text, dimensions and review status. Record source references and permissions when supplied. Generated artwork must not be described as a real historical stamp or a client document. Existing stock and generated-image provenance remains authoritative for those assets.

## 14. Reusable illustration brief

Use this template for new subjects. Supply the reference specimen as a style reference when the generation workflow supports it, and inspect each result rather than relying on the prompt alone.

> Create one Rusetat brand illustration as an authentic airport/passport rubber ink impression on a transparent background. Subject: [one clear concept]. Frame: [oval/circle/rounded rectangle/squared rectangle]. Main scene: [one object plus up to two minimal supporting elements]. Single ink colour: [approved token]. Use sparse consistent linework, short mechanically set uppercase sans-serif lettering, restrained broken ink edges, tiny pinholes and local dry patches. Preserve strong legibility and clean negative space. Top/brand text exactly: “RUSETAT”. Topic caption exactly: “[short caption]”. Keep the construction, letter treatment and ink character consistent with the Rusetat reference. Fit all artwork within the border with a generous transparent margin. No photographic imagery inside the stamp, gradients, gloss, shadows, 3D effects, ornate decoration, heavy grunge, official crests, invented dates or approval claims. The result must read clearly at [target width].

### Example subject adaptations

| Topic | Scene | Frame | Possible caption |
|---|---|---|---|
| General travel/migration | Passport and small ascending plane | Horizontal oval | TRAVEL & MIGRATION |
| Document preparation | One sheet with three simple checklist lines | Rounded rectangle | DOCUMENT PREPARATION |
| Consultation | Two spare speech outlines | Circle | LET’S TALK |
| Study enquiries | Open book and one small travel cue | Rounded rectangle | STUDY ENQUIRIES |
| Corporate travel | Briefcase and short route | Squared rectangle | CORPORATE TRAVEL |
| Destination guidance | One recognisable simplified geographic motif | Oval | Destination name |

These are briefs for future assets, not claims that those illustrations have been produced or that a service has been newly approved.

## 15. Review and acceptance

### Illustration review

- Looks like a pressed ink impression at first glance, not a vector badge with noise added around it.
- Uses one approved ink colour, transparent negative space and a restrained frame.
- Has one clear subject with minimal supporting detail.
- Matches the reference family’s lettering, stroke character and amount of wear.
- Spelling is exact; no invented letters, dates, identifiers or official claims.
- Border, scene and lettering remain clear at final desktop and phone size.
- No glossy rendering, photographic content inside the frame, gradients, excessive decoration or heavy grunge.
- Transparent edge is clean on white, paper and the intended actual background.
- Meaning is available in adjacent HTML or suitable alt text.
- Original logo, photographs, portraits and flags remain intact.

### Page review when an asset is integrated

- Stamp placement helps the content and preserves one clear primary action.
- Density is restrained; it does not become repeated ornament on every card.
- No overlap, clipped frame, layout shift or horizontal overflow.
- Correct asset dimensions, base-path handling and output-copy behaviour are verified.
- Keyboard, focus, contrast, zoom and reduced-motion checks pass for the affected page.
- Build and route/asset checks pass. Inspect both desktop and phone screenshots.
- Public copy reflects actual service and form behaviour.

## 16. Change control

This version adds the stamp grammar and first specimen, documents the current website foundation and preserves the existing image system. It does not restyle every page, replace photographs, alter the logo, publish the site or change a private portal.

Future changes should state the problem, affected components/assets, before/after visual evidence and validation. When adding a new stamp, compare it to the existing specimen and update provenance. When changing shared tokens, check all representative page types, not just the homepage. Keep the system coherent by reusing the rules rather than creating a fresh style per request.


## Current stamp implementation - 1 November 2026

The approved illustrated family replaces the earlier sparse inline SVG/hash-generated stamps. Bold italic heritage-serif Rusetat lettering, substantial illustrated silhouettes and worn ink use true transparent negative space. Twenty exact route assets and one shared footer/default seal are integrated. Selected artwork is in assets/illustrations/catalogue.json. The [stamp backlog](docs/stamp-backlog.md) owns remaining routes, export rules and resumption steps; its current-state rules supersede contradictory historical sections above.
