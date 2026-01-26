"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, ArrowLeft, Cpu, Database, Server, Cloud, Terminal, Code, Layers } from "lucide-react";
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

// Helper pour le style visuel de la preview
const getCategoryStyle = (cat: string) => {
    switch (cat) {
        case "Data Engineering": return { icon: Database, color: "text-cyan-500", bg: "bg-cyan-50", bar: "bg-cyan-500", border: "border-cyan-100" };
        case "Frontend": return { icon: Code, color: "text-pink-500", bg: "bg-pink-50", bar: "bg-pink-500", border: "border-pink-100" };
        case "Backend / API": return { icon: Server, color: "text-indigo-500", bg: "bg-indigo-50", bar: "bg-indigo-500", border: "border-indigo-100" };
        case "DevOps / Cloud": return { icon: Cloud, color: "text-sky-500", bg: "bg-sky-50", bar: "bg-sky-500", border: "border-sky-100" };
        case "Linux / Admin système": return { icon: Terminal, color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-500", border: "border-emerald-100" };
        default: return { icon: Cpu, color: "text-blue-500", bg: "bg-blue-50", bar: "bg-blue-500", border: "border-blue-100" };
    }
};

export function SkillForm({ initialData, isEditing = false }: SkillFormProps) {
    const [formData, setFormData] = useState<SkillData>(initialData || {
        name: "",
        level: 50,
        category: "Data Engineering"
    });

    // Preview Logic
    const style = getCategoryStyle(formData.category);
    const PreviewIcon = style.icon;

    // Styles
    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all shadow-sm outline-none placeholder:text-slate-400";
    const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 font-sans text-slate-800">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/skills" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href="/admin/skills" className="hover:text-cyan-600 transition-colors">Compétences</Link>
                            <span>/</span>
                            <span>{isEditing ? "Édition" : "Nouvelle"}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">{isEditing ? `Modifier : ${formData.name}` : "Nouvelle compétence"}</h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* LEFT: The Form */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-slate-200/40 p-8 space-y-6 relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-50 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative">
                        <label className={labelClass}>Nom de la compétence</label>
                        <input
                            type="text"
                            placeholder="Ex: Python, Kubernetes..."
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className={`${inputClass} font-bold text-slate-700`}
                        />
                    </div>

                    <div className="relative">
                        <label className={labelClass}>Catégorie Technique</label>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value as SkillData['category'] })}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option>Data Engineering</option>
                                <option>Backend / API</option>
                                <option>DevOps / Cloud</option>
                                <option>Linux / Admin système</option>
                                <option>Frontend</option>
                                <option>Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-4">
                            <label className={labelClass}>Niveau de maîtrise</label>
                            <div className={`px-3 py-1 ${style.bg} ${style.color} rounded-lg text-sm font-bold border ${style.border}`}>
                                {formData.level}%
                            </div>
                        </div>

                        <div className="relative h-12 flex items-center">
                            {/* Track background */}
                            <div className="absolute w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${style.bar} opacity-30`}
                                    style={{ width: `${formData.level}%` }}
                                ></div>
                            </div>

                            {/* Native Slider on top */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                                className="relative w-full h-3 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-current [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95 focus:outline-none"
                                style={{ color: style.color.replace('text-', '') === 'text-cyan-500' ? '#06b6d4' : 'currentColor' }} // Hackish color mapping for thumb, ideally use class mapping
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase mt-1">
                            <span>Débutant</span>
                            <span>Intermédiaire</span>
                            <span>Expert</span>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <Link href="/admin/skills" className="flex-1">
                            <Button variant="ghost" className="w-full text-slate-500 hover:bg-slate-100 rounded-xl">Annuler</Button>
                        </Link>
                        <Button className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-xl">
                            <Save className="w-4 h-4 mr-2" />
                            Sauvegarder
                        </Button>
                    </div>

                </div>

                {/* RIGHT: Live Preview */}
                <div className="hidden md:block sticky top-8">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Aperçu en direct</h3>

                    <div className="transform transition-all duration-300 hover:scale-105">
                        {/* This mimics exactly the card in SkillsList */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">

                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center shrink-0 border border-white shadow-sm transition-colors duration-300`}>
                                    <PreviewIcon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-xl leading-tight">{formData.name || "Nom de la compétence"}</h3>
                                    <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">{formData.category}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-400">MAÎTRISE</span>
                                    <span className={`text-xl font-extrabold ${style.color}`}>{formData.level}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative">
                                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] opacity-30"></div>
                                    <div
                                        className={`h-full ${style.bar} rounded-full shadow-sm transition-all duration-300 ease-out`}
                                        style={{ width: `${formData.level}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-50 text-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wide">
                                    <Layers className="w-3 h-3" />
                                    Visible sur le portfolio
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-6 max-w-xs mx-auto">
                        Cette carte s&apos;affiche automatiquement dans la section &quot;Compétences&quot; de votre portfolio public.
                    </p>
                </div>

            </div>
        </div>
    );
}