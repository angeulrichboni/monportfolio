"use client";
import Link from "next/link";
import { certifications } from "../../data/certifications";
import { useI18n } from "../I18nProvider";

export function Certifications() {
  const { t, lang } = useI18n();

  function pick(value: unknown): string {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const v = value as Record<string, unknown>;
      const localized = v[lang];
      if (typeof localized === "string") return localized;
      const fr = v["fr"];
      if (typeof fr === "string") return fr;
    }
    return "";
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((c, i) => (
        <article key={`${pick(c.name)}-${i}`} className="group relative bg-white rounded-2xl p-1 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
          {/* Decorative gradient border effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-sky-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

          <div className="relative h-full bg-white rounded-xl p-6 flex flex-col">
            <header className="flex items-start justify-between mb-4">
              {c.logo_url ? (
                <div className="h-14 w-14 rounded-xl border border-slate-100 bg-white p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo_url}
                    alt={pick(c.organization)}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>
              ) : (
                <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  📜
                </div>
              )}
              {/* Verified Badge Icon */}
              <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
            </header>

            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-700 transition-colors">
              {pick(c.name)}
            </h3>

            <p className="text-sm font-medium text-slate-500 mb-6 flex-1">
              {pick(c.organization)}
              <span className="block text-xs text-slate-400 mt-1 font-normal">
                {c.issued_date}
              </span>
            </p>

            {c.credential_url && (
              <Link
                href={c.credential_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-lg bg-slate-50 text-slate-700 text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
              >
                {t("certifications.view")}
                <svg className="w-4 h-4 ml-1.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}