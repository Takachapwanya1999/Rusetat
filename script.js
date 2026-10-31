const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const enquiryForm = document.querySelector("#enquiry-form");
const formResult = document.querySelector("#form-result");
const enquiryOutput = document.querySelector("#enquiry-output");
const copyButton = document.querySelector("#copy-enquiry");
const downloadButton = document.querySelector("#download-enquiry");
const emailEnquiryLink = document.querySelector("#email-enquiry");
const whatsappEnquiryLink = document.querySelector("#whatsapp-enquiry");
const serviceSelect = enquiryForm.elements.namedItem("service");
const prioritySelect = enquiryForm.elements.namedItem("priority");
const documentInput = document.querySelector("#document-files");
const documentStatus = document.querySelector("#document-status");
const documentFileList = document.querySelector("#document-file-list");
const clearDocumentsButton = document.querySelector("#clear-documents");
const categoryTrack = document.querySelector("#service-categories");
const categoryArrows = document.querySelectorAll("[data-category-direction]");
const maximumFiles = 10;
const maximumFileSize = 10 * 1024 * 1024;
const allowedFileExtensions = new Set(["pdf", "jpg", "jpeg", "png", "doc", "docx"]);

const serviceLabels = {
  itinerary: "Tailored itinerary or experiential travel",
  concierge: "Concierge or arrival logistics",
  corporate: "Corporate, team, or bleisure travel",
  relocation: "Relocation orientation and landing support",
  visa: "Visa application support",
  migration: "International visas and South African permits",
  documents: "Document readiness and compliance organization",
  other: "Something else"
};

const prioritiesByService = {
  itinerary: [
    "Luxury, thoughtfully tailored",
    "Slow travel and local experiences",
    "Eco-tourism and lower-impact experiences",
    "A workation with room to focus",
    "A balanced mix",
    "Help me decide"
  ],
  concierge: [
    "VIP airport arrival",
    "Reliable airport transfers",
    "eSIM and local connectivity",
    "Dining or experience bookings",
    "Help me choose"
  ],
  corporate: [
    "Team offsite and group logistics",
    "Simpler business travel planning",
    "A bleisure extension",
    "Remote-work arrangements",
    "Help me shape the brief"
  ],
  relocation: [
    "Neighborhood orientation",
    "Housing search orientation",
    "A settling-in checklist",
    "School search starting points for my family",
    "Pre-departure preparation",
    "A little bit of everything"
  ],
  visa: [
    "Understanding application requirements",
    "Organizing application documents",
    "Destination-specific preparation",
    "Understanding the next steps"
  ],
  migration: [
    "South African visa or permit application",
    "International visa application",
    "Understanding application preparation steps",
    "Document readiness and organization",
    "Relocation and settling-in support",
    "Help me identify the right enquiry"
  ],
  documents: [
    "Passport and document expiry checklist",
    "Digital-folder organization and naming",
    "Pre-submission completeness review",
    "A clear document-readiness checklist"
  ],
  other: [
    "Travel planning",
    "Visa or migration questions",
    "Something else"
  ]
};

document.querySelector("#current-year").textContent = new Date().getFullYear();

function updatePriorityOptions(service) {
  prioritySelect.replaceChildren(new Option("Select a priority", ""));

  for (const priority of prioritiesByService[service] || []) {
    prioritySelect.add(new Option(priority, priority));
  }
}

serviceSelect.addEventListener("change", () => {
  updatePriorityOptions(serviceSelect.value);
});

