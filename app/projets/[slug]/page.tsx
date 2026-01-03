import Link from "next/link";
import { cookies } from "next/headers";
import frMessages from "../../../locales/fr.json" assert { type: "json" };
import enMessages from "../../../locales/en.json" assert { type: "json" };
import { projects } from "../../../data/projects";
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
  const dict = (lang === "en" ? (enMessages as unknown) : (frMessages as unknown)) as Dict;
  
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
  const dict = (lang === "en" ? (enMessages as unknown) : (frMessages as unknown)) as Dict;
  
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="py-32 bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-100">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
          <h2 className="text-xl font-bold text-slate-800 mb-4">{tKey(dict, "project.notFound.title")}</h2>
          <p className="text-slate-600 mb-8">{tKey(dict, "project.notFound.description")}</p>
          <Link 
            href="/#projets" 
            className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
          >
            {tKey(dict, "project.backToProjects")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <ProjectDetailsClient project={project} />
    </main>
  );
}