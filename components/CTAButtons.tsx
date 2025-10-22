"use client";
import { useI18n } from "./I18nProvider";

export function CTAButtons() {
  const { t, lang } = useI18n();
  const cvUrl =
    lang === "fr"
      ? "https://drive.google.com/file/d/1ixAWV4ogPEmDne-Af-qwZAJGpcdR3eSi/view?usp=sharing"
      : "https://drive.google.com/file/d/16tiHoI8p2J-m_d6MTv8N6WNBmyRxu5UE/view?usp=sharing";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={cvUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
        {t("cta.downloadCv")}
      </a>
      <a
        href="https://github.com/angeulrichboni"
        className="btn btn-outline"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/acobe-ange-ulrich-boni/"
        className="btn btn-outline"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}
