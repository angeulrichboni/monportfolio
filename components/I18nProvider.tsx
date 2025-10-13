"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Use static ESM imports so Turbopack can track JSON modules for HMR correctly.
import enMessages from "../locales/en.json" assert { type: "json" };
import frMessages from "../locales/fr.json" assert { type: "json" };

export type Lang = "fr" | "en";

interface I18nContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

function loadMessages(lang: Lang): Record<string, string> {
  return lang === "en" ? (enMessages as unknown as Record<string, string>) : (frMessages as unknown as Record<string, string>);
}

export const I18nProvider = ({ children, initialLang = "fr" }: { children: ReactNode; initialLang?: Lang }) => {
  // Initialize with SSR-provided lang to avoid hydration mismatches.
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [messages, setMessages] = useState<Record<string, string>>(loadMessages(lang));

  // After mount, sync language from localStorage (client preference) and update HTML lang.
  useEffect(() => {
    try {
      // Prefer cookie if present (shared across pages/SSR), fallback to localStorage
      const cookieLang = document.cookie
        .split("; ")
        .find((row) => row.startsWith("lang="))
        ?.split("=")[1] as Lang | undefined;
      const stored = localStorage.getItem("lang") as Lang | null;
      const preferred = (cookieLang ?? stored ?? initialLang) as Lang;
      if (preferred && preferred !== lang) {
        setLangState(preferred);
      } else {
        // Ensure html lang is correct on first mount
        document.documentElement.setAttribute("lang", lang);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMessages(loadMessages(lang));
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      // Also set cookie for SSR and cross-page propagation
      try {
        document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch {}
      try {
        document.documentElement.setAttribute("lang", lang);
      } catch {}
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    // Synchronously persist language to avoid race conditions with Next.js prefetch
    try {
      if (typeof document !== "undefined") {
        document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
        document.documentElement.setAttribute("lang", l);
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("lang", l);
      }
    } catch {}
    setLangState(l);
  };
  const t = (key: string) => messages[key] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
