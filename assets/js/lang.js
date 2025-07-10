let currentLang = localStorage.getItem("lang") || "en";

function setLang(langCode) {
  currentLang = langCode;
  localStorage.setItem("lang", langCode);
  applyLang();
}

async function applyLang() {
  try {
    // Deteksi apakah file ini diakses dari folder /pages/
    const base = location.pathname.includes("/pages/") ? "../" : "";
    const res = await fetch(`${base}lang/${currentLang}.json`);
    const langData = await res.json();

    document.querySelectorAll("[data-lang]").forEach(el => {
      const key = el.getAttribute("data-lang");
      if (langData[key]) {
        if (el.tagName === "TITLE") {
          document.title = langData[key];
        } else {
          el.innerText = langData[key];
        }
      }
    });
  } catch (err) {
    console.error("Error loading language file:", err);
  }
}
