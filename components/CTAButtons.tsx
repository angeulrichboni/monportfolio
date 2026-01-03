"use client";
import { useI18n } from "./I18nProvider";

export function CTAButtons() {
  const { t, lang } = useI18n();
  const cvUrl = lang === "fr"
    ? "https://drive.google.com/file/d/1ixAWV4ogPEmDne-Af-qwZAJGpcdR3eSi/view?usp=sharing"
    : "https://drive.google.com/file/d/16tiHoI8p2J-m_d6MTv8N6WNBmyRxu5UE/view?usp=sharing";

  return (
    <div className="flex flex-wrap gap-4">
      <a 
        href={cvUrl} 
        className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {t("cta.downloadCv")}
      </a>
      <a
        href="https://github.com/angeulrichboni"
        className="px-8 py-3.5 rounded-full bg-white text-slate-700 font-bold border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/acobe-ange-ulrich-boni/"
        className="px-8 py-3.5 rounded-full bg-white text-slate-700 font-bold border border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}