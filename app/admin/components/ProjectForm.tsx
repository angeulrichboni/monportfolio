"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Save, X, Image as ImageIcon, Plus, Users, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";

// -- Types mirroring data/projects.ts --
type LocalizedString = string | { fr: string; en: string };

// Helper to safely get string from LocalizedString (fallback logic)
const getStr = (loc: LocalizedString, lang: 'fr' | 'en') => {
    if (typeof loc === 'string') return loc;
    return loc[lang] || "";
};

interface ProjectAsset {
    id?: string;
    type: "image" | "video";
    url: string;
    caption?: LocalizedString;
}

interface ProjectMember {
    name: string;
    github_url?: string;
    portfolio_url?: string;
    linkedin_url?: string;
}

export interface ProjectData {
    id?: string;
    slug: string;
    title: LocalizedString;
    description: LocalizedString; // Short description
    content?: LocalizedString;    // Full markdown content
    problem_statement?: LocalizedString;
    architecture?: LocalizedString;
    results?: LocalizedString;
    stack: string[];
    category?: string;
    status?: "completed" | "in-progress" | "planned" | "published" | "draft"; // Merged types
    github_url?: string;
    demo_url?: string;
    cover_image_url?: string;
    assets?: ProjectAsset[];
    is_team?: boolean;
    team?: ProjectMember[];
}

interface ProjectFormProps {
    initialData?: ProjectData;
    isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    // Initialize state with deep merge or defaults
    const [formData, setFormData] = useState<ProjectData>(initialData || {
        slug: "",
        title: { fr: "", en: "" },
        description: { fr: "", en: "" },
        content: { fr: "", en: "" },
        problem_statement: { fr: "", en: "" },
        architecture: { fr: "", en: "" },
        results: { fr: "", en: "" },
        stack: [],
        category: "Fullstack",
        status: "draft",
        assets: [],
        is_team: false,
        team: []
    });

    const [isTranslating, setIsTranslating] = useState(false);
    const [newTag, setNewTag] = useState("");

    // Handler helpers
    const updateLoc = (field: keyof ProjectData, lang: 'fr' | 'en', value: string) => {
        setFormData(prev => {
            const current = prev[field] as LocalizedString || { fr: "", en: "" };
            const newLoc = typeof current === 'string'
                ? { fr: current, en: current, [lang]: value }
                : { ...current, [lang]: value };
            return { ...prev, [field]: newLoc };
        });
    };

    const handleMagicTranslate = () => {
        setIsTranslating(true);
        // Simulation: Copy FR to EN with specific prefixes to show it worked
        setTimeout(() => {
            setFormData(prev => {
                const translate = (loc: LocalizedString) => {
                    const frVal = getStr(loc, 'fr');
                    // If EN is empty, "translate" it
                    return getStr(loc, 'en') ? loc : { fr: frVal, en: `[EN] ${frVal}` };
                };

                return {
                    ...prev,
                    title: translate(prev.title),
                    description: translate(prev.description),
                    content: translate(prev.content || ""),
                    problem_statement: translate(prev.problem_statement || ""),
                    architecture: translate(prev.architecture || ""),
                    results: translate(prev.results || ""),
                };
            });
            setIsTranslating(false);
        }, 1500);
    };

    const addTag = () => {
        if (newTag && !formData.stack.includes(newTag)) {
            setFormData(prev => ({ ...prev, stack: [...prev.stack, newTag] }));
            setNewTag("");
        }
    };

    const removeTag = (tag: string) => {
        setFormData(prev => ({ ...prev, stack: prev.stack.filter(t => t !== tag) }));
    };

