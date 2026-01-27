"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, Building2, Calendar, Briefcase, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ExperienceService } from "@/app/services/experience.service";
import { Experience } from "@/app/types/api";

export default function ExperiencesList() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ExperienceService.getAll();
            setExperiences(data);
        } catch (err) {
            console.error("Failed to load experiences:", err);
            setError("Impossible de charger les expériences. Vérifiez que le backend est accessible.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
            return;
        }

        try {
            setDeletingId(id);
            await ExperienceService.delete(id);
            setExperiences(experiences.filter(exp => exp.id !== id));
        } catch (err) {
            console.error("Failed to delete experience:", err);
            alert("Erreur lors de la suppression. Veuillez réessayer.");
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateStr: string) => {
        const [year, month] = dateStr.split('-');
        return `${month}/${year}`;
    };

    // Filter experiences based on search query
    const filteredExperiences = experiences.filter(exp =>
        exp.title_fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company_fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Chargement des expériences...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-red-900 mb-2">Erreur de connexion</h3>
                    <p className="text-sm text-red-700 mb-4">{error}</p>
                    <Button onClick={loadExperiences} className="bg-red-600 hover:bg-red-700 text-white">
                        Réessayer
                    </Button>
                </div>
            </div>
        );
    }

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 border-none rounded-2xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Empty State */}
            {filteredExperiences.length === 0 && !searchQuery && (
                <div className="text-center py-20">
                    <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 mb-2">Aucune expérience</h3>
                    <p className="text-slate-400 mb-6">Commencez par ajouter votre première expérience professionnelle.</p>
                    <Link href="/admin/experiences/new">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter une expérience
                        </Button>
                    </Link>
                </div>
            )}

            {/* No Search Results */}
            {filteredExperiences.length === 0 && searchQuery && (
                <div className="text-center py-20">
                    <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 mb-2">Aucun résultat</h3>
                    <p className="text-slate-400">Aucune expérience ne correspond à &quot;{searchQuery}&quot;</p>
                </div>
            )}

            {/* Experience Cards Grid */}
            <div className="grid gap-5">
                {filteredExperiences.map((exp) => {
                    const isDeleting = deletingId === exp.id;

                    return (
                        <div key={exp.id} className={`group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>

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
                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{exp.title_fr}</h3>
                                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                                            <span>{exp.company_fr}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span className="font-mono text-xs uppercase tracking-wide">
                                                    {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : 'Présent'}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Technologies */}
                                        {exp.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {exp.technologies.slice(0, 5).map(tech => (
                                                    <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {exp.technologies.length > 5 && (
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-medium rounded-md">
                                                        +{exp.technologies.length - 5}
                                                    </span>
                                                )}
                                            </div>
                                        )}
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
                                    <Button
                                        onClick={() => handleDelete(exp.id, exp.title_fr)}
                                        disabled={isDeleting}
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}