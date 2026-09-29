import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kolay Hesap — Yüzde, indirim ve KDV hesaplama",
  description: "Yüzde, indirim, zam ve KDV hesaplarını anında yap. Ücretsiz, Türkçe ve kolay hesap makinesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
