import { skills, type Skill } from "../../data/skills";

const categories = [
  "Langages",
  "Big Data & Streaming",
  "Cloud",
  "Bases de données",
  "Outils",
  "Orchestration & MLOps",
  "DevOps & Containers",
  "Cloud & Data",
] as const;

type Grouped = Record<Skill["category"], Skill[]>;

function groupByCategory(list: Skill[]): Grouped {
  return list.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {} as Grouped);
}

function barColor(level = 0) {
  if (level >= 75) return "bg-sky-600";
  if (level >= 50) return "bg-sky-500";
  return "bg-sky-400";
}

export function Skills() {
  const grouped = groupByCategory(skills);

  return (
    <div className="flex flex-wrap gap-6 items-stretch">
      {categories.map((cat) => {
        const list = grouped[cat as Skill["category"]] ?? [];
        if (!list.length) return null;
        const ordered = [...list].sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
        return (
          <section
            key={cat}
            className="flex-1 min-w-[280px] md:min-w-[380px] max-w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/50 shadow-sm hover:shadow-md transition"
          >
            <header className="px-5 pt-5">
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-gray-50">
                {cat}
              </h3>
            </header>
            <div className="p-5 pt-4">
              <ul className="space-y-4">
                {ordered.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                        {s.name}
                      </span>
                      {typeof s.level === "number" && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                          {s.level}%
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor(s.level ?? 0)}`}
                        style={{ width: `${s.level ?? 0}%` }}
                        aria-hidden
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
