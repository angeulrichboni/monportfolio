"use client";
import { PropsWithChildren } from "react";
import { useI18n } from "./I18nProvider";

type Props = PropsWithChildren<{
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  titleKey?: string;
  subtitleKey?: string;
}>;

export function Section({ id, title, subtitle, className, titleKey, subtitleKey, children }: Props) {
  const { t } = useI18n();
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedSubtitle = subtitleKey ? t(subtitleKey) : subtitle;
  return (
    <section id={id} className={`section ${className ?? ""}`}>
      <div className="container px-6">
        {(resolvedTitle || resolvedSubtitle) && (
          <header className="section-header mb-8 text-center">
            {resolvedTitle && (
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-sky-700 dark:text-sky-300">
                {resolvedTitle}
              </h2>
            )}
            {resolvedSubtitle && (
              <p className="mt-2 text-sm max-w-2xl mx-auto" style={{ color: "var(--color-muted)" }}>{resolvedSubtitle}</p>
            )}
            <div className="mt-4 flex justify-center">
              <span className="inline-block h-1 w-16 rounded bg-orange-500"></span>
            </div>
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
