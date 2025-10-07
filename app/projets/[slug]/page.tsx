import Link from "next/link";
import { projects } from "../../../data/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projet introuvable | Projets" };
  return {
    title: `${project.title} | Projets`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <main className="section">
        <div className="container px-6">
          <Link href="/#projets" className="text-sm text-sky-700">← Retour aux projets</Link>
          <h1 className="mt-2 font-display text-3xl font-bold">Projet introuvable</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">Le projet demandé n'existe pas ou a été déplacé.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container px-6">
        <Link href="/#projets" className="text-sm text-sky-700">← Retour aux projets</Link>
        <h1 className="mt-2 font-display text-3xl font-bold">{project.title}</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">{project.description}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="card">
              <h2 className="font-semibold">Contexte & Solution</h2>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                {project.content ?? "Description détaillée à venir."}
              </p>
            </div>
            {project.media && project.media.length > 0 && (
              <div className="card">
                <h3 className="font-semibold">Galerie</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {project.media.map((m, i) => (
                    m.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={m.src} alt={m.alt ?? project.title} className="w-full h-56 object-cover rounded" />
                    ) : (
                      <video key={i} controls className="w-full rounded">
                        <source src={m.src} />
                      </video>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
          <aside className="space-y-4">
            <div className="card">
              <h3 className="font-semibold">Stack</h3>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {project.stack.map((s) => (
                  <li key={s} className="px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="font-semibold">Liens</h3>
              <div className="mt-2 flex gap-2">
                {project.github && (
                  <Link href={project.github} target="_blank" className="btn btn-outline">
                    GitHub
                  </Link>
                )}
                {project.demo && (
                  <Link href={project.demo} target="_blank" className="btn btn-outline">
                    Demo
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
