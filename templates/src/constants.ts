import type { Project, Experience, Skill, NavigationItem, Education, Certification } from './types';

export const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Education', path: '/education' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin', path: '/admin' },
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: { en: 'University of Technology', fr: 'Université de Technologie' },
    degree: { en: 'MSc in Data Science & Artificial Intelligence', fr: 'Master en Science des Données et Intelligence Artificielle' },
    start_year: 2023,
    end_year: 2024,
    description: { en: 'Specialized in Deep Learning and Large Scale Data Systems. Graduated with Honors. Key courses: Advanced Deep Learning, Distributed Systems, Computer Vision.', fr: 'Spécialisé en Deep Learning et Systèmes de Données à Grande Échelle. Diplômé avec mention. Cours clés : Deep Learning Avancé, Systèmes Distribués, Vision par Ordinateur.' }
  },
  {
    id: '2',
    institution: { en: 'National Engineering School', fr: 'École Nationale d\'Ingénieurs' },
    degree: { en: 'BSc in Computer Science', fr: 'Licence en Informatique' },
    start_year: 2020,
    end_year: 2023,
    description: { en: 'Strong foundation in algorithms, mathematics, and software engineering. Major in Software Architecture and Database Management.', fr: 'Solides bases en algorithmes, mathématiques et génie logiciel. Majeure en Architecture Logicielle et Gestion de Bases de Données.' }
  },
  {
    id: '3',
    institution: { en: 'DeepLearning.AI', fr: 'DeepLearning.AI' },
    degree: { en: 'Deep Learning Specialization', fr: 'Spécialisation Deep Learning' },
    start_year: 2022,
    end_year: 2022,
    description: { en: 'Comprehensive curriculum covering Neural Networks, CNNs, RNNs, LSTM, and Transformers.', fr: 'Programme complet couvrant les réseaux de neurones, CNN, RNN, LSTM et Transformers.' }
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: { en: 'Autonomous Drone Navigation', fr: 'Navigation de Drone Autonome' },
    description: { en: 'A comprehensive system enabling drones to navigate complex indoor environments without GPS. The solution integrates SLAM for mapping and a custom CNN for real-time object detection.', fr: 'Un système complet permettant aux drones de naviguer dans des environnements intérieurs complexes sans GPS. La solution intègre SLAM pour la cartographie et un CNN personnalisé pour la détection d\'objets en temps réel.' },
    problem_statement: { en: 'Commercial drones often struggle in GPS-denied environments like warehouses or tunnels, leading to collisions and loss of assets.', fr: 'Les drones commerciaux ont souvent du mal dans les environnements sans GPS comme les entrepôts ou les tunnels, entraînant des collisions et des pertes d\'actifs.' },
    architecture: { en: 'Used a monocular camera feed processed by a Jetson Nano. The stack includes ROS2 for message passing, ORB-SLAM3 for localization, and a MobileNetV3 SSD for obstacle detection.', fr: 'Utilisation d\'un flux de caméra monoculaire traité par un Jetson Nano. La pile comprend ROS2 pour le passage de messages, ORB-SLAM3 pour la localisation et un SSD MobileNetV3 pour la détection d\'obstacles.' },
    imageUrl: 'https://picsum.photos/800/600',
    technologies: [{ id: 't1', name: 'Python' }, { id: 't2', name: 'OpenCV' }, { id: 't3', name: 'TensorFlow' }, { id: 't4', name: 'ROS2' }],
    status: 'completed',
    is_team: false,
    created_at: '2023-12-01',
    category: 'Computer Vision',
    members: [],
    github_url: 'https://github.com/annabellemiller/drone-rl',
  },
  {
    id: '2',
    title: { en: 'Large Scale Sentiment Analysis', fr: 'Analyse de Sentiment à Grande Échelle' },
    description: { en: 'An end-to-end data pipeline processing massive streams of Twitter/X data to gauge public sentiment regarding financial market trends.', fr: 'Un pipeline de données de bout en bout traitant des flux massifs de données Twitter/X pour évaluer le sentiment public concernant les tendances des marchés financiers.' },
    problem_statement: { en: 'Analyzing millions of tweets in real-time to detect market-moving sentiment is computationally expensive and requires low-latency architecture.', fr: 'L\'analyse de millions de tweets en temps réel pour détecter le sentiment influençant le marché est coûteuse en calcul et nécessite une architecture à faible latence.' },
    architecture: { en: 'Ingestion via Kafka, streaming processing with Apache Spark Structured Streaming, and analysis using a fine-tuned BERT model. Results stored in Cassandra.', fr: 'Ingestion via Kafka, traitement en flux avec Apache Spark Structured Streaming et analyse à l\'aide d\'un modèle BERT affiné. Résultats stockés dans Cassandra.' },
    imageUrl: 'https://picsum.photos/800/601',
    technologies: [{ id: 't5', name: 'Spark' }, { id: 't6', name: 'NLP' }, { id: 't7', name: 'Kafka' }, { id: 't8', name: 'Scala' }],
    status: 'completed',
    is_team: true,
    created_at: '2023-08-15',
    category: 'Big Data',
    members: [
      { id: 'm1', project_id: '2', name: 'John Doe', role: 'Data Engineer' },
      { id: 'm2', project_id: '2', name: 'Jane Smith', role: 'DevOps' }
    ],
    github_url: 'https://github.com/annabellemiller/spark-sentiment',
  },
  {
    id: '3',
    title: { en: 'Medical Image Segmentation', fr: 'Segmentation d\'Images Médicales' },
    description: { en: 'Developing a U-Net based architecture to assist radiologists in identifying tumors in MRI scans with high precision.', fr: 'Développement d\'une architecture basée sur U-Net pour aider les radiologues à identifier les tumeurs dans les scans IRM avec une grande précision.' },
    problem_statement: { en: 'Manual segmentation of MRI scans is time-consuming and prone to inter-observer variability.', fr: 'La segmentation manuelle des scans IRM prend du temps et est sujette à la variabilité inter-observateur.' },
    architecture: { en: 'Standard U-Net architecture with residual blocks. Trained on the BRATS dataset using heavy data augmentation to handle class imbalance.', fr: 'Architecture U-Net standard avec blocs résiduels. Entraîné sur le jeu de données BRATS en utilisant une forte augmentation des données pour gérer le déséquilibre des classes.' },
    imageUrl: 'https://picsum.photos/800/602',
    technologies: [{ id: 't9', name: 'PyTorch' }, { id: 't10', name: 'UNet' }, { id: 't11', name: 'Docker' }],
    status: 'ongoing',
    is_team: false,
    created_at: '2024-01-10',
    category: 'Computer Vision',
    members: []
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: { fr: 'Ingénieur Machine Learning (Stage)', en: 'Machine Learning Engineer Intern' },
    company: 'TechGiant Corp',
    start_date: '2023-06-01',
    end_date: '2023-09-30',
    description: { 
      fr: 'Optimisation des algorithmes de recommandation améliorant le CTR de 15%. Déploiement de modèles en production avec Docker et Kubernetes. Tests A/B sur de nouvelles fonctionnalités.',
      en: 'Optimized recommendation algorithms improving CTR by 15%. Deployed models to production using Docker and Kubernetes. Conducted A/B testing on new feature sets for the mobile app.'
    },
    technologies: ['Python', 'Scikit-learn', 'Kubernetes', 'FastAPI', 'AWS'],
    type: 'Internship'
  },
  {
    id: '2',
    title: { fr: 'Data Scientist Junior', en: 'Data Scientist Junior' },
    company: 'FinTech Start',
    start_date: '2022-01-01',
    end_date: '2023-05-31',
    description: {
      fr: 'Création de modèles de détection de fraude avec XGBoost, réduisant les faux positifs de 12%. Automatisation des pipelines de données. Tableaux de bord Tableau.',
      en: 'Built fraud detection models using XGBoost, reducing false positives by 12%. Automated data cleaning pipelines reducing manual work by 40%. Created interactive Tableau dashboards.'
    },
    technologies: ['Pandas', 'XGBoost', 'Tableau', 'SQL', 'Airflow'],
    type: 'Part-time'
  },
  {
    id: '3',
    title: { fr: 'Assistant de Recherche', en: 'Research Assistant' },
    company: 'University AI Lab',
    start_date: '2021-09-01',
    end_date: '2021-12-31',
    description: {
      fr: 'Aide à l\'implémentation de modèles NLP (Transformers). Curation et étiquetage de datasets.',
      en: 'Assisted in implementing state-of-the-art NLP models (Transformers). Curated and labeled datasets for supervised learning tasks.'
    },
    technologies: ['PyTorch', 'Hugging Face', 'LaTeX', 'Python'],
    type: 'Part-time'
  }
];

export const SKILLS: Skill[] = [
  { id: 's1', name: 'TensorFlow/PyTorch', category: 'Machine Learning', level: 5 },
  { id: 's2', name: 'Computer Vision', category: 'Machine Learning', level: 4 },
  { id: 's3', name: 'Spark/Hadoop', category: 'Big Data', level: 4 },
  { id: 's4', name: 'AWS/Docker', category: 'DevOps', level: 3 },
  { id: 's5', name: 'SQL/NoSQL', category: 'Big Data', level: 4 },
  { id: 's6', name: 'Python', category: 'Languages', level: 5 },
];

export const CERTIFICATIONS: Certification[] = [
  { id: 'c1', name: 'TensorFlow Developer Certificate', organization: 'Google', year: 2023 },
  { id: 'c2', name: 'AWS Certified Solutions Architect', organization: 'Amazon Web Services', year: 2022 }
];