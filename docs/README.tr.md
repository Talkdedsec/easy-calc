![Kolay Hesap — Daha az uğraş, daha net sonuç.](../public/banner.png)

<p align="center"><a href="../README.md">English</a> · <strong>Türkçe</strong></p>
<p align="center"><a href="https://talkdedsec.github.io/kolay-hesap/">Hesap makinesini aç</a> · <a href="#kurulum">Kurulum</a> · <a href="#hesaplama-kuralları">Hesaplama kuralları</a></p>

# Kolay Hesap

**Günlük hesaplar artık çok kolay.** Yüzde, indirim, zam ve KDV hesaplarını sade bir arayüzde anında yap.

## Özellikler

- **Koyu ve açık tema** — istediğin an değiştir; tercihin cihazında hatırlanır.
- **İngilizce varsayılan, Türkçe seçilebilir** — düğmeler, sonuçlar, hata mesajları ve sayı biçimi seçtiğin dile uyar.
- **Yedi hızlı araç** — yüzde, indirim, zam, yüzde oranı, yüzde değişimi, KDV ekleme ve ayırma.
- **Klasik hesap makinesi** — işlem önceliği, parantez, negatif ve ondalık değerler; `eval` kullanılmaz.
- **Daha az yazı** — hazır oranlar, anlık sonuçlar, kopyalama ve tekrar kullanılabilir işlem geçmişi.
- **Mobil uyum ve erişilebilirlik** — büyük tuşlar, görünür klavye odağı ve etiketli kontroller.
- **Gizlilik** — hesaplar tarayıcıda yapılır. Üyelik veya analitik yok; yalnızca dil ve tema tercihleri yerel depolamaya kaydedilir.

Dil veya tema değiştirmek girdilerini ve geçmişini silmez. İşlem geçmişi bellekte tutulur, sayfayı yenileyince temizlenir.

## Kurulum

Node.js 24 kullan.

```sh
git clone https://github.com/Talkdedsec/kolay-hesap.git
cd kolay-hesap
npm ci
npm run dev
```

Terminalde gösterilen yerel adresi aç. Windows PowerShell `npm.ps1` dosyasını engellerse `npm.cmd` kullan.

## Kontrol ve derleme

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` statik siteyi `dist/` altına yazar; `npm run preview` onu yerelde açar. GitHub Actions yukarıdaki tüm kontrolleri çalıştırır ve `main` dalına gönderilen her değişikliği yayımlar; pull request'lerde yalnızca kontroller çalışır. Fork için **Settings → Pages → Source → GitHub Actions** seç ve depo / sosyal önizleme adreslerini güncelle.

## Hesaplama kuralları

| Araç | Formül |
| --- | --- |
| Yüzde | tutar × oran / 100 |
| İndirim | tutar × (1 − oran / 100) |
| Zam / KDV ekleme | tutar × (1 + oran / 100) |
| KDV ayırma | dahil tutar / (1 + oran / 100) |
| Yüzde oranı | parça / toplam × 100 |
| Yüzde değişimi | (yeni − eski) / eski × 100 |

- Yüzde değişiminde eski değer pozitif olmalı; yüzde oranında toplam sıfır olamaz.
- Klasik hesapta `%`, önceki değeri 100'e böler: `1000 × 20% = 200`. `1000 + 20% = 1000,2`. Tutara yüzde eklemek için **Zam ekle** kullan.
- Ondalık girişte virgül veya nokta kabul edilir. Binlik ayırıcı kullanma: `1234,56` veya `1234.56` yaz.
- Sonuçlar dile göre biçimlenir: Türkçede `1.234,56`, İngilizcede `1,234.56`.
- Hazır oranlar örnektir; vergi oranı otomatik seçilmez.
- Sonuçlar en fazla sekiz ondalık basamakla gösterilir. JavaScript sayı hassasiyeti geçerlidir.

## Klavye

Klasik hesap alanına tıklayıp işlemini yaz. **Enter** hesaplar, **Esc** temizler. Tüm düğmelere **Tab** ile ulaşabilirsin.

## Proje yapısı

| Dosya | Görev |
| --- | --- |
| `src/App.tsx` | Hesap makinesi arayüzü ve tercih yönetimi |
| `src/design.css` | Mobil uyumlu açık ve koyu temalar |
| `src/lib/i18n.ts` | İngilizce / Türkçe metinler ve sayı biçimi |
| `src/lib/math.ts` | İşlem ayrıştırıcısı ve hesaplama formülleri |
| `public/preferences.js` | Kayıtlı tema ve dili ilk boyamadan önce uygular |
| `public/banner.png` | README banner'ı ve sosyal önizleme |
| `tests/` | Matematik ve yerelleştirme kontrolleri |
| `.github/workflows/pages.yml` | Kontroller ve GitHub Pages yayını |
