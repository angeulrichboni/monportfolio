"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { Menu, X, Github, Linkedin, Globe, Terminal } from 'lucide-react';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { lang, setLang, t } = useI18n();

  const toggleLanguage = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  const navLinks = [
    { href: "/#a-propos", label: t("header.about") }, // Absolute paths for subpage compatibility
    { href: "/#competences", label: t("header.skills") },
    { href: "/#projets", label: t("header.projects") },
    { href: "/#experiences", label: t("header.experience") },
    { href: "/#certifications", label: t("header.certifications") },
    { href: "/#contact", label: t("header.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${scrolled
        ? "border-b border-white/10 bg-black/95 backdrop-blur-lg shadow-lg h-16"
        : "border-b border-white/5 bg-black/40 backdrop-blur-md h-24"
        }`}
    >
      <div className="mx-auto h-full max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        {/* Logo - Template Style */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md group-hover:shadow-lg transition-shadow">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            aaub.ai
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-white/20">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 font-medium text-sm"
              aria-label="Switch Language"
            >
              <Globe className="h-5 w-5" />
              <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <a
              href="https://github.com/angeulrichboni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ange-ulrich-boni-057027170/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 font-medium text-sm"
          >
            <Globe className="h-5 w-5" />
            <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block p-3 rounded-xl text-gray-200 hover:bg-white/10 hover:text-white font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t border-white/20">
            <a href="https://github.com/angeulrichboni" target="_blank" className="p-2 text-gray-300 hover:text-white">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/ange-ulrich-boni-057027170/" target="_blank" className="p-2 text-gray-300 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}