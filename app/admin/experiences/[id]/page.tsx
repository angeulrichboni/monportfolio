"use client";

import { use, useEffect, useState } from "react";
import { ExperienceForm, ExperienceData } from "../../components/ExperienceForm";

const getExperience = (id: string): ExperienceData => ({
    id,
    title: { fr: "Développeur", en: "Developer" },
    company: { fr: "Google", en: "Google" },
    start_date: "2024-01",
    description: [{ fr: "Code...", en: "Coding..." }],
    technologies: ["Go", "Python"]
});

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<ExperienceData | null>(null);

    useEffect(() => {
        setData(getExperience(resolvedParams.id));
    }, [resolvedParams.id]);

    if (!data) return <div>Chargement...</div>;

    return <ExperienceForm initialData={data} isEditing />;
}
