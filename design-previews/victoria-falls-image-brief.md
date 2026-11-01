# Victoria Falls travel image — Higgsfield brief

Status: completed using the built-in generator after owner approved a fallback. Higgsfield rejected the reference-based generation due to a plan requirement. Selected master, delivery WebP and exact generation metadata are in images/generated/victoria-falls-experience*. The homepage now uses the travel-experience image key.

Placement: homepage, “Travel at your own pace”, currently mapped to the `resort` image key in scripts/build.py. Replace only this section's curated resort image. Preserve unrelated imagery and the separate consultation replacement.

Reference: `references/victoria-falls-experience.png`, supplied by the owner. Use for scene, atmosphere and candid travel energy, not to reproduce the exact people, their identities, clothing logos or a pixel-for-pixel composition.

## Generation prompt

Create a photorealistic candid travel photograph strongly inspired by the attached Victoria Falls reference: two adult African travellers and an adult local guide enjoying a natural rock pool beside a dramatic waterfall gorge, immense falling water and rising spray behind them. Show a believable shared travel moment with spontaneous smiles and natural conversation rather than a posed commercial shoot. Use different people from the reference. Their clothing is ordinary unbranded swimwear and a simple guide's swim shirt; no visible logos or lettering.

Foreground: tactile wet rock and moving, sparkling water; the three people naturally spaced in the middle ground, recognizable as enjoying the experience. Background: a steep rocky gorge, broad waterfall curtain, abundant mist, green riverbanks and lightly clouded sky. Emphasize the scale, atmosphere and exhilaration of being there. Position subjects on a broad natural rock shelf/pool with the guide alongside; no staged leaning over the precipice or exaggerated stunt.

Travel-documentary photography, natural daylight, realistic skin texture and anatomy, believable water interaction and reflections, imperfect candid framing. Rich but natural colours; avoid artificial teal-and-orange grading, heavy HDR, beauty retouching, glossy luxury-campaign styling, infinity pools, loungers, umbrellas, resort architecture and overly pristine scenery. No text, captions, borders, watermark or branding.

Portrait 4:5 composition for the desktop section. Keep all people, their faces and the central waterfall readable within a centre-safe 5:4 crop for mobile. Leave the bottom edge simple enough for the existing small HTML caption overlay. The image should communicate a memorable real-world African travel experience, while remaining an illustrative generated scene rather than a photograph of an actual customer or promised itinerary.

## Integration after generation

1. Inspect the result for convincing people, hands, water, believable geography and the candid mood requested by the owner.
2. Save the selected master and the exact Higgsfield model, prompt, reference and job/source metadata under images/generated/.
3. Export a WebP and record its dimensions in images/dimensions.json. Use a new image key or update only the current resort-key mapping; do not overwrite historical masters.
4. Update the descriptive alternative to identify the illustrative waterfall travel experience. Keep the caption relevant to discovery, not a named resort or an implied confirmed excursion.
5. Build, check all routes/assets and inspect the actual 4:5 desktop and 5:4 mobile crops.
