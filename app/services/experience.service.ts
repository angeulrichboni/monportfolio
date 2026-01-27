import apiClient from "@/app/lib/api-client";
import { Experience, ExperienceCreate, ExperienceUpdate } from "@/app/types/api";

const RESOURCE = "/experiences";

// --- Types for Frontend Consumption ---
// (Ideally we reuse types/api.ts directly if frontend form matches, 
// but here we might need adaptation similar to Projects if forms differ)
// For now, let's assume ExperienceForm will be adapted to use LocalizedString[] properly.

export const ExperienceService = {
    getAll: async () => {
        const response = await apiClient.get<Experience[]>(RESOURCE);
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<Experience>(`${RESOURCE}/${id}`);
        return response.data;
    },

    create: async (data: ExperienceCreate) => {
        const response = await apiClient.post<Experience>(RESOURCE, data);
        return response.data;
    },

    update: async (id: string, data: ExperienceUpdate) => {
        const response = await apiClient.patch<Experience>(`${RESOURCE}/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`${RESOURCE}/${id}`);
    }
};
