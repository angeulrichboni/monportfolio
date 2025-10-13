"use client";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}>;

export function Section({ id, title, subtitle, className, children }: Props) {
  return (
    <section id={id} className={`section ${className ?? ""}`}>
      <div className="container px-6">
        {(title || subtitle) && (
          <header className="section-header mb-8 text-center">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-gray-50">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
            )}
            <div className="mt-4 flex justify-center">
              <span className="inline-block h-1 w-16 rounded bg-sky-500/70"></span>
            </div>
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
