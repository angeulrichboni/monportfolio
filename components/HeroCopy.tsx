"use client";

import { useI18n } from "./I18nProvider";

export function HeroCopy() {
  const { t } = useI18n();
  return (
    <>
      <p className="text-sm uppercase tracking-widest text-sky-600 font-semibold">
        {t("hero.subtitle")}
      </p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-gray-50">
        BONI Acobe Ange Ulrich
      </h1>
      <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-gray-50">
        {t("hero.title")}
      </h2>
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-prose">
        {t("hero.description")}
      </p>
    </>
  );
}
