// 1. User (Admin)
export interface User {
  id: string;
  email: string;
  role: 'admin';
  created_at: string;
}

export interface LocalizedString {
  fr: string;
  en: string;
}

// 2. Project
export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  problem_statement?: LocalizedString;
  architecture?: LocalizedString;
  github_url?: string;
  demo_url?: string;
  status: 'completed' | 'ongoing';
  is_team: boolean;
  created_at: string;
  
  // UI-Specific / Join Fields (Simulating relations)
  imageUrl: string; // Cover Image (URL or Base64)
  gallery?: {       // New Gallery Field
    id: string;
    type: 'image' | 'video';
    url: string;    // URL or Base64
    caption?: string;
  }[];
  technologies: Technology[]; // From ProjectTechnology
  members: ProjectMember[];   // From ProjectMember
  category: 'Computer Vision' | 'NLP' | 'Big Data' | 'Predictive Analytics'; // Kept for filtering
}

// 3. ProjectMember
export interface ProjectMember {
  id: string;
  project_id: string;
  name: string;
  role: string;
  linkedin_url?: string;
  github_url?: string;
}

// 4. Technology
export interface Technology {
  id: string;
  name: string;
  category?: string;
}

// 6. Skill
export interface Skill {
  id: string;
  name: string;
  category: 'Machine Learning' | 'Big Data' | 'DevOps' | 'Languages' | 'Tools';
  level: number; // 1 to 5
}

// 7. Experience
export interface Experience {
  id: string;
  title: LocalizedString; // Previously role
  company: string;
  description: LocalizedString; // Text field in DB
  start_date: string;
  end_date?: string | null;
  technologies: string[]; // TEXT[] in DB
  
  // UI Helper
  type?: 'Internship' | 'Full-time' | 'Freelance' | 'Part-time'; // Kept for filtering if needed, or derived
}

// 8. Education
export interface Education {
  id: string;
  degree: LocalizedString;
  institution: LocalizedString;
  start_year: number;
  end_year: number;
  description: LocalizedString;
}

// 9. Certification
export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: number;
  url?: string;
}

// 10. BlogPost
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  created_at: string;
}

// 11. Message
export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}