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
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {certifications.map((c, i) => (
        <article key={`${pick(c.title)}-${i}`} className="card-clean p-6 flex flex-col items-start bg-white h-full hover:border-blue-300">
          {c.logo && (
            <div className="mb-4 h-16 w-full rounded-lg border border-slate-100 bg-slate-50 p-2 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={c.logo} 
                alt={pick(c.org)} 
                className="max-h-full max-w-full object-contain mix-blend-multiply" 
              />
            </div>
          )}
          
          <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1">
            {pick(c.title)}
          </h3>
          
          <p className="text-sm font-medium text-slate-500 mb-4 flex-1">
            {pick(c.org)} · {c.date}
          </p>
          
          {c.url && (
            <Link 
              href={c.url} 
              target="_blank" 
              rel="noreferrer" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline decoration-blue-300 underline-offset-4 mt-auto"
            >
              {t("certifications.view")} →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}