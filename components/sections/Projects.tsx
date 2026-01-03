"use client";
import Link from "next/link";
import { projects } from "../../data/projects";
import { useI18n } from "../I18nProvider";

// Helper simple
function pick(value: unknown, lang: "fr" | "en"): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    return (v[lang] as string) || (v["fr"] as string) || "";
  }
  return "";
}

export function Projects() {
  const { t, lang } = useI18n();

  // Show only top 3 projects as a teaser
  const visible = projects.slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((p, idx) => (
          <article key={`${p.slug}-${idx}`} className="card-clean flex flex-col overflow-hidden h-full group">
            {p.cover_image_url ? (
              <div className="relative h-48 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover_image_url}
                  alt={pick(p.title, lang)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1 rounded-lg border border-white/50 shadow-sm">
                    {p.category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-48 bg-slate-50 flex items-center justify-center text-slate-300">
                No Image
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                {pick(p.title, lang)}
              </h3>

              <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                {pick(p.description, lang)}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.slice(0, 3).map((s) => (
                  <span key={s} className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                    {s}
                  </span>
                ))}
                {p.stack.length > 3 && (
                  <span className="px-2 py-1 rounded bg-slate-50 text-slate-400 text-xs border border-slate-100">
                    +{p.stack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                <Link
                  href={`/projets/${p.slug}?lang=${lang}`}
                  className="flex-1 text-center py-2 px-4 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
                >
                  {t("projects.viewDetails")}
                </Link>
                {p.github_url && (
                  <Link
                    href={p.github_url}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={`/projets?lang=${lang}`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 hover:bg-blue-700 transition-all"
        >
          {t("projects.viewMore")}
          <span className="text-xl">→</span>
        </Link>
      </div>
    </>
  );
}