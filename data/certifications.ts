export type Certification = {
  title: string;
  org: string;
  date: string; // YYYY-MM
  logo?: string; // /public path
  url?: string; // link or PDF
};

export const certifications: Certification[] = [
  {
    title: "Databricks Lakehouse Fundamentals",
    org: "Databricks",
    date: "2025-03",
    url: "https://www.databricks.com/learn/certification/lakehouse-fundamentals",
  },
  {
    title: "Google Cloud Digital Leader",
    org: "Google Cloud",
    date: "2024-11",
  },
];
