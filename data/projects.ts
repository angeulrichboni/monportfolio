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
  isteam?: boolean;
  team?: Array<{ name: string; github?: string; portfolio?: string; linkedIn?: string }>;
};

export const projects: Project[] = [
  {
    slug: "agent-x",
    title: "Agent‑X — Outil d’automatisation de pentesting",
    description: "Automatisation de tests de pénétration avec un agent intelligent.",
    stack: ["MongoDB", "ChromaDB", "Python", "LangGraph"],
    // github: "https://github.com/your-username/pipeline-elt-spark",
    content: "Conception d’Agent‑X, un agent workflow d’automatisation des tests de pénétration intégrant une gestion des connaissances basée sur des bases de données vectorielles. Les scans lancés par les utilisateurs sont indexés et enrichis (métadonnées, embeddings) dans une vector DB — ces données servent ensuite à alimenter un chatbot en mode RAG (Retrieval‑Augmented Generation). Grâce à ce flux, l’utilisateur peut interroger naturellement ses sessions de scan, retrouver rapidement les vulnérabilités, comprendre l’historique des actions et obtenir des explications contextuelles et des recommandations exploitables.",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760048640/login_tittun.jpg",
    media: [
      { type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760048640/first_ovmpzw.jpg", alt: "Page de scan" },
      { type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760048639/chat_uyfjnd.jpg", alt: "Page de GPT Agent X" },
      { type: "video", src: "https://res.cloudinary.com/ddivqszbt/video/upload/v1760049605/video_agentx_hktbpl.mov", alt: "Démonstration de l'outil" },
    ],
    isteam: true,
    team: [
      { name: "BONI Acobe Ange Ulrich", github: "https://github.com/angeulrichboni"},
      { name: "OUATTARA Kiboyou Mohamed", github: "https://github.com/kiboyou" },
    ],
  },
  {
    slug: "smartdataflow",
    title: "SmartDataFlow – Optimisation des prévisions dans la supply chain",
    description: "Traitement d'événements, windowing et agrégations en temps réel.",
    stack: ["SQL", "Apache Airflow", "PostgreSQL", "Python", "SQL Server", "PowerBI", "FastAPI"],
    content: "Dans un contexte où les erreurs de prévision peuvent entraîner des ruptures de stock ou du sur-stockage, SmartDataFlow vise à améliorer la gestion des stocks en intégrant un système de Business Intelligence doté de capacités analytiques avancées. Le projet exploite des modèles de Machine Learning pour affiner les prévisions de la demande, contribuant ainsi à une meilleure rentabilité et à une prise de décision plus éclairée dans la supply chain.",
    // github: "https://github.com/your-username/streaming-kafka-flink",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741515/bord_web_niafi1.jpg",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741725/airflow_dag_hnbirp.png", alt: "Pipeline Airflow"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741727/home_dash_lalxcu.png", alt: "Dashboard PowerBI"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741726/fastapi_yy1rmw.jpg", alt: "Swagger FastAPI"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741726/erp_post_mcd_o67frr.png", alt: "MCD Base de donnée de production"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749742141/mcd_sql_server_erp_klc6pi.png", alt: "MCD DataWarehouse"},
    ],
    isteam: true,
    team: [
      { name: "BONI Acobe Ange Ulrich", github: "https://github.com/angeulrichboni" },
      { name: "OUATTARA Kiboyou Mohamed", github: "https://github.com/kiboyou" },
      { name: "AHIKPA Jean Christian", linkedIn: "https://www.linkedin.com/in/jean-christian-ahikpa/" }
    ],
  },
  {
    slug: "diabetes-data-pipeline",
    title: "Pipeline de données hospitalières (Diabetes 130)",
    description: "Pipeline local de data engineering pour données hospitalières (Diabetes 130) avec ingestion, transformation et orchestration via Airflow, MinIO, PostgreSQL et Python.",
    stack: ["PostgreSQL", "Apache Airflow", "Minio S3", "Python", "Docker"],
    content : "Ce projet a été conçu pour simuler un environnement de traitement de données en local, en reproduisant des pratiques courantes du data engineering dans l’industrie. Le jeu de données utilisé (Diabetes 130‑US Hospitals) contient plus de 100 000 admissions hospitalières de patients atteints de diabète, avec des variables liées aux diagnostics, traitements et séjours.\n\nL’objectif était de construire un pipeline complet permettant :\n- l’ingestion des données sources dans un stockage objet local (MinIO),\n- leur transformation avec Python et Pandas (nettoyage, filtrage, enrichissement),\n- leur chargement dans une base PostgreSQL pour des usages analytiques,\n- l’orchestration des tâches avec Apache Airflow (DAGs structurés),\n- le suivi de l’état du pipeline via des logs et du monitoring.\n\nCe projet met en œuvre les principes fondamentaux de l’ETL (Extract, Transform, Load) et démontre la capacité à construire un flux de traitement de données reproductible, traçable et maintenable, adapté à un contexte data analytique ou santé.",
    github: "https://github.com/angeulrichboni/diabetes-data-pipeline",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760052925/diabetes_airflow_fe4akf.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760054108/diabetes_airflow_test_nde2la.png", alt: "Pipeline Airflow"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760052925/diabetes_minio_rl42x5.png", alt: "Minio Dashboard"},
    ],
  },
  {
    slug: "clickhealth",
    title: "ClickHealth",
    description: "Application de Gestion de Prise de Rendez-vous Médicaux.",
    stack: ["React Js", "PostgreSQL", "Tailwind CSS", "Django Rest Framework"],
    content : "ClickHealth est une application web conçue pour faciliter la gestion des prises de rendez-vous médicaux. Elle permet aux utilisateurs de visualiser, d'analyser et de gérer les données de santé à partir d'une interface conviviale.\n\nLe projet utilise Next.js pour le rendu côté serveur et la génération de sites statiques, TypeScript pour la sécurité des types, et Tailwind CSS pour le design réactif. Prisma est utilisé comme ORM pour interagir avec la base de données PostgreSQL.\n\nLes principales fonctionnalités incluent :\n- Authentification des utilisateurs avec JWT\n- Gestion des profils de patients\n- Visualisation des données de santé sous forme de graphiques\n- Exportation des données au format CSV",
    github: "github.com/kiboyou/ClickHealth-FRONT/tree/main",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932680/home_x8mtv9.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932683/login_lgplg2.png", alt: "Login page"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932678/admin_dash_dbsamq.png", alt: "Dashboard admin"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932684/planning_n9ncwu.png", alt: "Planning des medecins "},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932688/prise_rdv_sfancg.png", alt: "Prise de rendez-vous"},
    ],
    isteam: true,
    team: [
      { name: "BONI Acobe Ange Ulrich", github: "https://github.com/angeulrichboni" },
      { name: "OUATTARA Kiboyou Mohamed", github: "https://github.com/kiboyou" },
      { name: "AHIKPA Jean Christian", linkedIn: "https://www.linkedin.com/in/jean-christian-ahikpa/" }
    ],
  },
  {
    slug: "sql-datacamp-project",
    title: "SQL Associate Practice Exam on DataCamp",
    description: "Examen pratique pour l'association SQL sur DataCamp.",
    stack: ["PostgreSQL"],
    content : "Ce projet est un examen pratique pour l'association SQL sur DataCamp. Il vise à tester les compétences en SQL à travers une série de questions et d'exercices pratiques.",
    // github: "https://github.com/angeulrichboni/diabetes-data-pipeline",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744935006/sql_exam_datacamp_vrmaij.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744935006/sql_exam_datacamp_vrmaij.png", alt: "Examen SQL DataCamp"},
    ],
  },
  {
    slug: "car-express",
    title: "Car Express",
    description: "Application de gestion de location de voitures.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    content : "Ce projet est une application de gestion de location de voitures, permettant aux utilisateurs de réserver des véhicules en ligne. Il utilise Next.js pour le frontend et Prisma pour interagir avec la base de données PostgreSQL.",
    github: "https://github.com/kiboyou/car_express/tree/newbackend/carexpress",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897040/home_yemone.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897034/car_yrnvbx.png", alt: "Liste des voitures"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897038/formulaire_reservation_pbxvg7.png", alt: "Formulaire de réservation"},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897037/dash_admin_kdl3mn.png", alt: "Page d'administration"},
    ],
    isteam: true,
    team: [
      { name: "BONI Acobe Ange Ulrich", github: "https://github.com/angeulrichboni" },
      { name: "OUATTARA Kiboyou Mohamed", github: "https://github.com/kiboyou" },
    ],
  },

];
