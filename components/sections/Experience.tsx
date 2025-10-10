import { experiences } from "../../data/experiences";

export function Experience() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {experiences.map((e, idx) => (
        <article key={`${e.company}-${e.role}-${e.start}-${idx}`} className="relative pl-6">
          <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-orange-500" />
          <h3 className="font-display font-semibold">
            {e.role} · <span className="text-sky-700 dark:text-sky-300">{e.company}</span>
          </h3>
          <p className="text-sm text-gray-500">{e.start} – {e.end ?? "Présent"}</p>
          <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-200">
            {e.missions.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
          {e.stack && (
            <div className="mt-2 text-xs text-gray-500">Stack: {e.stack.join(", ")}</div>
          )}
        </article>
      ))}
    </div>
  );
}
