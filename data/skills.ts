export type Skill = {
  name: string;
  level?: number; // 0..100
  category:
    | "Data Engineering"
    | "Backend / API"
    | "Linux / Admin système"
    | "DevOps / Cloud"
    // | "Outils"
    // | "Orchestration & MLOps"
    // | "DevOps & Containers"
    // | "Cloud & Data";
};


export const skills: Skill[] = [
  { name: "Python", level: 70, category: "Data Engineering" },
  { name: "SQL", level: 80, category: "Data Engineering" },
  { name: "Java", level: 40, category: "Data Engineering" },
  { name: "Apache Spark", level: 60, category: "Data Engineering" },
  { name: "Apache Airflow", level: 75, category: "Data Engineering" },
  { name: "PostgreSQL", level: 60, category: "Data Engineering" },
  { name: "MongoDB", level: 50, category: "Data Engineering" },
  { name: "LangGraph / RAG", level: 50, category: "Data Engineering" },

  { name: "Django REST Framework", level: 50, category: "Backend / API" },
  { name: "FastAPI", level: 50, category: "Backend / API" },
  { name: ".NET API REST", level: 65, category: "Backend / API" },
  // { name: "Redis", level: 50, category: "Backend / API" },
  { name: "Auth / JWT / OAuth2", level: 50, category: "Backend / API" },
  { name: "Laravel", level: 60, category: "Backend / API" },


  { name: "Docker", level: 70, category: "DevOps / Cloud" },
  { name: "Git", level: 70, category: "DevOps / Cloud" },
  { name: "Azure (SQL DB, VM)", level: 65, category: "DevOps / Cloud" },
  { name: "AWS (EC2, S3, IAM, VPC)", level: 55, category: "DevOps / Cloud" },
  { name: "MinIO (S3-compatible)", level: 60, category: "DevOps / Cloud" },

  
];
