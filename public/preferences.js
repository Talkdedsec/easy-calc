// Apply saved preferences before the page paints. Storage is optional.
try {
  const savedTheme = localStorage.getItem("kolayhesap.theme");
  const savedLanguage = localStorage.getItem("kolayhesap.language");
  if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme;
  if (savedLanguage === "en" || savedLanguage === "tr") document.documentElement.lang = savedLanguage;
} catch { /* The calculator also works when storage is blocked. */ }
