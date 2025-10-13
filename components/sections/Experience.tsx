"use client";
import { experiences } from "../../data/experiences";
import { useI18n } from "../I18nProvider";

function pick(value: unknown, lang: "fr" | "en"): string {
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

export function Experience() {
  const { t, lang } = useI18n();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {experiences.map((e, idx) => (
        <article key={`${e.company}-${e.role}-${e.start}-${idx}`} className="relative pl-6">
          <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-orange-500" />
          <h3 className="font-display font-semibold">
            {pick(e.role as unknown, lang)} · <span className="text-sky-700 dark:text-sky-300">{pick(e.company as unknown, lang)}</span>
          </h3>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>{e.start} – {e.end ?? t("experience.present")}</p>
          <ul className="mt-2 list-disc pl-5">
            {e.missions.map((m, i) => (
              <li key={i}>{pick(m as unknown, lang)}</li>
            ))}
          </ul>
          {e.stack && (
            <div className="mt-2 text-xs" style={{ color: "var(--color-muted)" }}>{t("experience.stack")}: {e.stack.join(", ")}</div>
          )}
        </article>
      ))}
    </div>
  );
}
