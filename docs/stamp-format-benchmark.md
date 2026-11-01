# Stamp format benchmark — 1 November 2026

Local encoding test; production website unchanged. Files and reproducible benchmark script are in `artifacts/stamp-format-test/` (ignored from Git and published assets).

## Method

Cropped the academic shield from the owner's supplied JPEG reference, resized to 800px wide and compared at 400px display width. PNG, WebP and AVIF encode the identical crop. It retains the white background and inherits JPEG compression, so it is a reference-style proxy, not a final transparent master. Mean absolute channel errors in results.json are descriptive, not perceptual quality scores. Quality numbers are not comparable across codecs.

A second variant thresholds the same crop into a single navy ink with transparency. Its SVG is a genuine vector path made from horizontal pixel runs, with no embedded bitmap. It is a reproducible tracing baseline, not a professionally optimised Bezier illustration. PNG and lossless WebP versions of that exact same mask provide an apples-to-apples comparison. Gzip size applies only when the host serves SVG with compression. No browser loading, decode or paint performance was measured.

## Results

| Full reference crop | KiB |
|---|---:|
| PNG | 638.5 |
| Lossless WebP | 460.6 |
| WebP quality 70 | 44.1 |
| WebP quality 85 | 68.5 |
| AVIF quality 60 | 41.1 |
| AVIF quality 80 | 72.9 |

| Identical single-ink transparent derivative | KiB |
|---|---:|
| SVG, raw | 118.1 |
| SVG, gzip | 34.7 |
| PNG | 17.0 |
| Lossless WebP | 9.9 |

Visual inspection of the comparison at 400px found the WebP 85 and AVIF 80 versions close to the PNG reference, with readable lettering and retained wear. The single-ink derivative preserves the overall illustration and major distressed details, while flattening colour variation and hardening edges. It looks appropriate for a rubber-stamp direction but requires owner style review before adopting this processing for final art.

## Recommendation

For the intended one-ink stamps, trial transparent lossless WebP from a cleaned, limited-palette master. The measured 9.9 KiB result is 71.5% smaller than gzip SVG for the identical mask. This does not establish WebP as universally smaller than carefully authored SVG. Use SVG for natively designed vector artwork when it actually wins after optimisation; use WebP for the textured raster family. Compare AVIF on final transparent masters before adding extra variants. Retain original masters outside published assets.

These results support small assets without removing page-specific artwork. They do not predict all 68 final hero sizes. No new production dependency was installed.

## Additional transparent-source check

The existing original raster specimen (older sparse style), resized within 800px, has alpha values spanning 0–255. Its PNG is 160.2 KiB, lossless WebP 107.2 KiB, WebP 85 74.6 KiB and AVIF 60 30.6 KiB. This confirms that AVIF can win for full-detail transparent raster sources. It is a different artwork from the reference shield, so these figures must not be compared directly to the shield's 9.9 KiB simplified derivative. All decoded successfully in Pillow; browser rendering has not been tested.
