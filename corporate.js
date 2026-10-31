const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const enquiryForm = document.querySelector("#corporate-form");
const result = document.querySelector("#corporate-form-result");

document.querySelector("#current-year").textContent = new Date().getFullYear();

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

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) {
    return;
  }

  const data = new FormData(enquiryForm);
  const enquiry = [
    "Rusetat Migration International — Corporate and group travel enquiry",
    "",
    `Organization or team: ${data.get("organization")}`,
    `Contact name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Trip type: ${data.get("tripType")}`,
    `Destination: ${data.get("destination") || "Not provided"}`,
    `Estimated team size: ${data.get("teamSize") || "Not provided"}`,
    `Preferred dates or timeframe: ${data.get("timeframe") || "Not provided"}`,
    `Bleisure or remote-work extension: ${data.get("extension") || "Not provided"}`,
    `Team goals and priorities: ${data.get("goals") || "Not provided"}`
  ].join("\n");

  document.querySelector("#corporate-enquiry-output").value = enquiry;
  document.querySelector("#corporate-email-link").href =
    `mailto:admin@rusetatmigration.com?${new URLSearchParams({
      subject: `Corporate travel enquiry: ${data.get("organization")}`,
      body: enquiry
    })}`;
  document.querySelector("#corporate-whatsapp-link").href =
    "https://wa.me/27721555208";
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelector("#copy-corporate-enquiry").addEventListener("click", async () => {
  const output = document.querySelector("#corporate-enquiry-output");
  const copyStatus = document.querySelector("#corporate-copy-status");

  try {
    await navigator.clipboard.writeText(output.value);
    copyStatus.textContent = "Brief copied on this device. Paste it into WhatsApp only if you choose to share it.";
  } catch {
    output.focus();
    output.select();
    const copied = document.execCommand("copy");
    copyStatus.textContent = copied
      ? "Brief copied on this device. Paste it into WhatsApp only if you choose to share it."
      : "Copy was unavailable. Select the brief above and copy it manually.";
  }
});
