export interface LocalizedString {
    fr: string;
    en: string;
}

export interface ProjectAsset {
    id?: string;
    type: "image" | "video";
    url: string;
    caption?: LocalizedString | string;
}

export interface ProjectMember {
    name: string;
    github_url?: string;
    portfolio_url?: string;
    linkedin_url?: string;
}

// --- Project Types ---

export interface Project {
    id: string;
    slug: string;
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    content_fr?: string;
    content_en?: string;
    problem_statement_fr?: string;
    problem_statement_en?: string;
    results_fr?: string;
    results_en?: string;
    stack: string[];
    category?: string;
    status: string;
    github_url?: string;
    demo_url?: string;
    cover_image_url?: string;
    assets: ProjectAsset[];
    is_team: boolean;
    team: ProjectMember[];
    created_at: string;
    updated_at: string;
}

export interface ProjectCreate {
    slug: string;
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    content_fr?: string;
    content_en?: string;
    problem_statement_fr?: string;
    problem_statement_en?: string;
    results_fr?: string;
    results_en?: string;
    stack?: string[];
    category?: string;
    status?: string;
    github_url?: string;
    demo_url?: string;
    cover_image_url?: string;
    assets?: ProjectAsset[];
    is_team?: boolean;
    team?: ProjectMember[];
}

export type ProjectUpdate = Partial<ProjectCreate>;

// --- Experience Types ---

export interface Experience {
    id: string;
    title_fr: string;
    title_en: string;
    company_fr: string;
    company_en: string;
    start_date: string;
    end_date?: string;
    description: LocalizedString[];
    technologies: string[];
    created_at: string;
    updated_at: string;
}

export interface ExperienceCreate {
    title_fr: string;
    title_en: string;
    company_fr: string;
    company_en: string;
    start_date: string;
    end_date?: string;
    description?: LocalizedString[];
    technologies?: string[];
}

export type ExperienceUpdate = Partial<ExperienceCreate>;

// --- Skill Types ---

export interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
    created_at: string;
    updated_at: string;
}

export interface SkillCreate {
    name: string;
    level?: number;
    category: string;
}

export type SkillUpdate = Partial<SkillCreate>;
