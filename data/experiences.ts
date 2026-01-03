export type Localized = string | { fr: string; en: string };

export type ExperienceItem = {
  id?: string;
  title: Localized;     // Was role
  company: Localized;
  start_date: string;   // Was start (YYYY-MM-DD or YYYY-MM)
  end_date?: string;    // Was end
  description: Localized[]; // Was missions (kept as array but named description to map loosely to jsonb)
  technologies?: string[];  // Was stack
  // logo?: string; 
};

export const experiences: ExperienceItem[] = [
  {
    title: { fr: "Stagiaire IA Engineer", en: "AI Engineer Intern" },
    company: { fr: "Twisterbird-labs", en: "Twisterbird-labs" },
    start_date: "2025-07",
    end_date: "2025-10",
    description: [
      { fr: "Automatisation des étapes de pentesting via LangGraph.", en: "Automated pentesting steps using LangGraph." },
      { fr: "Développement de workflows intelligents pour améliorer l’efficacité des tests de sécurité.", en: "Developed intelligent workflows to improve the efficiency of security testing." },
      { fr: "Dévéloppement d’un chatbot RAG", en: "Built a RAG chatbot" }
    ],
    technologies: ["LangGraph", "Python", "Docker", "MongoDB", "ChromaDB", "Git"],
  },
  {
    title: { fr: "Stagiaire Data Analyst", en: "Data Analyst Intern" },
    company: { fr: "Mentorness", en: "Mentorness" },
    start_date: "2024-06",
    end_date: "2024-07",
    description: [
      { fr: "Analyse et visualisation de données sous SQL Server et Power BI", en: "Data analysis and visualization with SQL Server and Power BI" },
      { fr: "Utilisation de Git pour la collaboration et le partage de code", en: "Used Git for collaboration and code sharing" }
    ],
    technologies: ["Git", "SQL", "Power BI"],
  },
  {
    title: { fr: "Technicien Support Système", en: "Systems Support Technician" },
    company: { fr: "Nouvelle Parfumerie Gandour", en: "Nouvelle Parfumerie Gandour" },
    start_date: "2023-07",
    end_date: "2023-08",
    description: [
      { fr: "Monitoring des bases de données et des applications en production", en: "Monitored databases and production applications" },
      { fr: "Automatisation de déploiements de containers Docker via scripts Bash", en: "Automated Docker container deployments via Bash scripts" }
    ],
    // technologies: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    title: { fr: "Stage - Technicien Support Réseaux", en: "Intern - Network Support Technician" },
    company: { fr: "Nouvelle Parfumerie Gandour", en: "Nouvelle Parfumerie Gandour" },
    start_date: "2022-11",
    end_date: "2023-06",
    description: [
      { fr: "Gestion du câblage réseau et assistance aux utilisateurs", en: "Managed network cabling and provided user support" },
      { fr: "Configuration d’équipements réseau (IP, imprimantes, téléphones)", en: "Configured network equipment (IP, printers, phones)" }
    ],
    // technologies: ["Databricks", "SQL", "Delta Lake"],
  },

];
