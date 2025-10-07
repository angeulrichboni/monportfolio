export type Skill = {
  name: string;
  level?: number; // 0..100
  category:
    | "Langages"
    | "Big Data & Streaming"
    | "Cloud"
    | "Bases de données"
    | "Outils"
    | "Orchestration & MLOps"
    | "DevOps & Containers"
    | "Cloud & Data";
};


export const skills: Skill[] = [
  { name: "Python", level: 70, category: "Langages" },
  { name: "SQL", level: 80, category: "Langages" },
  { name: "Java", level: 40, category: "Langages" },

  { name: "Apache Spark", level: 60, category: "Big Data & Streaming" },
  { name: "Apache Airflow", level: 75, category: "Orchestration & MLOps" },

  { name: "Docker", level: 70, category: "DevOps & Containers" },
  { name: "Git", level: 70, category: "DevOps & Containers" },

  { name: "Azure (App Services, SQL DB)", level: 65, category: "Cloud & Data" },
  { name: "AWS (EC2, S3, IAM)", level: 55, category: "Cloud & Data" },
  { name: "MinIO (S3-compatible)", level: 60, category: "Cloud & Data" },

  { name: "PostgreSQL", level: 60, category: "Bases de données" },
  { name: "MongoDB", level: 50, category: "Bases de données" },
];
