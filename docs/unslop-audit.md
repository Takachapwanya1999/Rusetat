# RUSETAT design cleanup

31 October 2026. Applied with [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop), licensed CC BY 4.0. Installed into `C:/Users/sewar/.codex/skills/unslop`; this run follows the installed instructions. The existing logo, palette, photography, page hierarchy, service journeys and section order are retained.

## Audit

- Shared eyebrows, footer headings, photo captions and small labels: uppercase tracking and 8–11px type reduce legibility.
- Homepage and most templates: repeated italic emphasis, full stops and oversized headlines weaken hierarchy.
- Homepage, au pair/recruitment and repeated CTAs: generic “next chapter”, “possibilities” and “thoughtful” language obscures the service.
- Intro: rotated support stamp and decorative star compete with useful copy.
- Eyebrows and contact dock: coloured dots suggest status without conveying one.
- Buttons, numbers and form progress: blue, magenta and purple accents compete across the same task.
- Shared CSS: arbitrary 25/27/35/45/55/65/75px gaps and padding cause uneven rhythm.
- Destinations, cards and buttons: hover scaling, lifting and animated padding move content unnecessarily.
- Body link cards: repeated “Explore your options” and “Discover more” labels add visual noise.
- Card sections: identical boxes and decorative leading zeros make every content group feel alike.
- Corporate form and contact panel: dense summary/actions, small helper text and stale copy-status feedback need clearer grouping.
- Reading pages: very large uncapped images and oversized sidebars reduce reading comfort.
- JavaScript: four mojibake markers occur in brief/email strings; repair UTF-8 and guard against recurrence.
- Build output: cacheable shared asset names can leave old styles/scripts visible after deployment.

## Direction

- Product: travel and migration support for individuals, families and employers.
- Character: measured, personal, well travelled.
- World: Southern African journeys, travel journals and clear application paperwork.
- Moments: the coastal homepage scene and destination photography carry the richness.
- Signature: a fine route rule with numbered steps where sequence matters.

## Nine passes

1. Spacing: shared 4px scale; equal control/card padding; consistent page gutters and section rhythm.
2. Colour: retain blue/ink brand neutrals; dark magenta only for primary actions/selection; remove coloured shadows and decorative accent dots.
3. Icons: replace mixed glyph controls with a local Lucide SVG subset, 16px at 1.5 stroke. No package or external runtime required.
4. Copy: concrete service headlines and actions; destination/visa-specific detail headings; concise labels; remove trailing heading full stops.
5. Type: retain Georgia and Arial; narrower scale; sentence-case labels at readable sizes; remove repeated italic emphasis.
6. Layout: retain section order; improve hero balance, reading widths, parent-page selection lists and phone grids.
7. Details: consistent corners and focus states; quieter form progress, review rows and contact controls; useful rather than decorative numbering.
8. Visuals: retain approved photography; correct image dimensions and reserve readable copy space. No new image generation or prompts in this cleanup.
9. Motion: static cards/images; short colour/border feedback; reduced-motion-aware form navigation.

## Verification scope

All 68 routes and parent-body links remain in the evolving inventory. Rebuild, check links/assets/fragments, check encoding and typography conventions, verify browser layouts and the corporate/enquiry flows, then update the existing private Site without changing its audience.


## Completed verification

- 68/68 generated pages passed routes, local assets, fragments, image alternatives, single h1, parent-body child links, duplicate attribute/ID and text-encoding checks.
- Craft checks passed for removed stamps/emphasis/glyph icons, clean short-heading punctuation and versioned asset references. No hover lifting/zooming or uppercase tracked label rules remain in the generated stylesheet.
- Text-role and primary-button contrast checked: primary on paper 13.38:1; secondary on white 6.44:1; white on dark-magenta action 6.74:1; dark-section secondary 10:1. Muted ink was darkened after a 4.47:1 result on the raised surface; the final token exceeds 4.5:1. Input boundaries exceed 3:1 on white.
- Browser checks covered 15 representative desktop routes and 10 phone routes with no horizontal overflow or loaded broken images. Desktop headings were checked for unwanted italics.
- Destination regional filtering and count feedback passed. Sitemap matching and explicit empty-result feedback passed.
- Corporate validation, destination preselection, conditional fields, step progression, review, corrected message encoding, copy, actual brief download, and stale-feedback clearing passed without sending any message.
- Phone menu keyboard wrap, Escape close/focus restoration, and contact-panel focus entry passed. No browser console errors/warnings were reported during these checks.
- Three screenshot checkpoints were used: original composition, cleaned desktop hero and cleaned phone destination collection. No new image generation was needed.

The nine-pass direction is applied in the normal site source; no story-video classes or presentation-only effects ship. The original page inventory, content order and private audience are retained.
