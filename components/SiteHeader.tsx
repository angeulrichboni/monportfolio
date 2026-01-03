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

  const { lang, setLang, t } = useI18n();

  const navLinks = [
    { href: "#a-propos", label: t("header.about") },
    { href: "#competences", label: t("header.skills") },
    { href: "#projets", label: t("header.projects") },
    { href: "#experiences", label: t("header.experience") },
    { href: "#certifications", label: t("header.certifications") },
    { href: "#contact", label: t("header.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "h-20 bg-transparent"
      }`}
    >
      <div className="container mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#accueil" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
            AB
          </div>
          <span className={`font-bold text-lg tracking-tight ${scrolled ? "text-slate-900" : "text-slate-900"}`}>
            B.A.A.U
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full border border-slate-200/50 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "fr" | "en")}
              className="appearance-none bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-200 transition"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block p-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}