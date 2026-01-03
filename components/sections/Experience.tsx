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
    <div className="max-w-4xl mx-auto">
      <div className="relative space-y-8 pl-8 sm:pl-0 sm:space-y-12">
        {/* Continuous Line */}
        <div className="absolute left-[39px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-200 to-slate-100 transform sm:-translate-x-1/2 hidden sm:block" />
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-200 to-slate-100 sm:hidden" />

        {experiences.map((e, idx) => (
          <div key={`${pick(e.company, lang)}-${idx}`} className={`relative flex flex-col sm:flex-row gap-8 items-center ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>

            {/* Timeline Dot */}
            <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]" />

            {/* Content Card */}
            <div className={`w-full sm:w-[calc(50%-2rem)] bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group ${idx % 2 === 0 ? 'sm:text-left' : 'sm:text-right'}`}>

              <div className={`flex flex-col gap-1 mb-4 ${idx % 2 === 0 ? 'sm:items-start' : 'sm:items-end'}`}>
                <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-1">
                  {e.start_date} – {e.end_date ?? t("experience.present")}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {pick(e.title, lang)}
                </h3>
                <div className="text-lg font-medium text-slate-600 flex items-center gap-2">
                  {idx % 2 !== 0 && <span>🏢</span>}
                  {pick(e.company, lang)}
                  {idx % 2 === 0 && <span>🏢</span>}
                </div>
              </div>

              <ul className={`space-y-2 mb-5 ${idx % 2 === 0 ? '' : 'sm:flex sm:flex-col sm:items-end'}`}>
                {e.description.map((m, i) => (
                  <li key={i} className="text-slate-600 text-sm leading-relaxed relative pl-4 sm:pl-0 sm:inline-block">
                    {/* Bullet only on mobile or if aligned left */}
                    <span className={`hidden sm:hidden ${idx % 2 === 0 ? 'sm:block sm:absolute sm:left-0 sm:top-2 sm:h-1.5 sm:w-1.5 sm:rounded-full sm:bg-blue-300' : ''}`} />
                    {/* Mobile bullet */}
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-blue-300 sm:hidden" />
                    {pick(m, lang)}
                  </li>
                ))}
              </ul>

              {e.technologies && (
                <div className={`flex flex-wrap gap-2 pt-4 border-t border-slate-50 ${idx % 2 === 0 ? 'justify-start' : 'justify-start sm:justify-end'}`}>
                  {e.technologies.map(s => (
                    <span key={s} className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Spacer for the other side */}
            <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
          </div>
        ))}
      </div>
    </div>
  );
}