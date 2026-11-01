'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});
const dockToggle = document.querySelector('.dock-toggle');
const dockPanel = document.querySelector('#dock-panel');
dockToggle?.addEventListener('click', () => {
  const open = dockToggle.getAttribute('aria-expanded') !== 'true';
  dockToggle.setAttribute('aria-expanded', String(open));
  dockPanel.hidden = !open;
  if (open) dockPanel.querySelector(dockPanel.classList.contains('chat-open') ? '#dock-back' : '[data-chat-entry]')?.focus();
});
const dockOptions = document.querySelector('#dock-options');
const dockChat = document.querySelector('#dock-chat');
const dockFrames = document.querySelector('#dock-chat-frame');
let activeChatEntry = 'main';
const chatFrames = new Map();
const chatStatus = document.querySelector('#dock-chat-status');
const chatExternal = document.querySelector('#dock-chat-external');
const frameTimers = new Map();

function showChatStatus(entry) {
  if (entry !== activeChatEntry) return;
  const state = chatFrames.get(entry)?.dataset.state;
  chatStatus.hidden = state === 'loaded';
  chatStatus.textContent = state === 'waiting'
    ? 'Taking longer than expected. You can open Ruse separately or contact our team below.'
    : 'Opening Ruse…';
}
document.querySelectorAll('[data-chat-entry]').forEach(button => {
  button.addEventListener('click', () => {
    dockPanel.hidden = false;
    dockToggle.setAttribute('aria-expanded', 'true');
    activeChatEntry = button.dataset.chatEntry;
    const label = activeChatEntry === 'assessment' ? 'Visa assessment' : 'Chat with Ruse';
    if (!chatFrames.has(activeChatEntry)) {
      const frame = document.createElement('iframe');
      frame.title = label;
      frame.dataset.state = 'loading';
      const chatUrl = new URL('https://dify.banyalabs.com/chat/DmZ7bob5QDWu8hiz');
      chatUrl.searchParams.set('brand', 'rusetat');
      if (activeChatEntry === 'assessment') chatUrl.searchParams.set('entry', 'assessment');
      frame.src = chatUrl.href;
      frame.allow = 'microphone; clipboard-write';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.addEventListener('load', () => {
        clearTimeout(frameTimers.get(frame.dataset.entry));
        // A cross-origin load event confirms navigation, not chatbot health.
        frame.dataset.state = 'loaded';
        showChatStatus(frame.dataset.entry);
      });
      frame.dataset.entry = activeChatEntry;
      dockFrames.append(frame);
      chatFrames.set(activeChatEntry, frame);
      const entry = activeChatEntry;
      frameTimers.set(entry, setTimeout(() => {
        if (frame.dataset.state === 'loaded') return;
        frame.dataset.state = 'waiting';
        showChatStatus(entry);
      }, 15000));
    }
    chatFrames.forEach((frame, entry) => { frame.hidden = entry !== activeChatEntry; });
    chatExternal.href = chatFrames.get(activeChatEntry).src;
    chatExternal.setAttribute('aria-label', `Open ${label} full screen in a new tab`);
    showChatStatus(activeChatEntry);
    document.querySelector('#dock-chat-title').textContent = label;
    dockOptions.hidden = true;
    dockChat.hidden = false;
    dockPanel.classList.add('chat-open');
    document.querySelector('#dock-back').focus();
  });
});
document.querySelector('#dock-back')?.addEventListener('click', () => {
  dockChat.hidden = true;
  dockOptions.hidden = false;
  dockPanel.classList.remove('chat-open');
  dockOptions.querySelector(`[data-chat-entry="${activeChatEntry}"]`).focus();
});
document.querySelector('#dock-options-close')?.addEventListener('click', () => {
  dockPanel.hidden = true;
  dockToggle.setAttribute('aria-expanded', 'false');
  dockToggle.focus();
});

document.querySelector('#dock-close')?.addEventListener('click', () => {
  dockToggle.click();
  dockToggle.focus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Tab' && menuButton?.getAttribute('aria-expanded') === 'true') {
    const items = [menuButton, ...navigation.querySelectorAll('a[href]')];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  if (event.key !== 'Escape') return;
  if (menuButton?.getAttribute('aria-expanded') === 'true') {
    menuButton.click();
    menuButton.focus();
  }
  if (dockToggle?.getAttribute('aria-expanded') === 'true') {
    dockToggle.click();
    dockToggle.focus();
  }
});
matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches && menuButton?.getAttribute('aria-expanded') === 'true') menuButton.click();
});
document.addEventListener('click', event => {
  if (dockPanel && !dockPanel.hidden && !event.target.closest('.contact-dock') && !event.target.closest('[data-chat-entry]') && !event.target.closest('#ruse-question-form')) {
    dockPanel.hidden = true;
    dockToggle.setAttribute('aria-expanded', 'false');
  }
});

