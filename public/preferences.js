// Apply saved preferences, or the browser language, before the page paints.
{
  let savedTheme = null, savedLanguage = null;
  try {
    savedTheme = localStorage.getItem("easycalc.theme");
    savedLanguage = localStorage.getItem("easycalc.language");
  } catch { /* The calculator also works when storage is blocked. */ }
  if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme;
  const browser = (navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en";
  document.documentElement.lang = savedLanguage === "en" || savedLanguage === "tr" ? savedLanguage : browser;
}
