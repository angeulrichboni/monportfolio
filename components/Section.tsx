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
  variant?: "white" | "gray"; // Nouvelle prop pour le fond
}>;

export function Section({ 
  id, 
  title, 
  subtitle, 
  className, 
  titleKey, 
  subtitleKey, 
  variant = "white",
  children 
}: Props) {
  const { t } = useI18n();
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedSubtitle = subtitleKey ? t(subtitleKey) : subtitle;

  const bgClass = variant === "gray" ? "bg-slate-50 border-y border-slate-100" : "bg-transparent";

  return (
    <section id={id} className={`py-20 sm:py-24 ${bgClass} ${className ?? ""}`}>
      <div className="container mx-auto px-6">
        {(resolvedTitle || resolvedSubtitle) && (
          <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            {resolvedTitle && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                {resolvedTitle}
              </h2>
            )}
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-blue-600"></div>
            </div>
            {resolvedSubtitle && (
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {resolvedSubtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}