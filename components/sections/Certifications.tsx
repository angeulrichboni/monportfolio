import Link from "next/link";
import { certifications } from "../../data/certifications";

export function Certifications() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {certifications.map((c) => (
        <article key={c.title} className="card">
          {c.logo && (
            <div className="mb-3 rounded-xl overflow-hidden border bg-white dark:bg-white/5 border-gray-200 dark:border-gray-800 p-3 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt={c.org} className="h-16 object-contain" />
            </div>
          )}
          <h3 className="font-display font-semibold">{c.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {c.org} · {c.date}
          </p>
          {c.url && (
            <Link href={c.url} target="_blank" rel="noreferrer" className="btn btn-outline mt-3">
              Voir
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
