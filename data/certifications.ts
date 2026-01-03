export type Localized = string | { fr: string; en: string };

export type Certification = {
  id?: string;
  name: Localized;          // Was title
  organization: Localized;  // Was org
  issued_date: string;      // Was date (YYYY-MM)
  logo_url?: string;        // Was logo
  credential_url?: string;  // Was url
};

export const certifications: Certification[] = [
  {
    logo_url: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896924/RedHat_glcmuf.png",
    name: { fr: "Red Hat Certified System Administrator (RHCSA)", en: "Red Hat Certified System Administrator (RHCSA)" },
    organization: { fr: "Red Hat", en: "Red Hat" },
    issued_date: "2024-05",
    credential_url: "https://www.credly.com/badges/961c1f54-acf5-481b-af26-b4ff2ca03b23",
  },
  {
    logo_url: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896923/Docker_etkirw.png",
    name: { fr: "Bases de Docker pour la conteneurisation", en: "Docker fundamentals for containerization" },
    organization: { fr: "DataScientist.fr", en: "DataScientist.fr" },
    issued_date: "2025-02",
    credential_url: "https://app.datascientist.fr/certificat/186GTHQT3JUPB"
  },
  {
    logo_url: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896926/Devops_abzvxv.png",
    name: { fr: "DevOps Essentials", en: "DevOps Essentials" },
    organization: { fr: "Coursera", en: "Coursera" },
    issued_date: "2024-09",
    credential_url: "https://www.credly.com/badges/4928a4c2-f873-4fc9-b6ec-f4aebb848ba1"
  },

  {
    logo_url: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896922/Coursera_phrw6t.png",
    name: { fr: "Data Engineering Essentials", en: "Data Engineering Essentials" },
    organization: { fr: "Coursera", en: "Coursera" },
    issued_date: "2025-03",
    credential_url: "https://www.credly.com/badges/d99f040f-a186-45fd-aafa-02aac379381e"
  },
  {
    logo_url: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744931868/logo-new-white-green-a5cb16e0ae_dpd6qs.svg",
    name: { fr: "SQL Intermédiaire", en: "SQL Intermediate" },
    organization: { fr: "Hackerrank", en: "Hackerrank" },
    issued_date: "2023-12",
    credential_url: "https://www.hackerrank.com/certificates/11d3f5a3d5ba"
  },
];
