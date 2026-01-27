import apiClient from "@/app/lib/api-client";
import { Experience, ExperienceCreate, LocalizedString } from "@/app/types/api";
import { ExperienceData } from "@/app/admin/components/ExperienceForm";

const RESOURCE = "/experiences";

// --- Adapter Helpers ---

/**
 * Transforms Backend Data (Flat) -> Frontend Data (Nested)
 */
export const adaptToFrontend = (apiExp: Experience): ExperienceData => {
    return {
        id: apiExp.id,
        title: { fr: apiExp.title_fr, en: apiExp.title_en },
        company: { fr: apiExp.company_fr, en: apiExp.company_en },
        start_date: apiExp.start_date.substring(0, 7), // "YYYY-MM-DD" -> "YYYY-MM"
        end_date: apiExp.end_date ? apiExp.end_date.substring(0, 7) : undefined,
        description: apiExp.description,
        technologies: apiExp.technologies
    };
};

/**
 * Transforms Frontend Data (Nested) -> Backend Data (Flat)
 */
export const adaptToBackend = (formData: ExperienceData): ExperienceCreate => {
    const getString = (val: string | LocalizedString | undefined, lang: 'fr' | 'en'): string => {
        if (!val) return "";
        if (typeof val === 'string') return val;
        return val[lang] || "";
    };

    return {
        title_fr: getString(formData.title, 'fr'),
        title_en: getString(formData.title, 'en'),
        company_fr: getString(formData.company, 'fr'),
        company_en: getString(formData.company, 'en'),
        start_date: formData.start_date ? `${formData.start_date}-01` : "", // "YYYY-MM" -> "YYYY-MM-01"
        end_date: formData.end_date ? `${formData.end_date}-01` : undefined,
        description: formData.description.map(desc =>
            typeof desc === 'string' ? { fr: desc, en: "" } : desc
        ),
        technologies: formData.technologies || []
    };
};

// --- Service Methods ---

export const ExperienceService = {
    getAll: async () => {
        const response = await apiClient.get<Experience[]>(RESOURCE);
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<Experience>(`${RESOURCE}/${id}`);
        return response.data;
    },

    create: async (data: ExperienceData) => {
        const payload = adaptToBackend(data);
        const response = await apiClient.post<Experience>(RESOURCE, payload);
        return response.data;
    },

    update: async (id: string, data: ExperienceData) => {
        const payload = adaptToBackend(data);
        const response = await apiClient.patch<Experience>(`${RESOURCE}/${id}`, payload);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`${RESOURCE}/${id}`);
    }
};
