# Security policy · Güvenlik politikası

## English

Do not open a public issue for a vulnerability. Report it privately:

- **Security → Report a vulnerability** on this repository, or
- email **talkdedsec@proton.me** with `easy-calc` in the subject.

Acknowledgement within 72 hours, assessment within 7 days.

### In scope

- Script injection through an input field, URL parameter or stored value.
- Any network request that sends what you typed off the device. Calculations run in the browser.
- A vulnerable dependency that is actually reachable from the shipped page.

### Out of scope

- Rounding differences and calculation bugs — open a normal issue for those.
- Attacks that need control of the browser or the machine already.

## Türkçe

Güvenlik açığı için herkese açık issue açma. Gizli bildir:

- bu repoda **Security → Report a vulnerability**, ya da
- konu satırında `easy-calc` geçen bir e-postayla **talkdedsec@proton.me**.

72 saat içinde dönüş, 7 gün içinde değerlendirme.

### Kapsamda

- Giriş alanı, URL parametresi ya da kayıtlı değer üzerinden script çalıştırma.
- Yazdıklarını cihaz dışına gönderen her ağ isteği. Hesaplamalar tarayıcıda yapılır.
- Yayınlanan sayfadan gerçekten erişilebilen açıklı bir bağımlılık.

### Kapsam dışı

- Yuvarlama farkları ve hesap hataları — bunlar için normal issue aç.
- Tarayıcının ya da makinenin zaten ele geçirilmiş olmasını gerektiren saldırılar.
