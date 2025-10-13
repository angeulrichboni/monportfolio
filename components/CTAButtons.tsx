"use client";
import Link from "next/link";
import { useI18n } from "./I18nProvider";

export function CTAButtons() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/cv.pdf" className="btn btn-primary" prefetch={false}>
        {t("cta.downloadCv")}
      </Link>
      <Link
        href="https://github.com/angeulrichboni"
        className="btn btn-outline"
        target="_blank"
        rel="noreferrer"
        prefetch={false}
      >
        GitHub
      </Link>
      <Link
        href="https://www.linkedin.com/in/acobe-ange-ulrich-boni/"
        className="btn btn-outline"
        target="_blank"
        rel="noreferrer"
        prefetch={false}
      >
        LinkedIn
      </Link>
    </div>
  );
}
