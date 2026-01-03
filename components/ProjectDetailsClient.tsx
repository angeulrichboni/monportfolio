"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";
import { MediaGallery, Localized, MediaItem } from "./MediaGallery";
import type { Project } from "../data/projects";

function pick(value: unknown, lang: "fr" | "en"): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    const localized = v[lang];
    if (typeof localized === "string") return localized;
    const fr = v["fr"];
    if (typeof fr === "string") return fr;
  }
  return "";
}

export function ProjectDetailsClient({ project }: { project: Project }) {
  const { t, lang } = useI18n();

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <Link 
        href="/#projets" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> {t("project.backToProjects")}
      </Link>
      
      <header className="mb-10 border-b border-slate-200 pb-10">
        <h1 className="font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
          {pick(project.title, lang)}
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          {pick(project.description, lang)}
        </p>
      </header>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {project.media && project.media.length > 0 && (
            <div className="card-clean p-1 border-none shadow-none bg-transparent">
              <h3 className="font-bold text-lg text-slate-900 mb-2 px-1">{t("project.gallery")}</h3>
              <MediaGallery media={project.media as MediaItem[]} title={project.title as Localized} />
            </div>
          )}
          
          <div className="card-clean p-6 sm:p-8 bg-white">
            <h2 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
              📄 {t("project.context")}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
               {/* Note: si le contenu est du texte brut, l'afficher dans un P est ok. S'il y a des sauts de ligne, whitespace-pre-line aide */}
               <p className="whitespace-pre-line">
                 {pick(project.content, lang) || t("project.context.placeholder")}
               </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 h-fit lg:sticky lg:top-24">
          {/* Team */}
          {project.isteam && project.team && project.team.length > 0 && (
            <div className="card-clean p-6 bg-white">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">👥 {t("project.team")}</h3>
              <ul className="space-y-4">
                {project.team.map((m) => (
                  <li key={m.name} className="flex flex-col pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                    <span className="font-semibold text-slate-800">{m.name}</span>
                    <span className="text-xs text-slate-500 flex gap-3 mt-1">
                      {m.github && (
                        <Link href={m.github} target="_blank" className="hover:text-blue-600 hover:underline">GitHub</Link>
                      )}
                      {m.portfolio && (
                        <Link href={m.portfolio} target="_blank" className="hover:text-blue-600 hover:underline">Portfolio</Link>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack */}
          <div className="card-clean p-6 bg-white">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">🛠 {t("project.stack")}</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="card-clean p-6 bg-white">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">🔗 {t("project.links")}</h3>
            <div className="flex flex-col gap-3">
              {project.github && (
                <Link 
                  href={project.github} 
                  target="_blank" 
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  {t("project.github")}
                </Link>
              )}
              {project.demo && (
                <Link 
                  href={project.demo} 
                  target="_blank" 
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  {t("project.demo")}
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}