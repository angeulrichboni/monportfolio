"use client";
import Link from "next/link";
import { certifications } from "../../data/certifications";
import { useI18n } from "../I18nProvider";

export function Certifications() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {certifications.map((c) => (
        <article key={pick(c.title as unknown)} className="card">
          {c.logo && (
            <div className="mb-3 rounded-xl overflow-hidden border bg-white dark:bg-white/5 border-gray-200 dark:border-gray-800 p-3 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt={pick(c.org as unknown)} className="h-16 object-contain" />
            </div>
          )}
          <h3 className="font-display font-semibold">{pick(c.title as unknown)}</h3>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            {pick(c.org as unknown)} · {c.date}
          </p>
          {c.url && (
            <Link href={c.url} target="_blank" rel="noreferrer" className="btn btn-outline mt-3">
              {t("certifications.view")}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
