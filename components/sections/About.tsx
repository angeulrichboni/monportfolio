export function About() {
  return (
    <div className="space-y-8">
      {/* Intro centered */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <p>
          Étudiant en dernière année de cycle ingénieur en Data Science & IA, je me
          spécialise en Big Data et Data Engineering. Passionné par les
          architectures distribuées et les pipelines de données fiables.
        </p>
        <p>
          Objectif: construire et opérer des plateformes data scalables, de
          l’ingestion au serving, avec qualité, sécurité et coût maîtrisé.
        </p>
      </div>

      {/* Info row aligned */}
      <ul className="grid gap-3 sm:grid-cols-3 text-sm text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
        <li className="card p-4 text-center">
          <div className="text-gray-500 text-xs uppercase tracking-wide">Spécialisation</div>
          <div className="mt-1 font-medium">Big Data / Data Engineering</div>
        </li>
        <li className="card p-4 text-center">
          <div className="text-gray-500 text-xs uppercase tracking-wide">Centres d’intérêt</div>
          <div className="mt-1 font-medium">ETL, Data Lake, DW, MLOps</div>
        </li>
        <li className="card p-4 text-center">
          <div className="text-gray-500 text-xs uppercase tracking-wide">Localisation</div>
          <div className="mt-1 font-medium">Tunisie</div>
        </li>
      </ul>

      {/* Academic parcours as horizontal cards */}
      <div className="card p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-50 text-center">Parcours académique</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-semibold">Cycle Ingénieur – Data Science & IA</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">TEK-UP — 2023–2026</div>
            <p className="text-sm mt-1">Majeure Big Data. Projets: pipelines distribués, Data Lakehouse, orchestration.</p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-semibold">Licence Professionnelle — Réseaux et Télécommunications</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">ESATIC — 2019–2022</div>
            <p className="text-sm mt-1">Algorithmes, structures de données, bases de données, Reseaux.</p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-semibold">Baccalauréat — Série scientifique</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lycée — 2018–2019</div>
            <p className="text-sm mt-1">Maths, physique, Sciences de la vie.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
