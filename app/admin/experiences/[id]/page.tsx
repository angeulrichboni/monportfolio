"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExperienceForm, ExperienceData } from "../../components/ExperienceForm";
import { ExperienceService, adaptToFrontend } from "@/app/services/experience.service";

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [data, setData] = useState<ExperienceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadExperience();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedParams.id]);

    const loadExperience = async () => {
        try {
            setLoading(true);
            setError(null);
            const experience = await ExperienceService.getById(resolvedParams.id);
            setData(adaptToFrontend(experience));
        } catch (err) {
            console.error("Failed to load experience:", err);
            setError("Impossible de charger l'expérience.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: ExperienceData) => {
        try {
            setIsSubmitting(true);
            setError(null);
            await ExperienceService.update(resolvedParams.id, formData);
            router.push("/admin/experiences");
        } catch (err) {
            console.error("Failed to update experience:", err);
            setError("Erreur lors de la mise à jour.");
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Chargement de l&apos;expérience...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Erreur</h3>
                    <p className="text-sm text-red-700 mb-4">{error || "Expérience introuvable"}</p>
                    <button
                        onClick={() => router.push("/admin/experiences")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="max-w-6xl mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                </div>
            )}
            <ExperienceForm
                initialData={data}
                isEditing
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </>
    );
}
