"use client";

import { use, useEffect, useState } from "react";
import { ProjectForm, ProjectData } from "../../components/ProjectForm";

// Mock Fetcher
const getProject = (id: string): ProjectData => {
    return {
        id,
        slug: "portfolio-v3",
        title: { fr: "Portfolio V3", en: "Portfolio V3" },
        description: { fr: "Mon site personnel", en: "My personal website" },
        content: { fr: "# Salut", en: "# Hello" },
        stack: ["Next.js", "React"],
        category: "Fullstack",
        status: "published",
        is_team: false,
        team: []
    };
};

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<ProjectData | null>(null);

    useEffect(() => {
        // In real app: fetch from API
        setData(getProject(resolvedParams.id));
    }, [resolvedParams.id]);

    if (!data) return <div>Chargement...</div>;

    return <ProjectForm initialData={data} isEditing />;
}
