"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Eye, Calendar, Tag, Globe, CheckCircle, CircleDashed, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ProjectService } from "@/app/services/project.service";
import { Project } from "@/app/types/api";

export default function ProjectsList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ProjectService.getAll();
            setProjects(data);
        } catch (err) {
            console.error("Failed to load projects:", err);
            setError("Impossible de charger les projets.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

        try {
            setDeletingId(id);
            await ProjectService.delete(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete project:", err);
            alert("Erreur lors de la suppression.");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title_fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Chargement des projets...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Erreur</h3>
                    <p className="text-sm text-red-700 mb-4">{error}</p>
                    <button
                        onClick={loadProjects}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8 font-sans">

            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 tracking-tight">
                        Mes Projets
                    </h1>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        Gérez vos réalisations et créations numériques.
                    </p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/30 rounded-2xl px-6 py-6 transition-all hover:scale-105 border border-white/10">
                        <Plus className="w-5 h-5 mr-2" />
                        <span className="font-semibold tracking-wide">Créer un Projet</span>
                    </Button>
                </Link>
            </div>

            {/* Glass Container for Controls & Table */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-900/5">

                {/* Filters Bar */}
                <div className="p-5 border-b border-slate-100/60 flex flex-col sm:flex-row gap-4 bg-white/40">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher dans le nexus..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Projects Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/80 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-5 font-bold text-slate-600 uppercase text-xs tracking-wider">Titre du Projet</th>
                                <th className="px-6 py-5 font-bold text-slate-600 uppercase text-xs tracking-wider">Catégorie</th>
                                <th className="px-6 py-5 font-bold text-slate-600 uppercase text-xs tracking-wider">État</th>
                                <th className="px-6 py-5 text-right font-bold text-slate-600 uppercase text-xs tracking-wider">Commandes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {filteredProjects.map((project) => (
                                <tr
                                    key={project.id}
                                    className={`hover:bg-indigo-50/30 transition-colors group relative ${deletingId === project.id ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shadow-sm border border-white">
                                                {project.title_fr.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-800 block text-base group-hover:text-indigo-700 transition-colors">{project.title_fr}</span>
                                                <span className="text-xs text-slate-400 font-mono">/{project.slug}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm">
                                            {project.category || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${project.status === 'published'
                                            ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-700 border-amber-500/20'
                                            }`}>
                                            <span className="relative flex h-2 w-2">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                            </span>
                                            {project.status === 'published' ? 'En ligne' : 'Brouillon'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                title="Visualiser"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            <Link
                                                href={`/admin/projects/${project.id}`}
                                                className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
                                                title="Modifier"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && !loading && (
                        <div className="py-16 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-2">
                                {searchQuery ? "Aucun projet trouvé" : "Pas de projets disponibles"}
                            </h3>
                            <p className="text-sm text-slate-500 mb-6">
                                {searchQuery
                                    ? `Aucun résultat pour "${searchQuery}"`
                                    : "Commencez par créer votre premier projet."
                                }
                            </p>
                            {!searchQuery && (
                                <Link href="/admin/projects/new">
                                    <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/30 rounded-xl px-6">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Créer un projet
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title=""
            >
                {selectedProject && (
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex items-start justify-between mb-6 relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-800">
                                    {selectedProject.title_fr}
                                </h2>
                                <a href="#" className="text-indigo-500/80 text-sm mt-1 flex items-center gap-1 hover:text-indigo-600 transition-colors">
                                    <Globe className="w-3 h-3" />
                                    yourdomain.com/projects/{selectedProject.slug}
                                </a>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${selectedProject.status === 'published'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                {selectedProject.status === 'published'
                                    ? <><CheckCircle className="w-3 h-3" /> Publié</>
                                    : <><CircleDashed className="w-3 h-3" /> Brouillon</>
                                }
                            </span>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" /> Synopsis
                                </h4>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    {selectedProject.description_fr}
                                </p>
                            </div>

                            <div>
                                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-3">Arsenal Technique</span>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.stack.map(tech => (
                                        <span key={tech} className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                                            <Tag className="w-3 h-3 text-slate-400" />
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-8 border-t border-slate-100 flex justify-end gap-3">
                            <Button variant="ghost" className="text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-xl" onClick={() => setSelectedProject(null)}>Fermer</Button>
                            <Link href={`/admin/projects/${selectedProject.id}`}>
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Éditer le projet
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}