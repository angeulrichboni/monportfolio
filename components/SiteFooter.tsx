"use client";
import Link from "next/link";
import { useI18n } from "./I18nProvider";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-6 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm">
        <p className="text-slate-500">
          © {new Date().getFullYear()} <span className="font-semibold text-slate-700">Acobe Ange Ulrich BONI</span>. {t("footer.rights")}
        </p>
        <div className="flex gap-6 font-medium">
          <Link href="https://github.com/angeulrichboni" target="_blank" className="text-slate-500 hover:text-blue-600 transition-colors">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/acobe-ange-ulrich-boni/" target="_blank" className="text-slate-500 hover:text-blue-600 transition-colors">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}