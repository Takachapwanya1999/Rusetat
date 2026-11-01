# Rusetat chat integration — 1 November 2026

## Direction

- Product: service guidance and visa assessment within the Rusetat website.
- Character: calm, helpful, precise.
- World: travel documents and agency service desks.
- Moments: the supplied Rusetat logo and the primary conversation action.
- Signature: the website's dark blue serif headings above quiet pale surfaces.

## Local implementation

The shared panel uses the website logo, colour variables, fonts and 8px corners.
On mobile it fills the available dynamic viewport with safe-area spacing.
Loading feedback and a 15-second slow-load message use the same visual language.
Direct links to the hosted chat and contact page remain available at all times.
The two chat entry frames remain mounted across switching and minimising.
No conversation, assessment, consent or intake backend logic changed.

The hosted-theme package remains at
`../../services/ruse-intake/infra/dify-website-theme/` relative to the website
root. Its 12 shared tokens now have an explicit sync/check command. Theme cleanup
restores the previous colour scheme. Its scoped message styles cover readable
text, menu actions, media, headings, inputs and focus states.

## Verification

- Website build: 69 pages generated.
- Website check: links, assets, fragments, image alternatives and navigation pass.
- Chat interaction check: passes main/assessment switching, background-load timer
  isolation, slow-load feedback, direct-entry URLs and frame preservation.
- Theme tests: two pass, including route/embed scoping, cache-busted importers,
  assessment-hook retention, colour-scheme restoration and unknown-layout refusal.
- All 12 theme tokens match `website.css`; website JavaScript syntax check passes.

These are local structural and interaction checks, not browser visual QA.

## Remaining release work

SSH to the existing server returned `Permission denied` for port 22 in this
session. The browser tool reported `Local browser use is disabled in Work
settings`. No live image was inspected, built, replaced or deployed.

With access restored, inspect the current frontend image and real DOM first.
Build the theme on that exact patched base, preserving the public-access,
assessment and timezone fixes. Verify the actual header, message bubbles,
avatars, composer, menu buttons, loading/error states and branding marks.
Test both entry modes on desktop and a 360px phone viewport, keyboard focus,
OS dark preference and mobile keyboard behaviour before releasing only web.
Do not infer that `brand=rusetat` alone applies a theme to the hosted iframe.

The parent panel cannot style a cross-origin document. A fully branded inner
conversation remains pending this build, inspection and deployment.

## Full-screen follow-up

Both modes now expose **Full screen (new tab)** with a mode-specific accessible
label and branded URL. The prepared hosted theme also accepts standalone branded
tabs, adds the original Rusetat logo and the correct mode heading, and removes
its header on cleanup. Embedded views retain the website's existing header.
Three theme tests and the website chat-interaction test pass locally.

The new tab is currently a mode entry, not an exact conversation transfer.
The assessment entry auto-resets its native conversation on a fresh page load.
Completing the requested same-conversation experience requires inspecting native
selection/identity state in the current hosted frontend, implementing an explicit
handoff, and testing both modes across tabs. This remains blocked by server and
browser access, together with theme deployment and visual verification.
