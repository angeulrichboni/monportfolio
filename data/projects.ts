export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  tags?: string[];
  github?: string;
  demo?: string;
  content?: string; // markdown or plain text
  thumbnail?: string; // /public path for card image
  media?: Array<{ type: "image" | "video"; src: string; alt?: string }>;
};

export const projects: Project[] = [
  {
    slug: "pipeline-elt-spark",
    title: "Pipeline ELT distribuée avec Spark",
    description: "Ingestion, transformation et analyse de données massives avec Spark et Delta Lake.",
    stack: ["Spark", "Delta", "Databricks", "Airflow"],
    github: "https://github.com/your-username/pipeline-elt-spark",
    content:
      "Conception d'un pipeline batch/streaming, optimisation des jobs, partitionnement, Z-Ordering, et monitoring.",
    thumbnail: "/projects/spark-pipeline.jpg",
    media: [
      { type: "image", src: "/projects/spark-pipeline.jpg", alt: "Aperçu pipeline Spark" },
      { type: "image", src: "/projects/spark-dag.png", alt: "DAG orchestration" },
    ],
  },
  {
    slug: "streaming-kafka-flink",
    title: "Streaming temps réel Kafka + Flink",
    description: "Traitement d'événements, windowing et agrégations en temps réel.",
    stack: ["Kafka", "Flink", "Docker", "Grafana"],
    github: "https://github.com/your-username/streaming-kafka-flink",
    thumbnail: "/projects/kafka-flink.jpg",
  },
  {
    slug: "mlops-gcp",
    title: "MLOps sur GCP",
    description: "Déploiement et suivi de modèles avec pipelines CI/CD.",
    stack: ["GCP", "Cloud Build", "Vertex AI", "Terraform"],
    thumbnail: "/projects/mlops-gcp.jpg",
  },
];
