"use client";

import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Mock data based on experiences.ts
const experiences = [
    { id: 1, title: "Stagiaire IA Engineer", company: "Twisterbird-labs", start: "2025-07", end: "2025-10" },
    { id: 2, title: "Stagiaire Data Analyst", company: "Mentorness", start: "2024-06", end: "2024-07" },
    { id: 3, title: "Technicien Support Système", company: "Nouvelle Parfumerie Gandour", start: "2023-07", end: "2023-08" },
];

export default function ExperiencesList() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Expériences</h1>
                    <p className="text-slate-500">Gérez votre parcours professionnel.</p>
                </div>
                <Link href="/admin/experiences/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-xl px-5">
                        <Plus className="w-5 h-5 mr-2" />
                        Nouvelle Expérience
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une entreprise ou un poste..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 text-lg">{exp.title}</h3>
                                <p className="text-slate-600 font-medium">{exp.company}</p>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{exp.start} — {exp.end}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/experiences/${exp.id}`}>
                                <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-600">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Modifier
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" className="text-red-500 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
