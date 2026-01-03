import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LayoutWrapper } from "../components/LayoutWrapper";
import { I18nProvider } from "../components/I18nProvider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Ulrich Boni | Portfolio",
    template: "%s | Ulrich Boni",
  },
  description:
    "Étudiant en dernière année de cycle ingénieur en Data Science & IA, spécialisé en Big Data et Data Engineering.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/big_data_favicon.svg",
  },
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
    <html lang={lang} className={`${montserrat.variable} ${openSans.variable} scroll-smooth`}>
      <body className={`bg-background text-foreground antialiased`}>
        <I18nProvider initialLang={lang}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
