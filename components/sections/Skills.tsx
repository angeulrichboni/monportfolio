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

export function Skills() {
  const { t } = useI18n();
  const grouped = groupByCategory(skills);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {categories.map((cat) => {
        const list = grouped[cat as Skill["category"]] ?? [];
        if (!list.length) return null;
        const ordered = [...list].sort((a, b) => (b.level ?? 0) - (a.level ?? 0));

        return (
          <div key={cat} className="card-clean p-6 sm:p-8 bg-white">
            <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              {t(`skills.category.${cat}`)}
            </h3>
            <div className="space-y-5">
              {ordered.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{s.name}</span>
                    <span className="text-xs font-medium text-slate-400">{s.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}