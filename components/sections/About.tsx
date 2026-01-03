"use client";
import { useI18n } from "../I18nProvider";

export function About() {
  const { t } = useI18n();
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Colonne Texte */}
      <div className="space-y-6">
        <div className="prose prose-lg text-slate-600">
          <p>{t("about.intro1")}</p>
          <p>{t("about.intro2")}</p>
        </div>

        {/* Info rapide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <InfoCard label={t("about.info.specialization")} value={t("about.info.specialization.value")} icon="💻" />
          <InfoCard label={t("about.info.interests")} value={t("about.info.interests.value")} icon="🚀" />
          <InfoCard label={t("about.info.location")} value={t("about.info.location.value")} icon="📍" />
        </div>
      </div>

      {/* Colonne Parcours Académique */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">🎓</span> {t("about.academic.title")}
        </h3>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {/* Item 1 */}
            <AcademicItem 
              title={t("about.academic.item1.title")} 
              school={t("about.academic.item1.school")}
              desc={t("about.academic.item1.desc")}
            />
            {/* Item 2 */}
            <AcademicItem 
              title={t("about.academic.item2.title")} 
              school={t("about.academic.item2.school")}
              desc={t("about.academic.item2.desc")}
            />
            {/* Item 3 */}
            <AcademicItem 
              title={t("about.academic.item3.title")} 
              school={t("about.academic.item3.school")}
              desc={t("about.academic.item3.desc")}
            />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string, value: string, icon: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">{label}</div>
      <div className="font-semibold text-slate-900 text-sm">{value}</div>
    </div>
  );
}

function AcademicItem({ title, school, desc }: { title: string, school: string, desc: string }) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow-sm ring-1 ring-slate-900/5"></span>
      <div>
        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{title}</h4>
        <div className="text-xs font-medium text-blue-600 mb-1">{school}</div>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}