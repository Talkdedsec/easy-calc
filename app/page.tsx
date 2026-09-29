"use client";
import { useState } from "react";
import { calculate, evaluate, format, parseNumber, type Mode } from "../lib/math";

const modes: { id: Mode; title: string; icon: string; description: string; first: string; second: string; defaults: [string, string] }[] = [
  { id: "percent", title: "Yüzde bul", icon: "%", description: "Bir sayının istediğin yüzdesini bul.", first: "Sayı", second: "Yüzde oranı", defaults: ["1000", "20"] },
  { id: "discount", title: "İndirim", icon: "↘", description: "Etiketteki fiyatın indirimli halini gör.", first: "İlk fiyat", second: "İndirim oranı", defaults: ["1000", "20"] },
  { id: "increase", title: "Zam ekle", icon: "↗", description: "Bir tutara yüzde ekle, yeni tutarı öğren.", first: "İlk tutar", second: "Artış oranı", defaults: ["1000", "20"] },
  { id: "ratio", title: "Yüzde kaç?", icon: "÷", description: "Bir sayı diğerinin yüzde kaçı?", first: "Parça", second: "Toplam", defaults: ["250", "1000"] },
  { id: "change", title: "Yüzde değişim", icon: "⇄", description: "İki değer arasındaki artış veya azalışı bul.", first: "Eski değer", second: "Yeni değer", defaults: ["1000", "1250"] },
  { id: "vatAdd", title: "KDV ekle", icon: "+", description: "KDV hariç tutardan dahil tutara ulaş.", first: "KDV hariç tutar", second: "KDV oranı", defaults: ["1000", "20"] },
  { id: "vatRemove", title: "KDV ayır", icon: "−", description: "KDV dahil tutarın içindeki vergiyi ayır.", first: "KDV dahil tutar", second: "KDV oranı", defaults: ["1200", "20"] },
];
const keys = ["AC", "(", ")", "⌫", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "%", "0", ",", "+"];
type Entry = { expression: string; value: number };
export default function Home() {
  const [mode, setMode] = useState<Mode>("percent");
  const [first, setFirst] = useState("1000"), [second, setSecond] = useState("20");
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [notice, setNotice] = useState("");
  const active = modes.find(item => item.id === mode)!;
  let result: ReturnType<typeof calculate> | null = null, resultError = "";
  try { if (first.trim() && second.trim()) result = calculate(mode, parseNumber(first), parseNumber(second)); }
  catch (err) { resultError = (err as Error).message; }
  const isRate = !["ratio", "change"].includes(mode);
  function selectMode(next: typeof active) { setMode(next.id); setFirst(next.defaults[0]); setSecond(next.defaults[1]); setNotice(""); }
  async function copy(value: number) {
    try { await navigator.clipboard.writeText(String(value).replace(".", ",")); setNotice("Sonuç kopyalandı."); }
    catch { setNotice("Kopyalama kullanılamıyor. Sonucu seçip kopyalayabilirsin."); }
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
    setExpression(value => answer !== null ? (operator ? String(answer).replace(".", ",") + key : key) : value + key);
    setAnswer(null);
  }
  return <main>
    <header className="topbar"><a className="brand" href="#"><span className="brand-mark">=</span>kolay<span>hesap</span><span className="brand-dot">.</span></a><span className="top-note"><span className="status-dot" /> Küçük hesaplar, büyük kolaylık.</span><a className="github" href="https://github.com/Talkdedsec/kolay-hesap" target="_blank" rel="noreferrer">GitHub ↗</a></header>
    <section className="intro"><div className="eyebrow">GÜNLÜK HAYATIN HESAP MAKİNESİ</div><h1>Hesabı kafana <span>takma.</span></h1><p>İndirim mi, yüzde mi, KDV mi? Sayıları yaz, gerisini bize bırak.</p></section>
    <div className="workspace"><section className="quick-panel" aria-labelledby="quick-title">
      <div className="section-top"><h2 id="quick-title">Ne hesaplayalım?</h2><span className="pill">Anında sonuç</span></div>
      <div className="mode-grid" aria-label="Hesaplama türü">{modes.map(item => <button key={item.id} className={mode === item.id ? "mode active" : "mode"} aria-pressed={mode === item.id} onClick={() => selectMode(item)}><span className="mode-icon">{item.icon}</span>{item.title}</button>)}</div>
      <div className="form-heading"><h3>{active.title}</h3><p>{active.description}</p></div>
      <div className="fields"><label>{active.first}<input inputMode="decimal" value={first} onChange={event => setFirst(event.target.value)} autoComplete="off" maxLength={30} /></label><span className="field-connector">{isRate ? "×" : "→"}</span><label>{active.second}<div className="input-wrap"><input inputMode="decimal" value={second} onChange={event => setSecond(event.target.value)} autoComplete="off" maxLength={30} />{isRate && <span>%</span>}</div></label></div>
      {isRate && <div className="presets"><span>Hızlı oran</span>{[1, 5, 10, 18, 20, 25, 50].map(rate => <button key={rate} aria-pressed={second === String(rate)} onClick={() => setSecond(String(rate))}>%{rate}</button>)}</div>}
      <div className="result-card" aria-live="polite" aria-atomic="true"><div className="result-top"><span>{result?.label ?? "SONUÇ"}</span><span>↗</span></div><div className="result-value">{result ? format(result.value) + (result.percent ? "%" : "") : "—"}</div><p>{resultError || result?.detail || "Hesaplamak için iki alanı da doldur."}</p><button className="copy-button" disabled={!result} onClick={() => result && copy(result.value)}>Sonucu kopyala <span>⧉</span></button></div>
      <p className="input-help">Virgül veya nokta ile ondalık girebilirsin. Binlik ayırıcı kullanma.<br />Hızlı oranlar örnektir; ihtiyacın olan oranı kendin yazabilirsin.</p>
    </section><section className="calculator" aria-labelledby="calculator-title"><div className="section-top"><h2 id="calculator-title">Klasik hesap</h2><span className="tiny-label">+ − × ÷</span></div><div className="screen"><label htmlFor="expression">İşlemini yaz veya tuşları kullan</label><input id="expression" value={expression} placeholder="0" spellCheck={false} autoComplete="off" maxLength={200} onChange={event => { setExpression(event.target.value); setAnswer(null); setError(""); }} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); solve(); } if (event.key === "Escape") press("AC"); }} /><output aria-live="polite">{error || (answer === null ? "" : "= " + format(answer))}</output></div><div className="keypad">{keys.map(key => <button key={key} onClick={() => press(key)} aria-label={key === "⌫" ? "Son karakteri sil" : key === "AC" ? "İşlemi temizle" : key} className={key === "AC" ? "clear" : ["÷", "×", "−", "+"].includes(key) ? "operator" : ""}>{key}</button>)}<button className="equals" onClick={solve}>Hesapla <span>=</span></button></div><p className="keyboard-hint"><kbd>Enter</kbd> hesapla <span>·</span> <kbd>Esc</kbd> temizle</p><p className="percent-hint">% tuşu sayıyı 100'e böler. Örnek: 1000 × 20% = 200.</p></section></div>
    <section className="history"><div className="section-top"><h2>Son hesapların <span className="history-count">{history.length}</span></h2>{history.length > 0 && <button className="text-button" onClick={() => setHistory([])}>Temizle</button>}</div>{history.length ? <div className="history-list">{history.map((item, index) => <button key={index} onClick={() => { setExpression(item.expression); setAnswer(item.value); setError(""); }}><span>{item.expression}</span><strong>= {format(item.value)}</strong><span aria-hidden="true">↗</span></button>)}</div> : <p className="history-empty">Klasik hesap makinesindeki işlemlerin burada görünecek.</p>}<p className="history-note">Geçmiş yalnızca bu sayfa açıkken tutulur.</p></section>
    <div className="notice" role="status">{notice}</div><footer><span><strong>kolayhesap.</strong> Hayat yeterince karışık. Hesaplar olmasın.</span><span>Ücretsiz · Üyelik yok · Hesaplar cihazında</span></footer>
  </main>;
}
