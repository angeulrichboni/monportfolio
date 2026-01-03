"use client";
import { useI18n } from "./I18nProvider";

export function HeroCopy() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase tracking-wide">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        {t("hero.subtitle")}
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
          BONI Acobe <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
            Ange Ulrich
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-slate-500">
          {t("hero.title")}
        </h2>
      </div>

      <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
        {t("hero.description")}
      </p>
    </div>
  );
}