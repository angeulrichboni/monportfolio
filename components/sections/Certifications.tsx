import Link from "next/link";
import { certifications } from "../../data/certifications";

export function Certifications() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {certifications.map((c) => (
        <article key={c.title} className="card">
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
