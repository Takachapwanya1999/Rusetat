const assistantToggle = document.querySelector("#assistant-toggle");
const assistantPanel = document.querySelector("#assistant-panel");
const assistantClose = document.querySelector("#assistant-close");
const assistantMessages = document.querySelector("#assistant-messages");
const assistantForm = document.querySelector("#assistant-form");
const assistantInput = document.querySelector("#assistant-input");

const assistantAnswers = [
  {
    keywords: ["popia", "privacy", "personal information", "data protection"],
    answer: "The website prepares enquiries in your browser and doesn’t submit them to a server. If you send an enquiry by email or WhatsApp, Rusetat’s stated retention period is three months. Read the Privacy Notice for details or email admin@rusetatmigration.com with a privacy request."
  },
  {
    keywords: ["service", "offer", "what do you do", "what can you help"],
    answer: "Rusetat helps with tailored travel, concierge and ground logistics, corporate and bleisure trips, visa preparation, migration guidance, document organization, and relocation landing support."
  },
  {
    keywords: ["guarantee", "approved", "approval", "outcome", "decision"],
    answer: "No outcome can be guaranteed. Visa and migration decisions belong to the relevant authorities, while travel arrangements depend on availability and supplier terms. Rusetat offers planning and administrative support."
  },
  {
    keywords: ["south african", "permit", "relative visa", "life partner", "lifepartner", "retirement visa", "medical visa", "tourist visa", "treaty visa", "business visa", "study visa", "corporate visa", "critical skills", "general work", "permanent residence"],
    answer: "Rusetat assists with South African Relative, Life Partner, Retirement, Medical, Tourist, Treaty, Business, Study, Corporate, and Critical Skills Visas; General Work Permits; and Permanent Residence applications. Assistance is subject to scope and current requirements. The relevant authorities determine eligibility and outcomes."
  },
  {
    keywords: ["international visa", "international visas", "which countries", "what countries", "country visa", "countries"],
    answer: "Rusetat assists with international visa applications for Canada, the USA, Poland, Denmark, Australia, Finland, Germany, the United Kingdom, and Dubai (UAE). Requirements vary by destination and the relevant authorities determine application outcomes."
  },
  {
    keywords: ["visa", "application", "embassy"],
    answer: "Rusetat assists with South African visa and permit applications and international visa applications for Canada, the USA, Poland, Denmark, Australia, Finland, Germany, the United Kingdom, and Dubai (UAE). We can help with preparation and document organization. Requirements vary, and the relevant authorities determine eligibility and outcomes."
  },
  {
    keywords: ["migration", "relocat", "move abroad", "moving country"],
    answer: "Rusetat offers informational migration guidance and practical relocation planning. You can also ask about neighborhood orientation, housing-search preparation, family school-search starting points, and a settling-in checklist."
  },
  {
    keywords: ["document", "upload", "file", "paperwork"],
    answer: "The website’s document preview only lists filenames in your browser; it does not read or upload file contents. Please don’t send sensitive documents until you have confirmed a suitable, secure process directly with Rusetat."
  },
  {
    keywords: ["soft landing", "housing", "neighborhood", "school", "settling"],
    answer: "Soft landing support can include neighborhood orientation, housing-search preparation, school-search starting points for families, and a first-weeks settling-in checklist. The scope is agreed with you before proceeding."
  },
  {
    keywords: ["corporate", "team", "offsite", "bleisure", "business travel"],
    answer: "Rusetat coordinates corporate and bleisure travel, including team trips, offsites, group logistics, and optional personal extensions. Use the Corporate page’s group enquiry form to share your brief."
  },
  {
    keywords: ["concierge", "airport", "transfer", "esim", "arrival", "reservation"],
    answer: "Trip enhancements may include VIP arrival requests, private airport transfers, eSIM and connectivity guidance, dining reservations, or event bookings. Availability and supplier terms apply."
  },
  {
    keywords: ["itinerary", "travel", "trip", "holiday", "workation", "eco"],
    answer: "Tailored itinerary support can shape a trip around your interests, pace, accommodation preferences, local experiences, and workation needs. Share your destination and dates through the homepage enquiry form to start planning."
  },
  {
    keywords: ["price", "cost", "fee", "quote", "charge"],
    answer: "Pricing depends on the destination and support you need. Send Rusetat a short enquiry with your plans so the team can discuss the relevant scope and fees before you proceed."
  },
  {
    keywords: ["contact", "email", "phone", "whatsapp", "call"],
    answer: "You can email admin@rusetatmigration.com or call/WhatsApp +27 72 155 5208. Use the contact links below this chat to get in touch."
  },
  {
    keywords: ["where", "address", "location", "office", "centurion"],
    answer: "Rusetat’s office is at 269 Von Willich Avenue, 66 Corporate Office Park, Centurion, South Africa. The homepage has a map and directions link."
  },
  {
    keywords: ["start", "book", "enquiry", "enquire", "begin"],
    answer: "To get started, use the Corporate page’s group form for team travel, or the homepage form for personal travel, visa, or relocation plans. Your message is prepared for you to review and send using your own email or WhatsApp app."
  }
];

function getAssistantAnswer(question) {
  const normalizedQuestion = question.toLowerCase();
  const match = assistantAnswers.find(({ keywords }) =>
    keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  return match?.answer
    || "I don’t have a preset answer for that. Please email admin@rusetatmigration.com, WhatsApp +27 72 155 5208, or use the enquiry form and the Rusetat team can help.";
}

function addAssistantMessage(text, sender) {
  const message = document.createElement("p");
  message.className = `assistant-message assistant-message-${sender}`;
  message.textContent = text;
  assistantMessages.append(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function askAssistant(question) {
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion) {
    return;
  }

  addAssistantMessage(trimmedQuestion, "user");
  addAssistantMessage(getAssistantAnswer(trimmedQuestion), "bot");
}

assistantMessages.append(
  Object.assign(document.createElement("p"), {
    className: "assistant-message assistant-message-bot",
    textContent: "Hello! I can answer basic questions about Rusetat’s services, contact details, and how to get started."
  })
);

assistantToggle.addEventListener("click", () => {
  const isExpanded = assistantToggle.getAttribute("aria-expanded") === "true";
  assistantToggle.setAttribute("aria-expanded", String(!isExpanded));
  assistantPanel.hidden = isExpanded;

  if (!isExpanded) {
    assistantInput.focus();
  }
});

assistantClose.addEventListener("click", () => {
  assistantPanel.hidden = true;
  assistantToggle.setAttribute("aria-expanded", "false");
  assistantToggle.focus();
});

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askAssistant(assistantInput.value);
  assistantForm.reset();
  assistantInput.focus();
});

assistantPanel.querySelector(".assistant-quick-replies").addEventListener("click", (event) => {
  const questionButton = event.target.closest("[data-assistant-question]");
  if (questionButton) {
    askAssistant(questionButton.dataset.assistantQuestion);
  }
});

assistantPanel.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    assistantPanel.hidden = true;
    assistantToggle.setAttribute("aria-expanded", "false");
    assistantToggle.focus();
  }
});
