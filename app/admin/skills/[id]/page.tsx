"use client";

import { use, useEffect, useState } from "react";
import { SkillForm, SkillData } from "../../components/SkillForm";

const getSkill = (id: string): SkillData => ({
    id,
    name: "Python",
    level: 90,
    category: "Data Engineering"
});

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<SkillData | null>(null);

    useEffect(() => {
        setData(getSkill(resolvedParams.id));
    }, [resolvedParams.id]);

    if (!data) return <div>Chargement...</div>;

    return <SkillForm initialData={data} isEditing />;
}
