# Rusetat Migration International

A responsive static website for Rusetat Migration International, covering tailored travel planning, concierge services, corporate and bleisure travel, South African visa and permit assistance, international visa assistance, migration guidance, and relocation support.

## Run locally

Open `index.html` in a browser. The corporate enquiry page is `corporate.html`.

The site uses plain HTML, CSS, and JavaScript and does not require a build step or package installation.

## Enquiries and privacy

The enquiry forms prepare messages in the visitor's browser; they do not submit information to a website backend. Visitors choose whether to send a message using their own email or WhatsApp app. WhatsApp opens without prefilled enquiry details.

Optional Unsplash images require the visitor's choice, and the Google Maps embed loads only after the visitor selects its button. See [Privacy Notice](privacy.html) for the site's stated information-handling practices and third-party disclosures. Review the notice and operational practices before deployment; this repository does not certify legal compliance.

## Main files

- `index.html` — homepage and personal enquiry form
- `corporate.html` — corporate and group travel page
- `styles.css` — shared responsive styles
- `script.js` — homepage interactions and enquiry preparation
- `corporate.js` — corporate enquiry preparation
- `assistant.js` — local preset-answer chat widget
- `privacy.js` — optional external-media preference and map loading
- `privacy.html` — privacy notice
- `images/` — logo and destination imagery
