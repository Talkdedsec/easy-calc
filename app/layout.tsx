import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("host") ?? "localhost";
  const origin = new URL((host.startsWith("localhost") ? "http://" : "https://") + host);
  const title = "Kolay Hesap — Everyday calculations, made simple";
  const description = "Calculate percentages, discounts, increases and VAT instantly. Dark and light themes. English and Turkish.";
  return { metadataBase: origin, title, description,
    openGraph: { title, description, type: "website", locale: "en_US", alternateLocale: ["tr_TR"], images: [{ url: new URL("/banner.png", origin).href, width: 1774, height: 887, alt: "Kolay Hesap — Less effort. More clarity." }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/banner.png", origin).href] },
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script src="/preferences.js" /></head><body>{children}</body></html>;
}
