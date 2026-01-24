"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, Calendar, Tag, Globe, CheckCircle, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

// Mock data based on real data
// Added some "details" fields for the modal
const projects = [
    {
        id: 1,
        title: "Portfolio V3",
        slug: "portfolio-v3",
        category: "Fullstack",
        status: "published",
        date: "2024-01-15",
        description: "My personal website built with Next.js 15, Tailwind 4 and Framer Motion.",
        stack: ["Next.js", "React", "Tailwind", "Framer Motion"]
    },
    {
        id: 2,
        title: "RAG Chatbot",
        slug: "rag-chatbot",
        category: "AI / ML",
        status: "draft",
        date: "2024-01-10",
        description: "A chatbot using Retrieval Augmented Generation with LangChain and OpenAI.",
        stack: ["Python", "LangChain", "OpenAI", "Pinecone"]
    },
    {
        id: 3,
        title: "E-commerce API",
        slug: "ecommerce-api",
        category: "Backend",
        status: "published",
        date: "2023-12-05",
        description: "High performance API for e-commerce handling high concurrency.",
        stack: ["Go", "Gin", "PostgreSQL", "Redis"]
    },
];

export default function ProjectsList() {
    // State for Modal
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <div className="space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Projets</h1>
                    <p className="text-slate-500">Gérez vos réalisations et études de cas.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-xl px-5">
                        <Plus className="w-5 h-5 mr-2" />
                        Nouveau Projet
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un projet..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-600">
                        <option>Tous les statuts</option>
                        <option>Publié</option>
                        <option>Brouillon</option>
                    </select>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Titre</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Catégorie</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-slate-900 block">{project.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                        {project.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${project.status === 'published'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${project.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                                            }`}></span>
                                        {project.status === 'published' ? 'Publié' : 'Brouillon'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {project.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Voir les détails (Admin)"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>

                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors inline-block"
                                            title="Modifier"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>

                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Mock */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Affichage de 1 à 3 sur 12 projets</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50">Précédent</button>
                        <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50">Suivant</button>
                    </div>
                </div>
            </div>

            {/* Modal for Project Details */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title="Détails du projet"
            >
                {selectedProject && (
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{selectedProject.title}</h2>
                                <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                                    <Globe className="w-3 h-3" /> /{selectedProject.slug}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${selectedProject.status === 'published'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                {selectedProject.status === 'published'
                                    ? <><CheckCircle className="w-3 h-3" /> Publié</>
                                    : <><CircleDashed className="w-3 h-3" /> Brouillon</>
                                }
                            </span>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">Description</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {selectedProject.description}
                            </p>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Catégorie</span>
                                <p className="font-medium text-slate-900">{selectedProject.category}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Date</span>
                                <div className="flex items-center gap-1.5 font-medium text-slate-900">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    {selectedProject.date}
                                </div>
                            </div>
                        </div>

                        {/* Stack */}
                        <div className="space-y-2">
                            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider block">Stack Technique</span>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.stack.map(tech => (
                                    <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-200">
                                        <Tag className="w-3 h-3 text-slate-400" />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end gap-3">
                            <Button variant="ghost" className="text-slate-600" onClick={() => setSelectedProject(null)}>Fermer</Button>
                            <Link href={`/admin/projects/${selectedProject.id}`}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Modifier ce projet
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
