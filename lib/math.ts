export type Mode = "percent" | "discount" | "increase" | "ratio" | "change" | "vatAdd" | "vatRemove";
export const format = (value: number) => new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 8 }).format(value);
function finite(value: number): number {
  if (!Number.isFinite(value)) throw new Error("Sonuç hesaplanamıyor. Sayıları kontrol et.");
  return Object.is(value, -0) ? 0 : value;
}
export function parseNumber(text: string): number {
  const normalized = text.trim().replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) throw new Error("Geçerli bir sayı yaz. Binlik ayırıcı kullanma.");
  return finite(Number(normalized));
}
export function calculate(mode: Mode, a: number, b: number) {
  finite(a); finite(b);
  let value = 0, label = "SONUÇ", detail = "", percent = false;
  if (mode === "ratio") {
    if (b === 0) throw new Error("Toplam sıfır olamaz.");
    value = finite(a / b * 100); label = "YÜZDE ORANI"; percent = true;
    detail = `${format(a)}, ${format(b)} sayısının %${format(value)} kadarıdır.`;
  } else if (mode === "change") {
    if (a <= 0) throw new Error("Eski değer sıfırdan büyük olmalı.");
    value = (b - a) / a * 100; percent = true; label = value < 0 ? "AZALIŞ ORANI" : value > 0 ? "ARTIŞ ORANI" : "DEĞİŞİM YOK";
    detail = `Fark: ${format(finite(b - a))}`;
  } else {
    if (mode !== "percent" && (a < 0 || b < 0)) throw new Error("Tutar ve oran negatif olamaz.");
    if (mode === "discount" && b > 100) throw new Error("İndirim oranı %100'ü geçemez.");
    const portion = finite(a * (b / 100));
    if (mode === "percent") { value = portion; label = "YÜZDE TUTARI"; detail = `${format(a)} × %${format(b)} = ${format(value)}`; }
    if (mode === "discount") { value = a - portion; label = "İNDİRİMLİ FİYAT"; detail = `${format(portion)} tasarruf ediyorsun.`; }
    if (mode === "increase") { value = a + portion; label = "YENİ TUTAR"; detail = `Eklenen tutar: ${format(portion)}`; }
    if (mode === "vatAdd") { value = a + portion; label = "KDV DAHİL TUTAR"; detail = `KDV tutarı: ${format(portion)} · Matrah: ${format(a)}`; }
    if (mode === "vatRemove") { value = a / (1 + b / 100); label = "KDV HARİÇ TUTAR"; detail = `KDV tutarı: ${format(a - value)} · Toplam: ${format(a)}`; }
  }
  return { value: finite(value), label, detail, percent };
}
/** Arithmetic parser: no eval. Percent always divides by 100. */
export function evaluate(input: string): number {
  if (input.length > 200) throw new Error("İşlem çok uzun.");
  const source = input.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/,/g, ".");
  const tokens = source.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[()+*/%\-]/gi) ?? [];
  if (!tokens.length || tokens.join("") !== source.replace(/\s/g, "")) throw new Error("İşlemi kontrol et. Yalnızca sayı ve işlem işaretleri kullan.");
  let index = 0;
  function atom(): number {
    const token = tokens[index++];
    if (token === "+") return atom();
    if (token === "-") return -atom();
    let value: number;
    if (token === "(") { value = sum(); if (tokens[index++] !== ")") throw new Error("Parantezleri kontrol et."); }
    else { if (!token || !/^(?:\d|\.)/.test(token)) throw new Error("İşlem tamamlanmamış."); value = Number(token); }
    while (tokens[index] === "%") { index++; value /= 100; }
    return finite(value);
  }
  function product(): number {
    let value = atom();
    while (tokens[index] === "*" || tokens[index] === "/") {
      const operator = tokens[index++]; const right = atom();
      if (operator === "/" && right === 0) throw new Error("Sıfıra bölme yapılamaz.");
      value = finite(operator === "*" ? value * right : value / right);
    }
    return value;
  }
  function sum(): number {
    let value = product();
    while (tokens[index] === "+" || tokens[index] === "-") { const operator = tokens[index++]; const right = product(); value = finite(operator === "+" ? value + right : value - right); }
    return value;
  }
  const value = sum();
  if (index !== tokens.length) throw new Error("İşlem işaretlerini ve parantezleri kontrol et.");
  return finite(Number(value.toPrecision(15)));
}
