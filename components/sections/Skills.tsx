"use client";
import { skills, type Skill } from "../../data/skills";
import { useI18n } from "../I18nProvider";

const categories = [
  "Data Engineering",
  "Backend / API",
  "Linux / Admin système",
  "DevOps / Cloud"
] as const;

type Grouped = Record<Skill["category"], Skill[]>;

function groupByCategory(list: Skill[]): Grouped {
  return list.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {} as Grouped);
}

const getLevelColor = (level: number) => {
  if (level >= 75) return "bg-emerald-500";
  if (level >= 50) return "bg-amber-500";
  return "bg-red-500";
};

export function Skills() {
  const { t } = useI18n();
  const grouped = groupByCategory(skills);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => {
        const list = grouped[cat as Skill["category"]] ?? [];
        if (!list.length) return null;
        // Tri par niveau décroissant
        const ordered = [...list].sort((a, b) => (b.level ?? 0) - (a.level ?? 0));

        return (
          <div key={cat} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {/* Icône basée sur la catégorie (simplifié) */}
                {cat === "Data Engineering" && "📊"}
                {cat === "Backend / API" && "⚙️"}
                {cat === "Linux / Admin système" && "🐧"}
                {cat === "DevOps / Cloud" && "☁️"}
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {t(`skills.category.${cat}`)}
              </h3>
            </div>

            <div className="space-y-5">
              {ordered.map((s) => {
                const colorClass = getLevelColor(s.level ?? 0);
                return (
                  <div key={s.name} className="relative">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="font-semibold text-slate-700 text-xs sm:text-sm">{s.name}</span>
                      <span className={`font-bold text-xs ${colorClass.replace('bg-', 'text-')}`}>{s.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}