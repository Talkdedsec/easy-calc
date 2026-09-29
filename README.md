# Kolay Hesap

Türkçe, mobil uyumlu günlük hesap makinesi. Sayıları yaz; yüzde, indirim, zam ve KDV sonuçlarını anında gör.

**Canlı uygulama:** https://talkdedsec.github.io/kolay-hesap/

## Özellikler

- Bir sayının yüzdesi, indirimli fiyat ve zamlı tutar
- Bir sayının diğerine oranı ve yüzde değişim
- KDV ekleme ve dahil tutardan KDV ayırma
- Hızlı oran düğmeleri ve anlık sonuçlar
- Dört işlem, parantez, işlem önceliği, negatif ve ondalık sayılar
- Virgül veya nokta ile ondalık giriş; Türkçe sonuç biçimi
- Sonucu kopyalama ve oturum içi işlem geçmişi
- Büyük dokunmatik tuşlar; işlem alanında Enter ile hesaplama, Esc ile temizleme
- Üyelik, analitik veya sunucuya hesap gönderimi yok

## Çalıştırma

Node.js 24 önerilir.

```sh
npm ci
npm run dev
```

Terminalin gösterdiği yerel adresi aç. Windows PowerShell komut dosyası kısıtlaması varsa `npm` yerine `npm.cmd` kullan.

## Kontrol ve derleme

```sh
npm test
npx tsc --noEmit
npm run build:pages
npm run build
```

`build:pages`, GitHub Pages için statik uygulamayı `dist-pages/` klasörüne üretir. `build`, Sites / Cloudflare Worker sürümünü üretir. İki sürüm aynı arayüzü ve hesaplama kodunu kullanır.

## GitHub Pages

Depoda Settings → Pages → Source seçeneğini **GitHub Actions** yap. `main` dalına gönderilen değişiklikler test edilir ve otomatik yayımlanır. Pull request'lerde yalnızca test ve derleme çalışır.

## Hesaplama kuralları

- İndirim: tutar × (1 − oran / 100)
- Zam / KDV ekleme: tutar × (1 + oran / 100)
- KDV ayırma: dahil tutar / (1 + oran / 100)
- Yüzde değişim: (yeni − eski) / eski × 100; eski değer pozitif olmalı
- Klasik hesapta `%`, önceki sayıyı 100'e böler: `1000 × 20% = 200`. `1000 + 20% = 1000,2`; tutara yüzde eklemek için **Zam ekle** kullan.
- Hızlı oranlar örnektir; vergi mevzuatına göre otomatik oran seçilmez.
- Girişte binlik ayırıcı kullanılmaz; `1234,56` veya `1234.56` yazılır.
- Sonuçlar en fazla 8 ondalık basamakla gösterilir. JavaScript sayı hassasiyeti geçerlidir; muhasebe defteri veya keyfi hassasiyetli hesap aracı değildir.
- Geçmiş sadece sayfa açıkken bellekte tutulur; yenilemede silinir.

## Yapı

- `app/page.tsx`: ortak Türkçe arayüz
- `app/design.css`: mobil uyumlu tasarım
- `lib/math.ts`: güvenli matematik ayrıştırıcısı ve formüller (`eval` kullanılmaz)
- `tests/math.test.mjs`: formül, hata, hassasiyet ve giriş testleri
- `.github/workflows/pages.yml`: test ve GitHub Pages yayını
