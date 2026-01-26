"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, Cpu, Database, Cloud, Server, Code, Terminal, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

const skills = [
    { id: 1, name: "Python", level: 90, category: "Data Engineering" },
    { id: 2, name: "SQL", level: 85, category: "Data Engineering" },
    { id: 3, name: "React", level: 75, category: "Frontend" },
];

// Helper pour mapper les icônes/couleurs selon la catégorie (Visuel uniquement)
const getCategoryStyle = (cat: string) => {
    switch(cat) {
        case "Data Engineering": return { icon: Database, color: "text-cyan-500", bg: "bg-cyan-50", bar: "bg-cyan-500" };
        case "Frontend": return { icon: Code, color: "text-pink-500", bg: "bg-pink-50", bar: "bg-pink-500" };
        case "Backend / API": return { icon: Server, color: "text-indigo-500", bg: "bg-indigo-50", bar: "bg-indigo-500" };
        case "DevOps / Cloud": return { icon: Cloud, color: "text-sky-500", bg: "bg-sky-50", bar: "bg-sky-500" };
        case "Linux / Admin système": return { icon: Terminal, color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-500" };
        default: return { icon: Cpu, color: "text-blue-500", bg: "bg-blue-50", bar: "bg-blue-500" };
    }
};

export default function SkillsList() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8 font-sans">
            
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900 tracking-tight">
                        Compétences
                    </h1>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-500" />
                        Gérez votre arsenal technique et niveaux de maîtrise.
                    </p>
                </div>
                <Link href="/admin/skills/new">
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 rounded-2xl px-6 py-6 transition-all hover:scale-105 border border-white/10">
                        <Plus className="w-5 h-5 mr-2" />
                        <span className="font-semibold tracking-wide">Ajouter Skill</span>
                    </Button>
                </Link>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {skills.map((skill) => {
                    const style = getCategoryStyle(skill.category);
                    const Icon = style.icon;

                    return (
                        <div key={skill.id} className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 hover:-translate-y-1">
                            
                            {/* Actions (Floating Top Right) */}
                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                                <Link
                                    href={`/admin/skills/${skill.id}`}
                                    className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                                    title="Modifier"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Supprimer">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Header: Icon & Name */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center shrink-0 border border-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{skill.name}</h3>
                                    <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">{skill.category}</p>
                                </div>
                            </div>

                            {/* Level Meter */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-400">MAÎTRISE</span>
                                    <span className={`text-sm font-extrabold ${style.color}`}>{skill.level}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative">
                                    {/* Background stripes for tech effect */}
                                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] opacity-30"></div>
                                    
                                    <div
                                        className={`h-full ${style.bar} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out`}
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}