"use client";
import { experiences } from "../../data/experiences";
import { useI18n } from "../I18nProvider";

function pick(value: unknown, lang: "fr" | "en"): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    return (v[lang] as string) || (v["fr"] as string) || "";
  }
  return "";
}

export function Experience() {
  const { t, lang } = useI18n();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {experiences.map((e, idx) => (
        <div key={`${e.company}-${idx}`} className="relative group">
          {/* Ligne verticale */}
          {idx !== experiences.length - 1 && (
            <div className="absolute left-[28px] top-12 bottom-[-48px] w-0.5 bg-slate-200 group-hover:bg-blue-200 transition-colors" />
          )}

          <div className="flex gap-6 sm:gap-8 items-start">
            {/* Logo/Icon placeholder */}
            <div className="relative z-10 flex-shrink-0 h-14 w-14 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center text-2xl group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300">
               🏢
            </div>

            <div className="flex-1 card-clean p-6 bg-white hover:border-blue-300">
              <header className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {pick(e.role, lang)}
                  </h3>
                  <div className="text-lg font-medium text-blue-600">
                    {pick(e.company, lang)}
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                  {e.start} – {e.end ?? t("experience.present")}
                </span>
              </header>

              <ul className="space-y-2 mb-4">
                {e.missions.map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>{pick(m, lang)}</span>
                  </li>
                ))}
              </ul>

              {e.stack && (
                <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap gap-2">
                  {e.stack.map(s => (
                     <span key={s} className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                       {s}
                     </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}