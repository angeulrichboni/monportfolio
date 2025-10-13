"use client";
import Link from "next/link";
import { useI18n } from "./I18nProvider";

export function SiteFooter() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-6 py-8 text-sm text-gray-600 dark:text-gray-300 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
  <p>© {new Date().getFullYear()} Acobe Ange Ulrich BONI. {t("footer.rights")}</p>
        <div className="flex gap-3">
          <Link href="https://github.com/angeulrichboni" target="_blank" className="hover:text-sky-600">GitHub</Link>
          <Link href="https://www.linkedin.com/in/acobe-ange-ulrich-boni/" target="_blank" className="hover:text-sky-600">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
