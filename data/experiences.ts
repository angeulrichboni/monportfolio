export type ExperienceItem = {
  role: string;
  company: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or 'Présent'
  missions: string[];
  stack?: string[];
  logo?: string; // path in /public
};

export const experiences: ExperienceItem[] = [
  {
    role: "Stagiaire Data Engineer",
    company: "Entreprise X",
    start: "2025-02",
    end: "2025-08",
    missions: [
      "Développement de pipelines d'ingestion avec Spark",
      "Automatisation d'orchestrations Airflow",
    ],
    stack: ["Spark", "Airflow", "Docker"],
  },
  {
    role: "Projet académique Big Data",
    company: "École Y",
    start: "2024-09",
    end: "2025-01",
    missions: ["Traitement de données massives", "Optimisation de requêtes SQL"],
    stack: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    role: "Projet académique Big Data",
    company: "École Y",
    start: "2024-09",
    end: "2025-01",
    missions: ["Traitement de données massives", "Optimisation de requêtes SQL"],
    stack: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    role: "Projet académique Big Data",
    company: "École Y",
    start: "2024-09",
    end: "2025-01",
    missions: ["Traitement de données massives", "Optimisation de requêtes SQL"],
    stack: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    role: "Projet académique Big Data",
    company: "École Y",
    start: "2024-09",
    end: "2025-01",
    missions: ["Traitement de données massives", "Optimisation de requêtes SQL"],
    stack: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    role: "Projet académique Big Data",
    company: "École Y",
    start: "2024-09",
    end: "2025-01",
    missions: ["Traitement de données massives", "Optimisation de requêtes SQL"],
    stack: ["Databricks", "SQL", "Delta Lake"],
  },
];
