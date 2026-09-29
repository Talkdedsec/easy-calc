"use client";
import { useEffect, useState } from "react";
import { calculate, evaluate, parseNumber, type Mode } from "../lib/math";
import { translations, modeConfig, localeFormat, translateError, type Language } from "../lib/i18n";

type Entry = { expression: string; value: number };
type Theme = "dark" | "light";
export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<Mode>("percent");
  const [first, setFirst] = useState("1000"), [second, setSecond] = useState("20");
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [notice, setNotice] = useState<"copied" | "copyFailed" | null>(null);
  const t = translations[language], active = t.modes[mode];
  const fmt = (value: number) => localeFormat(value, language);
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("kolayhesap.language");
      const savedTheme = localStorage.getItem("kolayhesap.theme");
      if (savedLanguage === "en" || savedLanguage === "tr") setLanguage(savedLanguage);
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    } catch { /* Storage is optional, including in private browsing. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#101813" : "#f6f7f2");
    try { localStorage.setItem("kolayhesap.language", language); localStorage.setItem("kolayhesap.theme", theme); } catch { /* Keep working without storage. */ }
  }, [language, theme, ready, t.title, t.description]);
  let result: ReturnType<typeof calculate> | null = null, resultError = "", detail = "";
  try {
    if (first.trim() && second.trim()) {
      const a = parseNumber(first), b = parseNumber(second);
      result = calculate(mode, a, b);
      if (mode === "percent") detail = fmt(a) + " × " + fmt(b) + "% = " + fmt(result.value);
      if (mode === "discount") detail = t.saved + ": " + fmt(a - result.value);
      if (mode === "increase") detail = t.added + ": " + fmt(result.value - a);
      if (mode === "ratio") detail = fmt(a) + " / " + fmt(b) + " × 100";
      if (mode === "change") detail = t.difference + ": " + fmt(b - a);
      if (mode === "vatAdd") detail = t.vat + ": " + fmt(result.value - a) + " · " + t.base + ": " + fmt(a);
      if (mode === "vatRemove") detail = t.vat + ": " + fmt(a - result.value) + " · " + t.total + ": " + fmt(a);
    }
  } catch (err) { resultError = translateError((err as Error).message, language); }
  const isRate = !["ratio", "change"].includes(mode);
  const resultLabel = mode === "change" && result ? (result.value < 0 ? t.decrease : result.value > 0 ? t.increase : t.unchanged) : t.resultLabels[mode];
  function selectMode(next: typeof modeConfig[number]) { setMode(next.id); setFirst(next.defaults[0]); setSecond(next.defaults[1]); setNotice(null); }
  async function copy(value: number) {
    try { await navigator.clipboard.writeText(language === "tr" ? String(value).replace(".", ",") : String(value)); setNotice("copied"); }
    catch { setNotice("copyFailed"); }
  }
  function solve() {
    if (!expression.trim()) return;
    try { const value = evaluate(expression); setAnswer(value); setError(""); setHistory(items => [{ expression, value }, ...items].slice(0, 8)); }
    catch (err) { setError((err as Error).message); setAnswer(null); }
  }
  function press(key: string) {
    setError("");
    if (key === "AC") { setExpression(""); setAnswer(null); return; }
    if (key === "⌫") { setExpression(value => value.slice(0, -1)); setAnswer(null); return; }
    const operator = ["+", "−", "×", "÷", "%"].includes(key);
    setExpression(value => {
      const previous = answer !== null ? (language === "tr" ? String(answer).replace(".", ",") : String(answer)) : value;
      return (answer !== null ? (operator ? previous + key : key) : value + key).slice(0, 200);
    });
    setAnswer(null);
  }
  const keys = ["AC", "(", ")", "⌫", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "%", "0", language === "tr" ? "," : ".", "+"];
  return <main>
    <header className="topbar">
      <a className="brand" href="#" aria-label="Kolay Hesap"><span className="brand-mark">=</span>kolay<span>hesap</span><span className="brand-dot">.</span></a>
      <div className="toolbar">
        <div className="segmented languages" role="group" aria-label={t.language}>{(["en", "tr"] as const).map(lang => <button key={lang} lang={lang} aria-label={lang === "en" ? "English" : "Türkçe"} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
        <div className="segmented themes" role="group" aria-label={t.theme}><button aria-pressed={theme === "light"} onClick={() => setTheme("light")}><span aria-hidden="true">☀</span><span>{t.light}</span></button><button aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}><span aria-hidden="true">☾</span><span>{t.dark}</span></button></div>
        <a className="github" href="https://github.com/Talkdedsec/kolay-hesap" target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </header>
    <section className="intro"><div><div className="eyebrow"><span className="status-dot" />{t.eyebrow}</div><h1>{t.headline}<br /><span>{t.accent}</span></h1><p>{t.intro}</p></div><div className="intro-aside"><div className="decorative-equation" aria-hidden="true"><span>1,000</span><span>× 20%</span><strong>200<span>↗</span></strong></div><span className="aside-note">{t.tagline}</span></div></section>
    <div className="workspace"><section className="quick-panel" aria-labelledby="quick-title">
      <div className="section-top"><h2 id="quick-title"><span className="section-index">01</span>{t.quick}</h2><span className="pill"><span className="status-dot" />{t.instant}</span></div>
      <div className="mode-grid" role="group" aria-label={t.mode}>{modeConfig.map(item => <button key={item.id} className={mode === item.id ? "mode active" : "mode"} aria-pressed={mode === item.id} onClick={() => selectMode(item)}><span className="mode-icon" aria-hidden="true">{item.icon}</span>{t.modes[item.id][0]}<span className="selection-dot" /></button>)}</div>
      <div className="form-heading"><h3>{active[0]}</h3><p>{active[1]}</p></div>
      <div className="fields"><label>{active[2]}<input inputMode="decimal" value={first} onChange={event => { setFirst(event.target.value); setNotice(null); }} autoComplete="off" maxLength={30} /></label><span className="field-connector" aria-hidden="true">{isRate ? "×" : "→"}</span><label>{active[3]}<span className="input-wrap"><input inputMode="decimal" value={second} onChange={event => { setSecond(event.target.value); setNotice(null); }} autoComplete="off" maxLength={30} />{isRate && <span>%</span>}</span></label></div>
      {isRate && <div className="presets"><span>{t.rate}</span>{[1, 5, 10, 18, 20, 25, 50].map(rate => <button key={rate} aria-pressed={second === String(rate)} onClick={() => { setSecond(String(rate)); setNotice(null); }}>{rate}%</button>)}</div>}
      <div className={"result-card" + (resultError ? " invalid" : "")} aria-live="polite" aria-atomic="true"><div className="result-top"><span>{result ? resultLabel : t.result}</span><span aria-hidden="true">↗</span></div><div className="result-value">{result ? fmt(result.value) + (result.percent ? "%" : "") : "—"}</div><p>{resultError || detail || t.empty}</p><button className="copy-button" disabled={!result} onClick={() => result && copy(result.value)}>{notice === "copied" ? t.copied : t.copy}<span aria-hidden="true">{notice === "copied" ? "✓" : "⧉"}</span></button></div>
      <div className="notice" role="status">{notice ? t[notice] : ""}</div><p className="input-help">{t.help}<br />{t.ratesHelp}</p>
    </section><section className="calculator" aria-labelledby="calculator-title"><div className="section-top"><h2 id="calculator-title"><span className="section-index">02</span>{t.classic}</h2><span className="tiny-label" aria-hidden="true">+ − × ÷</span></div><div className="screen"><label htmlFor="expression">{t.expression}</label><input id="expression" value={expression} placeholder="0" spellCheck={false} autoComplete="off" maxLength={200} onChange={event => { setExpression(event.target.value); setAnswer(null); setError(""); }} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); solve(); } if (event.key === "Escape") press("AC"); }} /><output aria-live="polite" className={error ? "error" : ""}>{error ? translateError(error, language) : answer === null ? "" : "= " + fmt(answer)}</output></div><div className="keypad">{keys.map(key => <button key={key} onClick={() => press(key)} aria-label={key === "⌫" ? t.backspace : key === "AC" ? t.clear : key} className={key === "AC" ? "clear" : ["÷", "×", "−", "+"].includes(key) ? "operator" : ""}>{key}</button>)}<button className="equals" onClick={solve}>{t.compute}<span>=</span></button></div><p className="keyboard-hint"><kbd>Enter</kbd>{t.compute}<span>·</span><kbd>Esc</kbd>{t.clear}</p><p className="percent-hint">{t.percentHint}</p></section></div>
    <section className="history"><div className="section-top"><h2><span className="section-index">03</span>{t.history}<span className="history-count">{history.length.toString().padStart(2, "0")}</span></h2>{history.length > 0 && <button className="text-button" onClick={() => setHistory([])}>{t.clear}</button>}</div>{history.length ? <div className="history-list">{history.map((item, index) => <button key={index} onClick={() => { setExpression(item.expression); setAnswer(item.value); setError(""); }}><span>{item.expression}</span><strong>= {fmt(item.value)}</strong><span aria-hidden="true">↗</span></button>)}</div> : <p className="history-empty"><span aria-hidden="true">↶</span>{t.historyEmpty}</p>}<p className="history-note">{t.historyNote}</p></section>
    <footer><span><strong>kolayhesap.</strong>{t.footer}</span><span>{t.privacy}</span></footer>
  </main>;
}
