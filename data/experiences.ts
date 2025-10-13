export type Localized = string | { fr: string; en: string };

export type ExperienceItem = {
  role: Localized;
  company: Localized;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM
  missions: Localized[];
  stack?: string[];
  logo?: string; // path in /public
};

export const experiences: ExperienceItem[] = [
  {
    role: { fr: "Stagiaire IA Engineer", en: "AI Engineer Intern" },
    company: { fr: "Twisterbird-labs", en: "Twisterbird-labs" },
    start: "2025-07",
    end: "2025-10",
    missions: [
      { fr: "Automatisation des étapes de pentesting via LangGraph.", en: "Automated pentesting steps using LangGraph." },
      { fr: "Développement de workflows intelligents pour améliorer l’efficacité des tests de sécurité.", en: "Developed intelligent workflows to improve the efficiency of security testing." },
      { fr: "Dévéloppement d’un chatbot RAG", en: "Built a RAG chatbot" }
    ],
    stack: ["LangGraph", "Python", "Docker", "MongoDB","ChromaDB", "Git"],
  },
  {
    role: { fr: "Stagiaire Data Analyst", en: "Data Analyst Intern" },
    company: { fr: "Mentorness", en: "Mentorness" },
    start: "2024-06",
    end: "2024-07",
    missions: [
      { fr: "Analyse et visualisation de données sous SQL Server et Power BI", en: "Data analysis and visualization with SQL Server and Power BI" },
      { fr: "Utilisation de Git pour la collaboration et le partage de code", en: "Used Git for collaboration and code sharing" }
    ],
    stack: ["Git", "SQL", "Power BI"],
  },
  {
    role: { fr: "Technicien Support Système", en: "Systems Support Technician" },
    company: { fr: "Nouvelle Parfumerie Gandour", en: "Nouvelle Parfumerie Gandour" },
    start: "2023-07",
    end: "2023-08",
    missions: [
      { fr: "Monitoring des bases de données et des applications en production", en: "Monitored databases and production applications" },
      { fr: "Automatisation de déploiements de containers Docker via scripts Bash", en: "Automated Docker container deployments via Bash scripts" }
    ],
    // stack: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    role: { fr: "Stage - Technicien Support Réseaux", en: "Intern - Network Support Technician" },
    company: { fr: "Nouvelle Parfumerie Gandour", en: "Nouvelle Parfumerie Gandour" },
    start: "2022-11",
    end: "2023-06",
    missions: [
      { fr: "Gestion du câblage réseau et assistance aux utilisateurs", en: "Managed network cabling and provided user support" },
      { fr: "Configuration d’équipements réseau (IP, imprimantes, téléphones)", en: "Configured network equipment (IP, printers, phones)" }
    ],
    // stack: ["Databricks", "SQL", "Delta Lake"],
  },
  
];
