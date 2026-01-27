import apiClient from "@/app/lib/api-client";
import { Project, ProjectCreate, LocalizedString } from "@/app/types/api";
import { ProjectData } from "@/app/admin/components/ProjectForm"; // Importing Frontend Types

const RESOURCE = "/projects";

// --- Adapter Helpers ---

/**
 * Transforms Backend Data (Flat) -> Frontend Data (Nested)
 */
export const adaptToFrontend = (apiProject: Project): ProjectData => {
    return {
        id: apiProject.id,
        slug: apiProject.slug,
        title: { fr: apiProject.title_fr, en: apiProject.title_en },
        description: { fr: apiProject.description_fr, en: apiProject.description_en },
        content: { fr: apiProject.content_fr || "", en: apiProject.content_en || "" },
        problem_statement: { fr: apiProject.problem_statement_fr || "", en: apiProject.problem_statement_en || "" },
        architecture: { fr: apiProject.architecture_fr || "", en: apiProject.architecture_en || "" },
        results: { fr: apiProject.results_fr || "", en: apiProject.results_en || "" },
        stack: apiProject.stack,
        category: apiProject.category,
        status: apiProject.status as ProjectData['status'], // Type assertion might be needed or status strictly typed in API
        github_url: apiProject.github_url,
        demo_url: apiProject.demo_url,
        cover_image_url: apiProject.cover_image_url,
        assets: apiProject.assets,
        is_team: apiProject.is_team,
        team: apiProject.team
    };
};

/**
 * Transforms Frontend Data (Nested) -> Backend Data (Flat)
 * Used for Create & Update
 */
export const adaptToBackend = (formData: ProjectData): ProjectCreate => {
    const getString = (val: string | LocalizedString | undefined, lang: 'fr' | 'en'): string => {
        if (!val) return "";
        if (typeof val === 'string') return val;
        return val[lang] || "";
    };

    return {
        slug: formData.slug,
        title_fr: getString(formData.title, 'fr'),
        title_en: getString(formData.title, 'en'),
        description_fr: getString(formData.description, 'fr'),
        description_en: getString(formData.description, 'en'),
        content_fr: getString(formData.content, 'fr'),
        content_en: getString(formData.content, 'en'),
        problem_statement_fr: getString(formData.problem_statement, 'fr'),
        problem_statement_en: getString(formData.problem_statement, 'en'),
        architecture_fr: getString(formData.architecture, 'fr'),
        architecture_en: getString(formData.architecture, 'en'),
        results_fr: getString(formData.results, 'fr'),
        results_en: getString(formData.results, 'en'),
        stack: formData.stack,
        category: formData.category,
        status: formData.status,
        github_url: formData.github_url,
        demo_url: formData.demo_url,
        cover_image_url: formData.cover_image_url,
        assets: formData.assets,
        is_team: formData.is_team,
        team: formData.team
    };
};

// --- Service Methods ---

export const ProjectService = {
    getAll: async () => {
        const response = await apiClient.get<Project[]>(RESOURCE);
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<Project>(`${RESOURCE}/${id}`);
        return response.data;
    },

    getBySlug: async (slug: string) => {
        const response = await apiClient.get<Project>(`${RESOURCE}/slug/${slug}`);
        return response.data;
    },

    create: async (data: ProjectData) => {
        const payload = adaptToBackend(data);
        const response = await apiClient.post<Project>(RESOURCE, payload);
        return response.data;
    },

    update: async (id: string, data: ProjectData) => {
        const payload = adaptToBackend(data);
        const response = await apiClient.patch<Project>(`${RESOURCE}/${id}`, payload);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`${RESOURCE}/${id}`);
    }
};
