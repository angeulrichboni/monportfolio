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
    <div className="container px-6">
      <Link href="/#projets" className="text-sm text-sky-700">{t("project.backToProjects")}</Link>
      <h1 className="mt-2 font-display text-3xl font-bold">{pick(project.title as unknown, lang)}</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-300">{pick(project.description as unknown, lang)}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {project.media && project.media.length > 0 && (
            <div className="card">
              <h3 className="font-semibold">{t("project.gallery")}</h3>
              <MediaGallery media={project.media as MediaItem[]} title={project.title as Localized} />
            </div>
          )}
          <div className="card">
            <h2 className="font-semibold">{t("project.context")}</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              {pick(project.content as unknown, lang) || t("project.context.placeholder")}
            </p>
          </div>
        </div>
        <aside className="space-y-4">
          {project.isteam && project.team && project.team.length > 0 && (
            <div className="card">
              <h3 className="font-semibold">{t("project.team")}</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {project.team.map((m) => (
                  <li key={m.name} className="flex flex-col">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 flex gap-3">
                      {m.github && (
                        <Link href={m.github} target="_blank" className="hover:text-sky-600">{t("project.github")}</Link>
                      )}
                      {m.portfolio && (
                        <Link href={m.portfolio} target="_blank" className="hover:text-sky-600">{t("project.portfolio")}</Link>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="card">
            <h3 className="font-semibold">{t("project.stack")}</h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs">
              {project.stack.map((s) => (
                <li key={s} className="px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="font-semibold">{t("project.links")}</h3>
            <div className="mt-2 flex gap-2">
              {project.github && (
                <Link href={project.github} target="_blank" className="btn btn-outline">
                  {t("project.github")}
                </Link>
              )}
              {project.demo && (
                <Link href={project.demo} target="_blank" className="btn btn-outline">
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
