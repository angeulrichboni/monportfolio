"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when switching to md+ viewport
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      // @ts-ignore for older browsers
      mql.addListener(handler);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        // @ts-ignore for older browsers
        mql.removeListener(handler);
      }
    };
  }, []);

  const { lang, setLang, t } = useI18n();

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-40 border-b h-16 " +
        (scrolled
          ? "border-gray-200 dark:border-gray-800"
          : "border-transparent")
      }
    >
      {/* Background image layer */}
      <div
        aria-hidden
        className={
          "absolute inset-0 -z-10 bg-center bg-cover transition-opacity duration-500 " +
          (scrolled ? "opacity-70" : "opacity-100")
        }
        style={{ backgroundImage: "url('/header-bg.jpg')" }}
      />
      {/* Color and blur overlay to ensure readability */}
      <div
        aria-hidden
        className={
          "absolute inset-0 -z-10 transition-colors duration-500 " +
          (scrolled
            ? "bg-white/70 dark:bg-[#0b1220]/70 backdrop-blur"
            : "bg-sky-50/80 dark:bg-sky-950/30")
        }
      />

      <div className="relative container h-full flex items-center justify-between px-6">
        <Link href="#accueil" className="font-display font-bold text-sky-700">B.A.A.U</Link>
        <nav className="hidden md:flex gap-5 text-sm text-gray-700 dark:text-gray-300">
          <Link href="#a-propos" className="hover:text-sky-600">{t("header.about")}</Link>
          <Link href="#competences" className="hover:text-sky-600">{t("header.skills")}</Link>
          <Link href="#projets" className="hover:text-sky-600">{t("header.projects")}</Link>
          <Link href="#experiences" className="hover:text-sky-600">{t("header.experience")}</Link>
          <Link href="#certifications" className="hover:text-sky-600">{t("header.certifications")}</Link>
          <Link href="#contact" className="hover:text-sky-600">{t("header.contact")}</Link>
        </nav>
        {/* Language selector */}
        <div className="ml-4">
          <select
            value={lang}
            onChange={e => setLang(e.target.value as "fr" | "en")}
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
            aria-label="Choisir la langue"
          >
            <option value="fr">{t("lang.fr")}</option>
            <option value="en">{t("lang.en")}</option>
          </select>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <span className="sr-only">Menu</span>
          <svg
            className={`h-6 w-6 transition-transform ${menuOpen ? "rotate-90" : "rotate-0"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay and panel */}
      {/* Backdrop overlay to close menu on click */}
      <button
        type="button"
        aria-hidden
        onClick={() => setMenuOpen(false)}
        className={
          "md:hidden fixed inset-0 z-40 bg-black/30 transition-opacity " +
          (menuOpen ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      />

      <div
        id="mobile-menu"
        className={
          "md:hidden fixed top-16 left-0 right-0 z-50 origin-top transition-all duration-200 " +
          (menuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none")
        }
      >
        <div className="mx-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0b1220]/90 backdrop-blur shadow-lg p-4">
          <div className="flex flex-col gap-3 text-gray-800 dark:text-gray-200 text-sm">
            <Link href="#a-propos" onClick={() => setMenuOpen(false)} className="hover:text-sky-600">{t("header.about")}</Link>
            <Link href="#competences" onClick={() => setMenuOpen(false)} className="hover:text-sky-600">{t("header.skills")}</Link>
            <Link href="#projets" onClick={() => setMenuOpen(false)} className="hover:text-sky-600">{t("header.projects")}</Link>
            <Link href="#experiences" onClick={() => setMenuOpen(false)} className="hover:text-sky-600">{t("header.experience")}</Link>
            <Link href="#certifications" onClick={() => setMenuOpen(false)} className="hover:text-sky-600">{t("header.certifications")}</Link>
            <Link href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-sky-600">{t("header.contact")}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
