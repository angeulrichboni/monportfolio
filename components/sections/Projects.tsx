"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "../../data/projects";

export function Projects() {
  const initialCount = 6;
  const hasMore = projects.length > initialCount;
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const visible = showAll || !hasMore ? projects : projects.slice(0, initialCount);

  return (
    <>
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, idx) => (
        <article key={`${p.slug}-${idx}`} className="card hover:shadow-lg transition-shadow p-0 overflow-hidden">
          {p.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover" />
          )}
          <div className="p-4">
            <h3 className="font-display font-semibold text-lg">{p.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {p.description}
            </p>
           <ul className="mt-3 flex flex-wrap gap-2 text-xs text-sky-700 dark:text-sky-300">
             {p.stack.map((s, si) => (
               <li key={`${s}-${si}`} className="px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Link href={`/projets/${p.slug}`} className="btn btn-outline">
              Voir détails
            </Link>
            {p.github && (
              <Link href={p.github} className="btn btn-outline" target="_blank" rel="noreferrer">
                GitHub
              </Link>
            )}
          </div>
          </div>
        </article>
        ))}
      </div>
      {hasMore && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              if (showAll) {
                setShowAll(false);
                // Scroll back to the grid top when collapsing
                gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                setShowAll(true);
              }
            }}
            aria-expanded={showAll}
            className="btn btn-outline w-full justify-center"
          >
            {showAll ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
    </>
  );
}
