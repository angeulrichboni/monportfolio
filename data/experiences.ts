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
    role: "Stagiaire IA Engineer",
    company: "Twisterbird-labs",
    start: "2025-07",
    end: "2025-10",
    missions: [
      "Automatisation des étapes de pentesting via LangGraph.",
      "Développement de workflows intelligents pour améliorer l’efficacité des tests de sécurité.",
      "Dévéloppement d’un chatbot RAG"
    ],
    stack: ["LangGraph", "Python", "Docker", "MongoDB","ChromaDB", "Git"],
  },
  {
    role: "Stagiaire Data Analyst",
    company: "Mentorness",
    start: "2024-06",
    end: "2024-07",
    missions: [
      "Analyse et visualisation de données sous SQL Server et Power BI", 
      "Utilisation de Git pour la collaboration et le partage de code"],
    stack: ["Git", "SQL", "Power BI"],
  },
  {
    role: " Technicien Support Système",
    company: "Nouvelle Parfumerie Gandour",
    start: "2023-07",
    end: "2023-08",
    missions: [
      " Monitoring des bases de données et des applications en production", 
      " Automatisation de déploiements de containers Docker via scripts Bash"],
    // stack: ["Databricks", "SQL", "Delta Lake"],
  },
  {
    role: "Stage - Technicien Support Réseaux",
    company: "Nouvelle Parfumerie Gandour",
    start: "2022-11",
    end: "2023-06",
    missions: [
      " Gestion du câblage réseau et assistance aux utilisateurs", 
      "Configuration d’équipements réseau (IP, imprimantes, téléphones)"],
    // stack: ["Databricks", "SQL", "Delta Lake"],
  },
  
];
