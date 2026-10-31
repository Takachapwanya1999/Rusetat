const externalMediaNotice = document.querySelector("#external-media-notice");
const externalMediaButtons = document.querySelectorAll("[data-external-media-choice]");
const privacyPreferenceButtons = document.querySelectorAll("[data-open-privacy-preferences]");
const externalMediaStorageKey = "rusetat-external-media-choice";
const externalMediaNoticeText = externalMediaNotice?.querySelector("p");
let externalMediaStorageAvailable = true;

function setExternalMediaChoice(choice) {
  document.body.classList.toggle("external-media-allowed", choice === "allow");
  externalMediaNotice.hidden = true;

  if (externalMediaStorageAvailable) {
    try {
      localStorage.setItem(externalMediaStorageKey, choice);
    } catch {
      externalMediaStorageAvailable = false;
      externalMediaNotice.hidden = false;
      externalMediaNoticeText.textContent = "Your choice applies for this visit only because this browser did not allow it to be saved. External images are optional; allow them to load or continue without them.";
    }
  } else {
    externalMediaNoticeText.textContent = "Your choice applies for this visit only because this browser did not allow it to be saved. External images are optional; allow them to load or continue without them.";
  }
}

if (externalMediaNotice) {
  let savedChoice = null;

  try {
    savedChoice = localStorage.getItem(externalMediaStorageKey);
  } catch {
    externalMediaStorageAvailable = false;
  }

  if (savedChoice === "allow") {
    document.body.classList.add("external-media-allowed");
  } else if (savedChoice !== "deny") {
    externalMediaNotice.hidden = false;
  }

  if (!externalMediaStorageAvailable) {
    externalMediaNotice.hidden = false;
    externalMediaNoticeText.textContent = "Your browser does not allow saving this choice, so external images will stay off unless you allow them for this visit.";
  }

  externalMediaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setExternalMediaChoice(button.dataset.externalMediaChoice);
    });
  });

  privacyPreferenceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      externalMediaNotice.hidden = false;
      externalMediaButtons[0].focus();
    });
  });
}

const loadOfficeMapButton = document.querySelector("#load-office-map");
loadOfficeMapButton?.addEventListener("click", () => {
  const mapPlaceholder = loadOfficeMapButton.closest(".office-map-placeholder");
  const map = document.createElement("iframe");
  map.title = "Map to Rusetat Migration International at 269 Von Willich Avenue, 66 Corporate Office Park, Centurion";
  map.src = "https://maps.google.com/maps?q=269%20Von%20Willich%20Avenue%2C%2066%20Corporate%20Office%20Park%2C%20Centurion%2C%20South%20Africa&z=15&output=embed";
  map.loading = "lazy";
  map.referrerPolicy = "no-referrer";
  mapPlaceholder.replaceWith(map);
});