    const addMember = () => {
        setFormData(prev => ({
            ...prev,
            team: [...(prev.team || []), { name: "Nouveau membre" }]
        }));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <Link href="/admin/projects" className="hover:text-blue-600 transition-colors">Projets</Link>
                        <span>/</span>
                        <span>{isEditing ? "Édition" : "Nouveau"}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{isEditing ? `Modifier : ${getStr(formData.title, 'fr')}` : "Créer un projet"}</h1>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/projects">
                        <Button variant="ghost" className="text-slate-600">Annuler</Button>
                    </Link>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Identity & Config */}
                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                        <h2 className="font-semibold text-slate-900 border-b border-slate-100 pb-4">Configuration</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Slug (URL)</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm">/projets/</span>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="mon-projet-incroyable"
                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>Data Engineering</option>
                                    <option>Fullstack</option>
                                    <option>AI / ML</option>
                                    <option>DevOps</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as ProjectData['status'] })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="draft">Brouillon</option>
                                    <option value="published">Publié</option>
                                    <option value="archived">Archivé</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* 2. Content (Localized) */}
                    <section className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden ring-1 ring-blue-50">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                </div>
                                <h2 className="font-semibold text-slate-900">Contenu (FR / EN)</h2>
                            </div>
                            <button
                                type="button"
                                onClick={handleMagicTranslate}
                                className="group flex items-center gap-2 text-xs font-semibold bg-white text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm hover:shadow hover:border-blue-300 transition-all active:scale-95"
                            >
                                <Sparkles className={`w-3 h-3 ${isTranslating ? 'animate-spin text-purple-600' : 'text-purple-500 group-hover:scale-110'}`} />
                                {isTranslating ? 'Génération...' : 'Traduire tout'}
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* French Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                    <span className="w-4 h-3 rounded-sm bg-slate-200 bg-[url('https://flagcdn.com/w40/fr.png')] bg-cover block shadow-sm"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Français</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="label-sm">Titre</label>
                                        <input className="input-std" value={getStr(formData.title, 'fr')} onChange={e => updateLoc('title', 'fr', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-sm">Description courte</label>
                                        <textarea className="input-std" rows={3} value={getStr(formData.description, 'fr')} onChange={e => updateLoc('description', 'fr', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-sm">Contenu Markdown</label>
                                        <textarea className="input-std font-mono text-xs" rows={10} value={getStr(formData.content || "", 'fr')} onChange={e => updateLoc('content', 'fr', e.target.value)} />
                                    </div>
                                    {/* Advanced Fields */}
                                    <div>
                                        <label className="label-sm">Problématique (Optionnel)</label>
                                        <textarea className="input-std" rows={3} value={getStr(formData.problem_statement || "", 'fr')} onChange={e => updateLoc('problem_statement', 'fr', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-sm">Résultats (Optionnel)</label>
                                        <textarea className="input-std" rows={3} value={getStr(formData.results || "", 'fr')} onChange={e => updateLoc('results', 'fr', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* English Column */}
                            <div className="space-y-6 relative">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                    <span className="w-4 h-3 rounded-sm bg-slate-200 bg-[url('https://flagcdn.com/w40/gb.png')] bg-cover block shadow-sm"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">English</span>
                                </div>

                                {isTranslating && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-lg">
                                        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mb-2"></div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="label-sm">Title</label>
                                        <input className="input-std bg-purple-50/20 border-purple-100" value={getStr(formData.title, 'en')} onChange={e => updateLoc('title', 'en', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-sm">Short Description</label>
                                        <textarea className="input-std bg-purple-50/20 border-purple-100" rows={3} value={getStr(formData.description, 'en')} onChange={e => updateLoc('description', 'en', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-sm">Markdown Content</label>
                                        <textarea className="input-std bg-purple-50/20 border-purple-100 font-mono text-xs" rows={10} value={getStr(formData.content || "", 'en')} onChange={e => updateLoc('content', 'en', e.target.value)} />
                                    </div>
                                    {/* Advanced Fields */}
                                    <div>
                                        <label className="label-sm">Problem Statement</label>
                                        <textarea className="input-std bg-purple-50/20 border-purple-100" rows={3} value={getStr(formData.problem_statement || "", 'en')} onChange={e => updateLoc('problem_statement', 'en', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-sm">Results</label>
                                        <textarea className="input-std bg-purple-50/20 border-purple-100" rows={3} value={getStr(formData.results || "", 'en')} onChange={e => updateLoc('results', 'en', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Tech Stack */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-semibold text-slate-900 mb-4 text-sm">Stack Technique</h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add tool..."
                                    value={newTag}
                                    onChange={e => setNewTag(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addTag()}
                                    className="flex-1 input-std"
                                />
                                <Button size="sm" onClick={addTag}><Plus className="w-4 h-4" /></Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.stack.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md flex items-center gap-1 group">
                                        {tag}
                                        <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => removeTag(tag)} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2"><Users className="w-4 h-4" /> Équipe</h3>
                            <label className="scale-75 switch inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={formData.is_team} onChange={e => setFormData({ ...formData, is_team: e.target.checked })} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {formData.is_team && (
                            <div className="space-y-3">
                                {formData.team?.map((member, idx) => (
                                    <div key={idx} className="p-2 border border-slate-100 rounded-lg space-y-2 text-xs">
                                        <input
                                            placeholder="Nom"
                                            className="w-full border-none bg-transparent p-0 focus:ring-0 font-medium placeholder:text-slate-300"
                                            value={member.name}
                                            onChange={(e) => {
                                                const newTeam = [...(formData.team || [])];
                                                newTeam[idx].name = e.target.value;
                                                setFormData({ ...formData, team: newTeam });
                                            }}
                                        />
                                        <div className="flex gap-1">
                                            <Github className="w-3 h-3 text-slate-400" />
                                            <input className="w-full border-none bg-transparent p-0 text-slate-500 focus:ring-0" placeholder="GitHub URL" value={member.github_url} onChange={(e) => {
                                                const newTeam = [...(formData.team || [])];
                                                newTeam[idx].github_url = e.target.value;
                                                setFormData({ ...formData, team: newTeam });
                                            }} />
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addMember}>
                                    <Plus className="w-3 h-3 mr-1" /> Ajouter membre
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Media / Assets */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-semibold text-slate-900 mb-4 text-sm">Cover & Assets</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="label-sm">Cover Image URL</label>
                                <input className="input-std" placeholder="https://..." value={formData.cover_image_url} onChange={e => setFormData({ ...formData, cover_image_url: e.target.value })} />
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                                <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 mb-2" />
                                <p className="text-xs text-slate-500">Upload Media</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Quick CSS helper for inputs */}
            <style jsx global>{`
        .label-sm { @apply block text-xs font-medium text-slate-500 mb-1.5; }
        .input-std { @apply w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all; }
      `}</style>
        </div>
    );
}
