import apiClient from "@/app/lib/api-client";
import { Skill, SkillCreate, SkillUpdate } from "@/app/types/api";

const RESOURCE = "/skills";

export const SkillService = {
    getAll: async () => {
        const response = await apiClient.get<Skill[]>(RESOURCE);
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<Skill>(`${RESOURCE}/${id}`);
        return response.data;
    },

    create: async (data: SkillCreate) => {
        const response = await apiClient.post<Skill>(RESOURCE, data);
        return response.data;
    },

    update: async (id: string, data: SkillUpdate) => {
        const response = await apiClient.patch<Skill>(`${RESOURCE}/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`${RESOURCE}/${id}`);
    }
};
