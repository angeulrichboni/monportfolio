import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { I18nProvider } from "../components/I18nProvider";

export const metadata: Metadata = {
  title: "Portfolio | BONI Acobe Ange Ulrich",
  description:
    "Étudiant en dernière année de cycle ingénieur en Data Science & IA, spécialisé en Big Data et Data Engineering.",
  metadataBase: new URL("https://example.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SSR: read language cookie, default to 'fr'
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value as "fr" | "en") ?? "fr";
  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`bg-background text-foreground antialiased`}>
        <I18nProvider initialLang={lang}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
