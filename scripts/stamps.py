"""Explicit route-to-stamp mapping; unresolved pages use the generic brand seal."""
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAMP_SLOT = '<!-- RUSETAT_PAGE_STAMP -->'
STAMPS = json.loads((ROOT / 'content/stamps.json').read_text(encoding='utf-8'))


def stamp_markup(slug='', footer=False):
    entry = STAMPS['footer'] if footer else STAMPS['pages'].get(slug, STAMPS['default'])
    placeholder = not footer and slug not in STAMPS['pages']
    file = escape(entry['file'], quote=True)
    # These illustrations repeat the nearby page/brand text; avoid duplicate
    # announcements and keep embedded service lettering out of search content.
    return (f'<div class="hero-stamp" aria-hidden="true" '
            f'data-stamp="{escape(entry["artwork"])}" '
            f'data-stamp-placeholder="{str(placeholder).lower()}">'
            f'<img src="/{file}" width="{entry["width"]}" height="{entry["height"]}" '
            f'alt="" aria-hidden="true" role="presentation" '
            f'loading="{"lazy" if footer else "eager"}" decoding="async"></div>')
