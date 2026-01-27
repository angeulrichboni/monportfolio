"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SkillForm, SkillData } from "../../components/SkillForm";
import { SkillService } from "@/app/services/skill.service";
import { Skill } from "@/app/types/api";

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [data, setData] = useState<Skill | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadSkill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedParams.id]);

    const loadSkill = async () => {
        try {
            setLoading(true);
            setError(null);
            const skill = await SkillService.getById(resolvedParams.id);
            setData(skill);
        } catch (err) {
            console.error("Failed to load skill:", err);
            setError("Impossible de charger la compétence.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: SkillData) => {
        await SkillService.update(resolvedParams.id, {
            name: formData.name,
            level: formData.level,
            category: formData.category
        });

        // Redirect to list page on success
        router.push("/admin/skills");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Chargement de la compétence...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Erreur</h3>
                    <p className="text-sm text-red-700 mb-4">{error || "Compétence introuvable"}</p>
                    <button
                        onClick={() => router.push("/admin/skills")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    return <SkillForm initialData={data as SkillData} isEditing onSubmit={handleSubmit} />;
}
