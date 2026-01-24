"use client";

import { useState } from "react";
import Link from "next/link";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Types
export interface SkillData {
    id?: string;
    name: string;
    level?: number;
    category: "Data Engineering" | "Backend / API" | "Linux / Admin système" | "DevOps / Cloud" | "Frontend" | "Other";
}

interface SkillFormProps {
    initialData?: SkillData;
    isEditing?: boolean;
}

export function SkillForm({ initialData, isEditing = false }: SkillFormProps) {
    const [formData, setFormData] = useState<SkillData>(initialData || {
        name: "",
        level: 50,
        category: "Data Engineering"
    });

    return (
        <div className="max-w-xl mx-auto space-y-8 pb-20">

            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <Link href="/admin/skills" className="hover:text-blue-600 transition-colors">Compétences</Link>
                        <span>/</span>
                        <span>{isEditing ? "Édition" : "Nouvelle"}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{isEditing ? `Modifier : ${formData.name}` : "Ajouter une compétence"}</h1>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom de la compétence</label>
                    <input
                        type="text"
                        placeholder="Ex: Python"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value as SkillData['category'] })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option>Data Engineering</option>
                        <option>Backend / API</option>
                        <option>DevOps / Cloud</option>
                        <option>Linux / Admin système</option>
                        <option>Frontend</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-slate-700">Niveau de maîtrise</label>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">{formData.level}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Débutant</span>
                        <span>Expert</span>
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                    </Button>
                    <Link href="/admin/skills" className="flex-1">
                        <Button variant="outline" className="w-full">Annuler</Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
