export function About() {
  return (
    <div className="grid gap-6 md:grid-cols-3 items-start">
      <div className="md:col-span-2 space-y-3">
        <p>
          Étudiant en dernière année de cycle ingénieur en Data Science & IA, je me
          spécialise en Big Data et Data Engineering. Passionné par les
          architectures distribuées et les pipelines de données fiables.
        </p>
        <p>
          Objectif: construire et opérer des plateformes data scalables, de
          l’ingestion au serving, avec qualité, sécurité et coût maîtrisé.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>Spécialisation: Big Data / Data Engineering</li>
          <li>Centres d’intérêt: ETL, Data Lake, DW, MLOps</li>
          <li>Localisation: Tunisie</li>
        </ul>
      </div>
      <div className="card p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-50">Parcours académique</h3>
        <ol className="mt-4 space-y-4 text-gray-700 dark:text-gray-300">
          <li className="relative pl-6">
            <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-orange-500" />
            <div className="font-semibold">Cycle Ingénieur – Data Science & IA</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">TEK-UP — 2023–2026</div>
            <p className="text-sm">Majeure Big Data. Projets: pipelines distribués, Data Lakehouse, orchestration.</p>
          </li>
          <li className="relative pl-6">
            <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-orange-500" />
            <div className="font-semibold">Licence Professionnelle — Réseaux et Télécommunications</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">ESATIC — 2019–2022</div>
            <p className="text-sm">Algorithmes, structures de données, bases de données, Reseaux.</p>
          </li>
          <li className="relative pl-6">
            <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-orange-500" />
            <div className="font-semibold">Baccalauréat — Série scientifique</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lycée — 2018–2019</div>
            <p className="text-sm">Maths, physique, Sciences de la vie.</p>
          </li>
        </ol>
      </div>
    </div>
  );
}
