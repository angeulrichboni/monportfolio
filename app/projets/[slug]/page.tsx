import Link from "next/link";
import { cookies } from "next/headers";
import frMessages from "../../../locales/fr.json" assert { type: "json" };
import enMessages from "../../../locales/en.json" assert { type: "json" };
import { projects } from "../../../data/projects";
import { MediaGallery } from "../../../components/MediaGallery";
import { ProjectDetailsClient } from "../../../components/ProjectDetailsClient";

type Params = { params: Promise<{ slug: string }>; searchParams?: Promise<Record<string, string | string[] | undefined>> };

function pickSSR(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    const fr = v["fr"];
    if (typeof fr === "string") return fr;
    const en = v["en"];
    if (typeof en === "string") return en;
  }
  return "";
}

type Dict = Record<string, string>;
function tKey(dict: Dict, key: string) {
  return dict[key] ?? key;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params, searchParams }: Params) {
  const { slug } = await params;
  const q = (await searchParams) || {};
  const project = projects.find((p) => p.slug === slug);
  const cookieStore = await cookies();
  const qLang = (Array.isArray(q.lang) ? q.lang[0] : q.lang) as "fr" | "en" | undefined;
  const lang = (qLang ?? (cookieStore.get("lang")?.value as "fr" | "en")) ?? "fr";
  const dict = (lang === "en" ? (enMessages as any) : (frMessages as any)) as Dict;
  if (!project) return { title: `${tKey(dict, "project.notFound.title")} | ${tKey(dict, "section.projects.title")}` };
  return {
    title: `${pickSSR(project.title)} | ${tKey(dict, "section.projects.title")}`,
    description: pickSSR(project.description),
  };
}

export default async function ProjectPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const q = (await searchParams) || {};
  const cookieStore = await cookies();
  const qLang = (Array.isArray(q.lang) ? q.lang[0] : q.lang) as "fr" | "en" | undefined;
  const lang = (qLang ?? (cookieStore.get("lang")?.value as "fr" | "en")) ?? "fr";
  const dict = (lang === "en" ? (enMessages as any) : (frMessages as any)) as Dict;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <main className="section">
        <div className="container px-6">
          <Link href="/#projets" className="text-sm text-sky-700">{tKey(dict, "project.backToProjects")}</Link>
          <h1 className="mt-2 font-display text-3xl font-bold">{tKey(dict, "project.notFound.title")}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">{tKey(dict, "project.notFound.description")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      {/* SSR metadata + static content above could be added if needed. Render client section for live language switching. */}
      <ProjectDetailsClient project={project as any} />
    </main>
  );
}
