"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExperienceForm, ExperienceData } from "../../components/ExperienceForm";
import { ExperienceService } from "@/app/services/experience.service";

export default function NewExperiencePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: ExperienceData) => {
        try {
            setIsSubmitting(true);
            setError(null);
            await ExperienceService.create(data);
            router.push("/admin/experiences");
        } catch (err) {
            console.error("Failed to create experience:", err);
            setError("Erreur lors de la création. Vérifiez les données et réessayez.");
            throw err; // Re-throw to let form handle it
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {error && (
                <div className="max-w-6xl mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                </div>
            )}
            <ExperienceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </>
    );
}
