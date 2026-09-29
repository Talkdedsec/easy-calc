import type { Mode } from "./math";
export type Language = "en" | "tr";
export const localeFormat = (value: number, language: Language) => new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US", { maximumFractionDigits: 8 }).format(value);
export const modeConfig: { id: Mode; icon: string; defaults: [string, string] }[] = [
  { id: "percent", icon: "%", defaults: ["1000", "20"] },
  { id: "discount", icon: "↘", defaults: ["1000", "20"] },
  { id: "increase", icon: "↗", defaults: ["1000", "20"] },
  { id: "ratio", icon: "÷", defaults: ["250", "1000"] },
  { id: "change", icon: "⇄", defaults: ["1000", "1250"] },
  { id: "vatAdd", icon: "+", defaults: ["1000", "20"] },
  { id: "vatRemove", icon: "−", defaults: ["1200", "20"] },
];
export const translations = {
 en: {
  title: "Kolay Hesap — Everyday calculations, made simple",
  description: "Calculate percentages, discounts, increases and VAT instantly. A free calculator in English and Turkish.",
  tagline: "Small calculations. A little more clarity.", eyebrow: "YOUR EVERYDAY CALCULATOR", headline: "Less effort.", accent: "More clarity.", intro: "From a quick discount to a tricky percentage. Make the numbers work for you.",
  quick: "What are we calculating?", instant: "Live result", rate: "Quick rates", result: "RESULT", empty: "Fill in both fields to see your result.", copy: "Copy result", copied: "Result copied.", copyFailed: "Copy is unavailable. Select the result and copy it manually.",
  help: "Use a dot or comma for decimals, without thousands separators.", ratesHelp: "Preset rates are examples. Enter any rate you need.", classic: "Classic calculator", expression: "Type an expression or use the keypad", compute: "Calculate", clear: "Clear", backspace: "Delete last character", percentHint: "% divides a number by 100. Example: 1000 × 20% = 200.",
  history: "Recent calculations", historyEmpty: "A clean slate. Your calculations will appear here.", historyNote: "History stays in this tab and clears when you refresh.", footer: "Life is complicated enough. Your calculations shouldn't be.", privacy: "Free to use · No account · Calculated on your device", theme: "Appearance", dark: "Dark", light: "Light", language: "Language", mode: "Calculation type", difference: "Difference", saved: "You save", added: "Amount added", vat: "VAT amount", base: "Net amount", total: "Total", part: "of", is: "is", keyboard: "Keyboard friendly", private: "Private by design", decrease: "DECREASE", increase: "INCREASE", unchanged: "NO CHANGE", resultLabels: { percent: "PERCENTAGE AMOUNT", discount: "DISCOUNTED PRICE", increase: "NEW AMOUNT", ratio: "PERCENTAGE", change: "PERCENTAGE CHANGE", vatAdd: "TOTAL INCLUDING VAT", vatRemove: "AMOUNT EXCLUDING VAT" },
  modes: {
   percent: ["Percentage", "Find a percentage of any number.", "Number", "Percentage"],
   discount: ["Discount", "See what you'll pay after the discount.", "Original price", "Discount rate"],
   increase: ["Increase", "Add a percentage and find your new total.", "Original amount", "Increase rate"],
   ratio: ["What percent?", "Find what percentage one number is of another.", "Part", "Whole"],
   change: ["% change", "Compare two values to find the increase or decrease.", "Old value", "New value"],
   vatAdd: ["Add VAT", "Turn a net amount into a VAT-inclusive total.", "Amount before VAT", "VAT rate"],
   vatRemove: ["Remove VAT", "Separate the VAT already included in an amount.", "Amount including VAT", "VAT rate"],
  },
 },
 tr: {
  title: "Kolay Hesap — Günlük hesaplar artık çok kolay",
  description: "Yüzde, indirim, zam ve KDV hesaplarını anında yap. İngilizce ve Türkçe ücretsiz hesap makinesi.",
  tagline: "Küçük hesaplar. Büyük kolaylık.", eyebrow: "GÜNLÜK HAYATIN HESAP MAKİNESİ", headline: "Hesabı kafana", accent: "takma.", intro: "İndirimden yüzdeye, zamdan KDV’ye. Sayıları yaz, gerisini bize bırak.",
  quick: "Ne hesaplayalım?", instant: "Anında sonuç", rate: "Hızlı oranlar", result: "SONUÇ", empty: "Sonucu görmek için iki alanı da doldur.", copy: "Sonucu kopyala", copied: "Sonuç kopyalandı.", copyFailed: "Kopyalama kullanılamıyor. Sonucu seçip elle kopyalayabilirsin.",
  help: "Ondalık için virgül veya nokta kullan; binlik ayırıcı ekleme.", ratesHelp: "Hazır oranlar örnektir. İhtiyacın olan oranı yazabilirsin.", classic: "Klasik hesap", expression: "İşlemini yaz veya tuşları kullan", compute: "Hesapla", clear: "Temizle", backspace: "Son karakteri sil", percentHint: "% sayıyı 100'e böler. Örnek: 1000 × 20% = 200.",
  history: "Son hesapların", historyEmpty: "Tertemiz bir başlangıç. Hesapların burada görünecek.", historyNote: "Geçmiş bu sekmede tutulur; sayfayı yenileyince silinir.", footer: "Hayat yeterince karışık. Hesaplar olmasın.", privacy: "Ücretsiz · Üyelik yok · Hesaplar cihazında", theme: "Görünüm", dark: "Koyu", light: "Açık", language: "Dil", mode: "Hesaplama türü", difference: "Fark", saved: "Tasarrufun", added: "Eklenen tutar", vat: "KDV tutarı", base: "Matrah", total: "Toplam", part: "içinde", is: "oran", keyboard: "Klavye desteği", private: "Gizlilik odaklı", decrease: "AZALIŞ", increase: "ARTIŞ", unchanged: "DEĞİŞİM YOK", resultLabels: { percent: "YÜZDE TUTARI", discount: "İNDİRİMLİ FİYAT", increase: "YENİ TUTAR", ratio: "YÜZDE ORANI", change: "YÜZDE DEĞİŞİMİ", vatAdd: "KDV DAHİL TUTAR", vatRemove: "KDV HARİÇ TUTAR" },
  modes: {
   percent: ["Yüzde bul", "Bir sayının istediğin yüzdesini bul.", "Sayı", "Yüzde oranı"],
   discount: ["İndirim", "İndirimden sonra ödeyeceğin fiyatı gör.", "İlk fiyat", "İndirim oranı"],
   increase: ["Zam ekle", "Bir tutara yüzde ekle, yeni tutarı öğren.", "İlk tutar", "Artış oranı"],
   ratio: ["Yüzde kaç?", "Bir sayı diğerinin yüzde kaçı?", "Parça", "Toplam"],
   change: ["% değişim", "İki değer arasındaki artışı veya azalışı bul.", "Eski değer", "Yeni değer"],
   vatAdd: ["KDV ekle", "KDV hariç tutardan dahil tutara ulaş.", "KDV hariç tutar", "KDV oranı"],
   vatRemove: ["KDV ayır", "Tutarın içinde bulunan KDV’yi ayır.", "KDV dahil tutar", "KDV oranı"],
  },
 },
};
const errors: Record<string, string> = {
 "Sonuç hesaplanamıyor. Sayıları kontrol et.": "Unable to calculate. Check your numbers.",
 "Geçerli bir sayı yaz. Binlik ayırıcı kullanma.": "Enter a valid number without thousands separators.",
 "Toplam sıfır olamaz.": "The whole cannot be zero.",
 "Eski değer sıfırdan büyük olmalı.": "The old value must be greater than zero.",
 "Tutar ve oran negatif olamaz.": "The amount and rate cannot be negative.",
 "İndirim oranı %100'ü geçemez.": "The discount cannot exceed 100%.",
 "İşlem çok uzun.": "The expression is too long.",
 "İşlemi kontrol et. Yalnızca sayı ve işlem işaretleri kullan.": "Use only numbers and arithmetic operators.",
 "Parantezleri kontrol et.": "Check your parentheses.",
 "İşlem tamamlanmamış.": "The expression is incomplete.",
 "Sıfıra bölme yapılamaz.": "Cannot divide by zero.",
 "İşlem işaretlerini ve parantezleri kontrol et.": "Check your operators and parentheses.",
};
export const translateError = (message: string, language: Language) => language === "tr" ? message : errors[message] ?? "Unable to calculate. Check your expression.";
