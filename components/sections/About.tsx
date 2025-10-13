"use client";
import { useI18n } from "../I18nProvider";

export function About() {
  const { t } = useI18n();
  return (
    <div className="space-y-8">
      {/* Intro centered */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <p>{t("about.intro1")}</p>
        <p>{t("about.intro2")}</p>
      </div>

      {/* Info row aligned */}
      <ul className="grid gap-3 sm:grid-cols-3 text-sm max-w-4xl mx-auto">
        <li className="card p-4 text-center">
          <div className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{t("about.info.specialization")}</div>
          <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>{t("about.info.specialization.value")}</div>
        </li>
        <li className="card p-4 text-center">
          <div className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{t("about.info.interests")}</div>
          <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>{t("about.info.interests.value")}</div>
        </li>
        <li className="card p-4 text-center">
          <div className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{t("about.info.location")}</div>
          <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>{t("about.info.location.value")}</div>
        </li>
      </ul>

      {/* Academic parcours as horizontal cards */}
      <div className="card p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-50 text-center">{t("about.academic.title")}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-semibold">{t("about.academic.item1.title")}</div>
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>{t("about.academic.item1.school")}</div>
            <p className="text-sm mt-1">{t("about.academic.item1.desc")}</p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-semibold">{t("about.academic.item2.title")}</div>
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>{t("about.academic.item2.school")}</div>
            <p className="text-sm mt-1">{t("about.academic.item2.desc")}</p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-semibold">{t("about.academic.item3.title")}</div>
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>{t("about.academic.item3.school")}</div>
            <p className="text-sm mt-1">{t("about.academic.item3.desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
