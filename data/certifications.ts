export type Certification = {
  title: string;
  org: string;
  date: string; // YYYY-MM
  logo?: string; // /public path
  url?: string; // link or PDF
};

export const certifications: Certification[] = [
  {
    logo: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896924/RedHat_glcmuf.png",
    title: "Red Hat Certified System Administrator (RHCSA)",
    org: "Red Hat",
    date: "2024-05",
    url: "https://www.credly.com/badges/961c1f54-acf5-481b-af26-b4ff2ca03b23",
  },
  {
    logo: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896923/Docker_etkirw.png",
    title: "Bases de Docker pour la conteneurisation",
    org: "DataScientist.fr",
    date: "2025-02",
    url: "https://app.datascientist.fr/certificat/186GTHQT3JUPB"
  },
  {
    logo: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896926/Devops_abzvxv.png",
    title: "DevOps Essentials",
    org: "Coursera",
    date: "2024-09",
    url: "https://www.credly.com/badges/4928a4c2-f873-4fc9-b6ec-f4aebb848ba1"
  },

  {
    logo: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744896922/Coursera_phrw6t.png",
    title: "Data Engineering Essentials",
    org: "Coursera",
    date: "2025-03",
    url: "https://www.credly.com/badges/d99f040f-a186-45fd-aafa-02aac379381e"
  },
  {
    logo: "https://res.cloudinary.com/ddivqszbt/image/upload/v1744931868/logo-new-white-green-a5cb16e0ae_dpd6qs.svg",
    title: "SQL Intermédiaire",
    org: "Hackerrank",
    date: "2023-12",
    url: "https://www.hackerrank.com/certificates/11d3f5a3d5ba"
  },
];
