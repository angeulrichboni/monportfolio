"use client";

import { useRouter } from "next/navigation";
import { SkillForm, SkillData } from "../../components/SkillForm";
import { SkillService } from "@/app/services/skill.service";

export default function NewSkillPage() {
    const router = useRouter();

    const handleSubmit = async (data: SkillData) => {
        await SkillService.create({
            name: data.name,
            level: data.level,
            category: data.category
        });

        // Redirect to list page on success
        router.push("/admin/skills");
    };

    return <SkillForm onSubmit={handleSubmit} />;
}