globalThis.RusetatDestinationSearch?.init(document);

const search = document.querySelector('#sitemap-search');
search?.addEventListener('input', () => {
  const query = search.value.toLowerCase().trim();
  document.querySelectorAll('.tree-list li').forEach(item => {
    item.hidden = Boolean(query) && !item.textContent.toLowerCase().includes(query);
  });
  document.querySelector('#sitemap-empty').hidden = [...document.querySelectorAll('.tree-list li')].some(item => !item.hidden);
});

async function copyText(text, status) {
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Copied to clipboard';
  } catch {
    status.textContent = 'Copy is unavailable in this browser. Open the email draft to review your message.';
  }
}

function downloadText(text, name) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

function value(form, name) {
  const control = form.elements.namedItem(name);
  return control && 'value' in control ? control.value.trim() : '';
}

function chooseCorporateExample(form, example) {
  const selections = [['event', example.briefEvent], ['destination', example.briefDestination]]
    .filter(([, selected]) => selected);
  if (!selections.length || selections.some(([name, selected]) =>
    ![...form.elements.namedItem(name).options].some(option => option.value === selected))) return false;
  selections.forEach(([name, selected]) => { form.elements.namedItem(name).value = selected; });
  return true;
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  const steps = [...quoteForm.querySelectorAll('.quote-step')];
  const progress = [...quoteForm.querySelectorAll('.quote-progress span')];
  const back = document.querySelector('#quote-back');
  const next = document.querySelector('#quote-next');
  const prepare = document.querySelector('#quote-prepare');
  const error = quoteForm.querySelector('.form-error');
  const result = document.querySelector('#quote-result');
  const summary = document.querySelector('#quote-review');
  let step = 0;
  let brief = '';

  document.querySelectorAll('[data-brief-event]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (!chooseCorporateExample(quoteForm, link.dataset)) return;
      event.preventDefault();
      quoteForm.dispatchEvent(new Event('change', { bubbles: true }));
      showStep(0);
    });
  });

  function selectedArrangements() {
    return [...quoteForm.querySelectorAll('[name="arrangements"]:checked')].map(control => control.value);
  }

  function briefRows(includeContact = false) {
    const rows = [
      ['Event', value(quoteForm, 'event')],
      ['Organisation', value(quoteForm, 'organisation')],
      ['Event goals', value(quoteForm, 'goals')],
      ['Destination', value(quoteForm, 'destination')],
      ['Destination notes', value(quoteForm, 'destinationNotes')],
      ['Attendees', value(quoteForm, 'attendees')],
      ['Nights', value(quoteForm, 'nights')],
      ['Dates / flexibility', value(quoteForm, 'dates')],
      ['Arrangements', selectedArrangements().join(', ') || 'To discuss'],
      ['Other arrangements', value(quoteForm, 'arrangementNotes')],
      ['Budget', [value(quoteForm, 'currency'), value(quoteForm, 'budget'), value(quoteForm, 'budgetBasis')].filter(Boolean).join(' · ') || 'To discuss'],
      ['Priority', value(quoteForm, 'priority')],
      ['Other priorities', value(quoteForm, 'priorities')]
    ];
    if (selectedArrangements().includes('Flights')) rows.push(['Departure groups', value(quoteForm, 'departures')]);
    if (selectedArrangements().includes('Accommodation')) rows.push(['Room preferences', value(quoteForm, 'rooms')]);
    if (selectedArrangements().includes('Meeting venue')) rows.push(['Meeting setup', value(quoteForm, 'venue')]);
    if (includeContact) rows.push(['Contact', value(quoteForm, 'name')], ['Email', value(quoteForm, 'email')], ['Phone', value(quoteForm, 'phone')], ['Preferred reply', value(quoteForm, 'reply')]);
    return rows.filter(([, answer]) => answer);
  }

  function updateReview() {
    summary.replaceChildren();
    briefRows().forEach(([label, answer]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = label;
      definition.textContent = answer;
      row.append(term, definition);
      summary.append(row);
    });
  }

  function showStep(number, focus = true) {
    step = number;
    steps.forEach((panel, index) => { panel.hidden = index !== step; });
    progress.forEach((bar, index) => bar.classList.toggle('active', index <= step));
    back.hidden = step === 0;
    next.hidden = step === steps.length - 1;
    prepare.hidden = step !== steps.length - 1;
    error.hidden = true;
    if (step === steps.length - 1) updateReview();
    if (focus) {
      const heading = steps[step].querySelector('h3');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      quoteForm.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }
  }

  function validStep(number) {
    const invalid = [...steps[number].querySelectorAll('input,select,textarea')].find(control => !control.checkValidity());
    if (!invalid) return true;
    error.textContent = 'Please complete the required details before continuing.';
    error.hidden = false;
    invalid.focus();
    invalid.reportValidity();
    return false;
  }

  next.addEventListener('click', () => { if (validStep(step)) showStep(step + 1); });
  back.addEventListener('click', () => showStep(Math.max(0, step - 1)));
  quoteForm.addEventListener('change', () => {
    const selected = selectedArrangements();
    quoteForm.querySelectorAll('[data-followup]').forEach(panel => { panel.hidden = !selected.includes(panel.dataset.followup); });
    result.hidden = true;
    document.querySelector('#quote-status').textContent = '';
  });
  quoteForm.addEventListener('input', () => { result.hidden = true;
    document.querySelector('#quote-status').textContent = ''; });
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    for (let index = 0; index < steps.length; index++) {
      if (index !== step) {
        const invalid = [...steps[index].querySelectorAll('input,select,textarea')].find(control => !control.checkValidity());
        if (invalid) { showStep(index); validStep(index); return; }
      }
    }
    if (!validStep(step)) return;
    brief = 'Rusetat corporate travel & event brief\n\n' + briefRows(true).map(([label, answer]) => `${label}: ${answer}`).join('\n') + '\n\nPlease discuss available options and a tailored quotation. This is an enquiry, not a booking.';
    document.querySelector('#quote-email').href = `mailto:admin@rusetatmigration.com?subject=${encodeURIComponent('Corporate event quote request — ' + value(quoteForm, 'organisation'))}&body=${encodeURIComponent(brief)}`;
    result.hidden = false;
    document.querySelector('#quote-status').textContent = '';
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  document.querySelector('#quote-copy').addEventListener('click', () => copyText(brief, document.querySelector('#quote-status')));
  document.querySelector('#quote-download').addEventListener('click', () => downloadText(brief, 'Rusetat-Corporate-Event-Brief.txt'));
  const destination = new URLSearchParams(location.search).get('destination');
  if (destination) {
    const labels = { 'cape-town': 'Cape Town', kariba: 'Lake Kariba', 'victoria-falls': 'Victoria Falls', kruger: 'Kruger & safari', zanzibar: 'Zanzibar', mauritius: 'Mauritius', dubai: 'Dubai', bali: 'Bali' };
    const option = labels[destination] || destination;
    if ([...quoteForm.elements.destination.options].some(item => item.value === option)) quoteForm.elements.destination.value = option;
  }
  const eventType = new URLSearchParams(location.search).get('event');
  if (eventType) chooseCorporateExample(quoteForm, { briefEvent: eventType });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  let message = '';
  const service = contactForm.elements.service;
  const params = new URLSearchParams(location.search);
  const requested = params.get('service') || '';
  const dest = params.get('destination') || '';
  if (requested) {
    const lower = requested.toLowerCase();
    const match = [...service.options].find(option => option.value.toLowerCase() === lower);
    if (match) service.value = match.value;
    else if (lower.includes('international')) service.value = 'International visa';
    else if (/visa|residence|waiver|extension/.test(lower)) service.value = 'South African visa';
    else if (lower.includes('travel')) service.value = 'Travel';
    else service.add(new Option(requested, requested, true, true));
  }
  contactForm.elements.contactDestination.value = dest;
  const audience = params.get('audience');
  if (audience) contactForm.elements.audience.value = audience.includes('host') ? 'Host family' : audience === 'employer' ? 'Employer' : 'Candidate';
  if (requested && ![...service.options].some(option => option.value === requested)) contactForm.elements.message.value = 'I would like to discuss ' + requested + '.';
  function updateFields() {
    const lower = service.value.toLowerCase();
    contactForm.querySelector('[data-contact-group="visa"]').hidden = !lower.includes('visa');
    contactForm.querySelector('[data-contact-group="travel"]').hidden = lower !== 'travel';
    contactForm.querySelector('[data-contact-group="audience"]').hidden = !['au pair', 'recruitment'].includes(lower);
    document.querySelector('#contact-result').hidden = true;
    document.querySelector('#contact-status').textContent = '';
  }
  service.addEventListener('change', updateFields);
  updateFields();
  contactForm.addEventListener('input', () => { document.querySelector('#contact-result').hidden = true;
    document.querySelector('#contact-status').textContent = ''; });
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [['Enquiry', service.value], ['Name', value(contactForm, 'contactName')], ['Email', value(contactForm, 'contactEmail')], ['Destination', value(contactForm, 'contactDestination')]];
    if (!contactForm.querySelector('[data-contact-group="visa"]').hidden) fields.push(['Nationality', value(contactForm, 'nationality')], ['Current country', value(contactForm, 'currentCountry')]);
    if (!contactForm.querySelector('[data-contact-group="travel"]').hidden) fields.push(['Dates', value(contactForm, 'travelDates')]);
    if (!contactForm.querySelector('[data-contact-group="audience"]').hidden) fields.push(['Enquiring as', value(contactForm, 'audience')]);
    fields.push(['Message', value(contactForm, 'message')]);
    message = 'Hello Rusetat,\n\n' + fields.filter(([, answer]) => answer).map(([label, answer]) => `${label}: ${answer}`).join('\n');
    document.querySelector('#contact-email').href = `mailto:admin@rusetatmigration.com?subject=${encodeURIComponent('Website enquiry — ' + service.value)}&body=${encodeURIComponent(message)}`;
    document.querySelector('#contact-result').hidden = false;
    document.querySelector('#contact-status').textContent = '';
  });
  document.querySelector('#contact-copy').addEventListener('click', () => copyText(message, document.querySelector('#contact-status')));
}

