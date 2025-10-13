export type Localized = string | { fr: string; en: string };

export type Project = {
  slug: string;
  title: Localized;
  description: Localized;
  stack: string[];
  tags?: string[];
  github?: string;
  demo?: string;
  content?: Localized; // markdown or plain text
  thumbnail?: string; // /public path for card image
  media?: Array<{ type: "image" | "video"; src: string; alt?: Localized }>;
  isteam?: boolean;
  team?: Array<{ name: string; github?: string; portfolio?: string; linkedIn?: string }>;
};

export const projects: Project[] = [
  {
    slug: "agent-x",
    title: { fr: "Agent‑X — Outil d’automatisation de pentesting", en: "Agent‑X — Automated pentesting assistant" },
    description: { fr: "Automatisation de tests de pénétration avec un agent intelligent.", en: "Automating penetration testing with an intelligent agent." },
    stack: ["MongoDB", "ChromaDB", "Python", "LangGraph"],
    // github: "https://github.com/your-username/pipeline-elt-spark",
    content: {
      fr: "Conception d’Agent‑X, un agent workflow d’automatisation des tests de pénétration intégrant une gestion des connaissances basée sur des bases de données vectorielles. Les scans lancés par les utilisateurs sont indexés et enrichis (métadonnées, embeddings) dans une vector DB — ces données servent ensuite à alimenter un chatbot en mode RAG (Retrieval‑Augmented Generation). Grâce à ce flux, l’utilisateur peut interroger naturellement ses sessions de scan, retrouver rapidement les vulnérabilités, comprendre l’historique des actions et obtenir des explications contextuelles et des recommandations exploitables.",
      en: "Designed Agent‑X, a workflow agent that automates penetration testing with a knowledge system powered by vector databases. User-launched scans are indexed and enriched (metadata, embeddings) in a vector DB — then surfaced to a RAG chatbot for natural querying of scan sessions, quick retrieval of vulnerabilities, and contextual explanations and actionable recommendations."
    },
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760048640/login_tittun.jpg",
    media: [
      { type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760048640/first_ovmpzw.jpg", alt: { fr: "Page de scan", en: "Scan page" } },
      { type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760048639/chat_uyfjnd.jpg", alt: { fr: "Page de GPT Agent X", en: "GPT Agent X page" } },
      { type: "video", src: "https://res.cloudinary.com/ddivqszbt/video/upload/v1760049605/video_agentx_hktbpl.mov", alt: { fr: "Démonstration de l'outil", en: "Tool demonstration" } },
    ],
    isteam: true,
    team: [
      { name: "BONI Acobe Ange Ulrich", github: "https://github.com/angeulrichboni"},
      { name: "OUATTARA Kiboyou Mohamed", github: "https://github.com/kiboyou" },
    ],
  },
  {
    slug: "smartdataflow",
    title: { fr: "SmartDataFlow – Optimisation des prévisions dans la supply chain", en: "SmartDataFlow – Improving forecasts in the supply chain" },
    description: { fr: "Traitement d'événements, windowing et agrégations en temps réel.", en: "Event processing, windowing and real-time aggregations." },
    stack: ["SQL", "Apache Airflow", "PostgreSQL", "Python", "SQL Server", "PowerBI", "FastAPI"],
    content: {
      fr: "Dans un contexte où les erreurs de prévision peuvent entraîner des ruptures de stock ou du sur-stockage, SmartDataFlow vise à améliorer la gestion des stocks en intégrant un système de Business Intelligence doté de capacités analytiques avancées. Le projet exploite des modèles de Machine Learning pour affiner les prévisions de la demande, contribuant ainsi à une meilleure rentabilité et à une prise de décision plus éclairée dans la supply chain.",
      en: "Where forecast errors can cause stockouts or overstock, SmartDataFlow improves inventory management by integrating a BI system with advanced analytics. The project leverages machine learning models to refine demand forecasting for better profitability and decision-making across the supply chain."
    },
    // github: "https://github.com/your-username/streaming-kafka-flink",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741515/bord_web_niafi1.jpg",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741725/airflow_dag_hnbirp.png", alt: { fr: "Pipeline Airflow", en: "Airflow pipeline" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741727/home_dash_lalxcu.png", alt: { fr: "Dashboard PowerBI", en: "PowerBI dashboard" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741726/fastapi_yy1rmw.jpg", alt: { fr: "Swagger FastAPI", en: "FastAPI Swagger" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749741726/erp_post_mcd_o67frr.png", alt: { fr: "MCD Base de donnée de production", en: "Production DB MCD" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1749742141/mcd_sql_server_erp_klc6pi.png", alt: { fr: "MCD DataWarehouse", en: "Data Warehouse MCD" }},
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
    title: { fr: "Pipeline de données hospitalières (Diabetes 130)", en: "Hospital data pipeline (Diabetes 130)" },
    description: { fr: "Pipeline local de data engineering pour données hospitalières (Diabetes 130) avec ingestion, transformation et orchestration via Airflow, MinIO, PostgreSQL et Python.", en: "Local data engineering pipeline for hospital data (Diabetes 130) with ingestion, transformation and orchestration using Airflow, MinIO, PostgreSQL and Python." },
    stack: ["PostgreSQL", "Apache Airflow", "Minio S3", "Python", "Docker"],
    content : {
      fr: "Ce projet a été conçu pour simuler un environnement de traitement de données en local, en reproduisant des pratiques courantes du data engineering dans l’industrie. Le jeu de données utilisé (Diabetes 130‑US Hospitals) contient plus de 100 000 admissions hospitalières de patients atteints de diabète, avec des variables liées aux diagnostics, traitements et séjours.\n\nL’objectif était de construire un pipeline complet permettant :\n- l’ingestion des données sources dans un stockage objet local (MinIO),\n- leur transformation avec Python et Pandas (nettoyage, filtrage, enrichissement),\n- leur chargement dans une base PostgreSQL pour des usages analytiques,\n- l’orchestration des tâches avec Apache Airflow (DAGs structurés),\n- le suivi de l’état du pipeline via des logs et du monitoring.\n\nCe projet met en œuvre les principes fondamentaux de l’ETL (Extract, Transform, Load) et démontre la capacité à construire un flux de traitement de données reproductible, traçable et maintenable, adapté à un contexte data analytique ou santé.",
      en: "This project simulates a local data processing environment, reproducing common data engineering practices. The dataset (Diabetes 130–US Hospitals) contains 100k+ hospital admissions of diabetic patients, with variables for diagnoses, treatments, and stays.\n\nThe goal was to build an end-to-end pipeline to:\n- ingest source data into local object storage (MinIO),\n- transform it with Python and Pandas (cleaning, filtering, enrichment),\n- load it into PostgreSQL for analytics,\n- orchestrate tasks with Apache Airflow (structured DAGs),\n- monitor pipeline state with logs and monitoring.\n\nThis implements core ETL principles and demonstrates building a reproducible, traceable, maintainable data flow for analytics or healthcare contexts."
    },
    github: "https://github.com/angeulrichboni/diabetes-data-pipeline",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760052925/diabetes_airflow_fe4akf.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760054108/diabetes_airflow_test_nde2la.png", alt: { fr: "Pipeline Airflow", en: "Airflow pipeline" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1760052925/diabetes_minio_rl42x5.png", alt: { fr: "Minio Dashboard", en: "Minio dashboard" }},
    ],
  },
  {
    slug: "clickhealth",
    title: "ClickHealth",
    description: { fr: "Application de Gestion de Prise de Rendez-vous Médicaux.", en: "Medical appointment booking management app." },
    stack: ["React Js", "PostgreSQL", "Tailwind CSS", "Django Rest Framework"],
    content : {
      fr: "ClickHealth est une application web conçue pour faciliter la gestion des prises de rendez-vous médicaux. Elle permet aux utilisateurs de visualiser, d'analyser et de gérer les données de santé à partir d'une interface conviviale.\n\nLe projet utilise Next.js pour le rendu côté serveur et la génération de sites statiques, TypeScript pour la sécurité des types, et Tailwind CSS pour le design réactif. Prisma est utilisé comme ORM pour interagir avec la base de données PostgreSQL.\n\nLes principales fonctionnalités incluent :\n- Authentification des utilisateurs avec JWT\n- Gestion des profils de patients\n- Visualisation des données de santé sous forme de graphiques\n- Exportation des données au format CSV",
      en: "ClickHealth is a web app that simplifies managing medical appointments. It allows users to view, analyze and manage health data via a user-friendly interface.\n\nThe project uses Next.js for SSR/SSG, TypeScript for type safety, and Tailwind CSS for responsive design. Prisma is used as the ORM for PostgreSQL.\n\nMain features include:\n- User authentication with JWT\n- Patient profile management\n- Data visualization through charts\n- CSV export"
    },
    github: "github.com/kiboyou/ClickHealth-FRONT/tree/main",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932680/home_x8mtv9.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932683/login_lgplg2.png", alt: { fr: "Page de connexion", en: "Login page" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932678/admin_dash_dbsamq.png", alt: { fr: "Tableau de bord admin", en: "Admin dashboard" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932684/planning_n9ncwu.png", alt: { fr: "Planning des médecins", en: "Doctors' schedule" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744932688/prise_rdv_sfancg.png", alt: { fr: "Prise de rendez-vous", en: "Appointment booking" }},
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
    title: { fr: "Examen pratique SQL sur DataCamp", en: "SQL Associate Practice Exam on DataCamp" },
    description: { fr: "Examen pratique pour l'association SQL sur DataCamp.", en: "Practice exam for the SQL Associate track on DataCamp." },
    stack: ["PostgreSQL"],
    content : { fr: "Ce projet est un examen pratique pour l'association SQL sur DataCamp. Il vise à tester les compétences en SQL à travers une série de questions et d'exercices pratiques.", en: "This project is a practice exam for the SQL Associate path on DataCamp, designed to test SQL skills via questions and hands-on exercises." },
    // github: "https://github.com/angeulrichboni/diabetes-data-pipeline",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744935006/sql_exam_datacamp_vrmaij.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744935006/sql_exam_datacamp_vrmaij.png", alt: { fr: "Examen SQL DataCamp", en: "SQL DataCamp exam" }},
    ],
  },
  {
    slug: "car-express",
    title: "Car Express",
    description: { fr: "Application de gestion de location de voitures.", en: "Car rental management application." },
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    content : { fr: "Ce projet est une application de gestion de location de voitures, permettant aux utilisateurs de réserver des véhicules en ligne. Il utilise Next.js pour le frontend et Prisma pour interagir avec la base de données PostgreSQL.", en: "This project is a car rental management application that lets users book vehicles online. It uses Next.js for the frontend and Prisma to interact with PostgreSQL." },
    github: "https://github.com/kiboyou/car_express/tree/newbackend/carexpress",
    thumbnail: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897040/home_yemone.png",
    media: [
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897034/car_yrnvbx.png", alt: { fr: "Liste des voitures", en: "Cars list" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897038/formulaire_reservation_pbxvg7.png", alt: { fr: "Formulaire de réservation", en: "Reservation form" }},
      {type: "image", src: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744897037/dash_admin_kdl3mn.png", alt: { fr: "Page d'administration", en: "Admin page" }},
    ],
    isteam: true,
    team: [
      { name: "BONI Acobe Ange Ulrich", github: "https://github.com/angeulrichboni" },
      { name: "OUATTARA Kiboyou Mohamed", github: "https://github.com/kiboyou" },
    ],
  },

];
