"""Shared static hosting path configuration; empty for domain-root hosting."""
import os
import re

BASE_PATH = os.environ.get('SITE_BASE_PATH', '').rstrip('/')
if BASE_PATH and (not BASE_PATH.startswith('/') or not re.fullmatch(r'/[A-Za-z0-9_/-]+', BASE_PATH) or '..' in BASE_PATH):
    raise ValueError('SITE_BASE_PATH must be an absolute URL path, e.g. /Rusetat')


def hosting_markup(text):
    """Prefix local HTML URL attributes, leaving external URLs and anchors intact."""
    return re.sub(r'(\b(?:href|src|action)=)([\"\x27])/(?!/)',
                  lambda m: m[1] + m[2] + BASE_PATH + '/', text)