document.querySelector('#load-map')?.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'Rusetat office area in Centurion';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.src = 'https://maps.google.com/maps?q=269%20Von%20Willich%20Avenue%20Centurion&t=&z=15&ie=UTF8&iwloc=&output=embed';
  document.querySelector('#map-panel').replaceChildren(frame);
});

// FAQ composer hands off to the existing, retained main-chat iframe.
const ruseQuestionForm = document.querySelector('#ruse-question-form');
if (ruseQuestionForm) {
  const input = ruseQuestionForm.querySelector('textarea');
  const submit = ruseQuestionForm.querySelector('[type="submit"]');
  const status = document.querySelector('#ruse-question-status');
  const origin = 'https://dify.banyalabs.com';
  let pending;
  let poll;
  let timeout;
  let lastAttempt;
  const finish = message => {
    clearInterval(poll);
    clearTimeout(timeout);
    pending = undefined;
    submit.disabled = false;
    input.readOnly = false;
    status.textContent = message;
  };
  window.addEventListener('message', event => {
    const frame = chatFrames.get('main');
    if (!pending || event.origin !== origin || event.source !== frame?.contentWindow
      || event.data?.channel !== 'rusetat-question-v1') return;
    if (event.data.type === 'ready' && !pending.dispatched) {
      pending.dispatched = true;
      clearInterval(poll);
      frame.contentWindow.postMessage({channel: 'rusetat-question-v1', type: 'question', id: pending.id, text: pending.text}, origin);
    } else if (event.data.id === pending.id && event.data.type === 'accepted') {
      input.value = '';
      lastAttempt = undefined;
      finish('Your question is in the Ruse chat. Continue the conversation there.');
    } else if (event.data.id === pending.id && ['busy', 'failed'].includes(event.data.type)) {
      finish('Ruse is not ready for another question. Check the chat panel before trying again. Your question is still here.');
    }
  });
  ruseQuestionForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (pending || !text || text.length > 2000 || !ruseQuestionForm.reportValidity()) return;
    // A retry of an uncertain handoff reuses its ID so the child cannot send twice.
    pending = lastAttempt?.text === text ? {...lastAttempt, dispatched: false} : {id: crypto.randomUUID(), text, dispatched: false};
    lastAttempt = {...pending};
    submit.disabled = true;
    input.readOnly = true;
    status.textContent = 'Opening Ruse and handing over your question…';
    dockOptions.querySelector('[data-chat-entry="main"]').click();
    const hello = () => chatFrames.get('main')?.contentWindow?.postMessage({channel: 'rusetat-question-v1', type: 'hello'}, origin);
    poll = setInterval(hello, 500);
    timeout = setTimeout(() => finish('We could not confirm the handoff. Your question is still here. Check the Ruse chat before retrying, or ask directly in its message box.'), 25000);
    hello();
  });
  document.querySelectorAll('[data-ruse-question]').forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.ruseQuestion;
      input.focus();
      ruseQuestionForm.requestSubmit();
    });
  });
}
