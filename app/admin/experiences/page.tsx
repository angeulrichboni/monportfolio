"use client";

import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Building2, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Mock data based on experiences.ts
const experiences = [
    { id: 1, title: "Stagiaire IA Engineer", company: "Twisterbird-labs", start: "2025-07", end: "2025-10" },
    { id: 2, title: "Stagiaire Data Analyst", company: "Mentorness", start: "2024-06", end: "2024-07" },
    { id: 3, title: "Technicien Support Système", company: "Nouvelle Parfumerie Gandour", start: "2023-07", end: "2023-08" },
];

export default function ExperiencesList() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8 font-sans">

            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 tracking-tight">
                        Parcours Pro
                    </h1>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        Gérez votre chronologie professionnelle.
                    </p>
                </div>
                <Link href="/admin/experiences/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-2xl px-6 py-6 transition-all hover:scale-105 border border-white/10">
                        <Plus className="w-5 h-5 mr-2" />
                        <span className="font-semibold tracking-wide">Nouvelle Expérience</span>
                    </Button>
                </Link>
            </div>

            {/* Glass Container for Search */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-slate-200/50 p-2 ring-1 ring-slate-900/5">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher une entreprise, un rôle ou une technologie..."
                        className="block w-full pl-12 pr-4 py-4 border-none rounded-2xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Experience Cards Grid */}
            <div className="grid gap-5">
                {experiences.map((exp) => (
                    <div key={exp.id} className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">

                        {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">

                            {/* Left Content */}
                            <div className="flex items-start gap-5">
                                {/* Icon Box */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-white shadow-inner flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Building2 className="w-7 h-7 text-blue-600/80" />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{exp.title}</h3>
                                    <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                                        <span>{exp.company}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="font-mono text-xs uppercase tracking-wide">{exp.start} — {exp.end || 'Présent'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-end opacity-60 sm:opacity-0 group-hover:opacity-100 transition-all sm:translate-x-4 group-hover:translate-x-0">
                                <Link href={`/admin/experiences/${exp.id}`}>
                                    <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Modifier
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}