documentInput.addEventListener("change", () => {
  const files = Array.from(documentInput.files || []);

  if (files.length > maximumFiles) {
    documentStatus.textContent = `Choose no more than ${maximumFiles} files. Nothing was uploaded.`;
    documentInput.value = "";
    documentFileList.replaceChildren();
    clearDocumentsButton.hidden = true;
    return;
  }

  const oversizedFile = files.find((file) => file.size > maximumFileSize);
  if (oversizedFile) {
    documentStatus.textContent = `${oversizedFile.name} is larger than 10 MB. Choose smaller files. Nothing was uploaded.`;
    documentInput.value = "";
    documentFileList.replaceChildren();
    clearDocumentsButton.hidden = true;
    return;
  }

  const unsupportedFile = files.find((file) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return !extension || !allowedFileExtensions.has(extension);
  });
  if (unsupportedFile) {
    documentStatus.textContent = `${unsupportedFile.name} is not a supported file type. Nothing was uploaded.`;
    documentInput.value = "";
    documentFileList.replaceChildren();
    clearDocumentsButton.hidden = true;
    return;
  }

  documentFileList.replaceChildren(...files.map((file) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    const size = document.createElement("span");
    name.textContent = file.name;
    size.textContent = file.size < 1024 * 1024
      ? `${Math.max(1, Math.round(file.size / 1024))} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    item.append(name, size);
    return item;
  }));
  documentStatus.textContent = files.length
    ? `${files.length} ${files.length === 1 ? "file" : "files"} listed in this browser only. Nothing was uploaded.`
    : "No files selected. Nothing will be uploaded.";
  clearDocumentsButton.hidden = files.length === 0;
});

clearDocumentsButton.addEventListener("click", () => {
  documentInput.value = "";
  documentFileList.replaceChildren();
  documentStatus.textContent = "Local preview cleared. Nothing was uploaded.";
  clearDocumentsButton.hidden = true;
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  }
});

document.querySelectorAll("[data-destination]").forEach((card) => {
  card.addEventListener("click", () => {
    const destinationInput = enquiryForm.elements.destination;
    destinationInput.value = card.dataset.destination;
  });
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
    updatePriorityOptions(serviceSelect.value);
  });
});

function updateCategoryArrowState() {
  const maximumScroll = categoryTrack.scrollWidth - categoryTrack.clientWidth;

  categoryArrows.forEach((arrow) => {
    const direction = Number(arrow.dataset.categoryDirection);
    arrow.disabled = direction < 0
      ? categoryTrack.scrollLeft <= 8
      : maximumScroll <= 8 || categoryTrack.scrollLeft >= maximumScroll - 8;
  });
}

categoryArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const direction = Number(arrow.dataset.categoryDirection);
    categoryTrack.scrollBy({
      left: direction * categoryTrack.clientWidth * 0.8,
      behavior: "smooth"
    });
  });
});

categoryTrack.addEventListener("scroll", updateCategoryArrowState, { passive: true });
window.addEventListener("resize", updateCategoryArrowState);
updateCategoryArrowState();

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) {
    return;
  }

  const formData = new FormData(enquiryForm);
  const fields = [
    ["Name", "name"],
    ["Email", "email"],
    ["Interested in", (data) => serviceLabels[data.get("service")] || data.get("service")],
    ["What matters most", "priority"],
    ["Destination or country", "destination"],
    ["When", "timeframe"],
    ["Travelers or family members", "group"],
    ["Additional details", "message"]
  ];

  const enhancements = formData.getAll("enhancements");
  if (enhancements.length) {
    fields.push(["Trip enhancements", () => enhancements.join(", ")]);
  }

  const selectedDocuments = documentInput.files?.length || 0;
  if (selectedDocuments) {
    fields.push([
      "Local document preview",
      () => `${selectedDocuments} ${selectedDocuments === 1 ? "file" : "files"} selected in this browser; filenames and files are not attached`
    ]);
  }

  enquiryOutput.value = [
    "Rusetat Migration International — Client enquiry",
    "",
    ...fields.map(([label, field]) => {
      const value = typeof field === "function" ? field(formData) : formData.get(field);
      return `${label}: ${value?.toString().trim() || "Not provided"}`;
    })
  ].join("\n");
  emailEnquiryLink.href = `mailto:admin@rusetatmigration.com?${new URLSearchParams({
    subject: `Website enquiry: ${serviceLabels[formData.get("service")] || "Rusetat Migration International"}`,
    body: enquiryOutput.value
  })}`;
  whatsappEnquiryLink.href = "https://wa.me/27721555208";
  formResult.hidden = false;
  formResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(enquiryOutput.value);
    copyButton.textContent = "Copied";
  } catch {
    enquiryOutput.focus();
    enquiryOutput.select();
    const copied = document.execCommand("copy");
    copyButton.textContent = copied ? "Copied" : "Select and copy";
  }
});

downloadButton.addEventListener("click", () => {
  const file = new Blob([enquiryOutput.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rusetat-enquiry.txt";
  link.click();
  URL.revokeObjectURL(url);
});
