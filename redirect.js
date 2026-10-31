'use strict';

// Keep existing enquiry bookmarks working, including destination/service context.
const canonical = document.querySelector('link[rel="canonical"]');
if (canonical) {
  const destination = new URL(canonical.getAttribute('href'), location.origin);
  if (destination.origin === location.origin && destination.pathname !== location.pathname) {
    destination.search = location.search;
    destination.hash = location.hash;
    location.replace(destination.href);
  }
}
