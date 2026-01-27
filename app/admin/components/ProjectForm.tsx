"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Save, X, Image as ImageIcon, Plus, Users, Github, ArrowLeft, Languages, UploadCloud, Link as LinkIcon, Film, Trash2, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/Button";

// -- Types mirroring data/projects.ts --
type LocalizedString = string | { fr: string; en: string };

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
    description: LocalizedString;
    content?: LocalizedString;
    problem_statement?: LocalizedString;
    architecture?: LocalizedString;
    results?: LocalizedString;
    stack: string[];
    category?: string;
    status?: "completed" | "in-progress" | "planned" | "published" | "draft";
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
    // --- State Principal ---
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

    // --- State pour la section Media (Nouveau) ---
    const [coverMode, setCoverMode] = useState<"url" | "upload">("url");
    const [assetMode, setAssetMode] = useState<"url" | "upload">("url");

    // State temporaire pour l'ajout d'un asset
    const [newAssetUrl, setNewAssetUrl] = useState("");
    const [newAssetType, setNewAssetType] = useState<"image" | "video">("image");

    // --- Helpers existants ---
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
        setTimeout(() => {
            setFormData(prev => {
                const translate = (loc: LocalizedString) => {
                    const frVal = getStr(loc, 'fr');
                    return getStr(loc, 'en') ? loc : { fr: frVal, en: `[AI Translated] ${frVal}` };
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

    // --- Helpers pour Assets ---
    const addAsset = () => {
        if (!newAssetUrl) return; // En mode upload, on gérerait le fichier ici
        const asset: ProjectAsset = { type: newAssetType, url: newAssetUrl };
        setFormData(prev => ({ ...prev, assets: [...(prev.assets || []), asset] }));
        setNewAssetUrl(""); // Reset champ
    };

    const removeAsset = (index: number) => {
        setFormData(prev => ({
            ...prev,
            assets: prev.assets?.filter((_, i) => i !== index)
        }));
    };

    // --- Styles CSS ---
    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm outline-none placeholder:text-slate-400";
    const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";
    const cardClass = "bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-slate-200/40 p-6 sm:p-8 relative overflow-hidden";
    const tabClass = (isActive: boolean) => `flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${isActive ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`;

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-24 font-sans text-slate-800">

            {/* Top Navigation Bar */}
            <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <span>Dashboard</span>
                            <span>/</span>
                            <span className="text-indigo-500">{isEditing ? "Édition" : "Création"}</span>
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-700">
                            {isEditing ? getStr(formData.title, 'fr') || "Projet sans titre" : "Nouveau Projet"}
                        </h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/projects">
                        <Button variant="ghost" className="text-slate-600 hover:bg-slate-100 rounded-xl">Annuler</Button>
                    </Link>
                    <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl px-6">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* 1. Identity & Config (Identique) */}
                    <section className={cardClass}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 rounded-full bg-indigo-500"></span>
                            Configuration Principale
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClass}>Slug URL</label>
                                <div className="flex group focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl transition-all">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-mono">/projets/</span>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="mon-super-projet"
                                        className={`flex-1 min-w-0 block w-full px-4 py-2.5 rounded-r-xl border border-slate-200 bg-white text-sm focus:border-indigo-500 outline-none font-mono text-indigo-600 font-medium`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Catégorie</label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                    >
                                        <option>Data Engineering</option>
                                        <option>Fullstack</option>
                                        <option>AI / ML</option>
                                        <option>DevOps</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Statut Actuel</label>
                                <div className="relative">
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as ProjectData['status'] })}
                                        className={`${inputClass} appearance-none cursor-pointer font-medium ${formData.status === 'published' ? 'text-emerald-600 bg-emerald-50/50 border-emerald-200' : 'text-amber-600'
                                            }`}
                                    >
                                        <option value="draft">Draft (Brouillon)</option>
                                        <option value="published">Published (En ligne)</option>
                                        <option value="archived">Archived (Masqué)</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Content (Identique) */}
                    <section className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden ring-4 ring-slate-50">
                        <div className="bg-gradient-to-r from-slate-50 via-white to-indigo-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                    <Languages className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-800 text-sm">Contenu Multilingue</h2>
                                    <p className="text-xs text-slate-400">Édition synchronisée</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleMagicTranslate}
                                className="group relative flex items-center gap-2 text-xs font-bold bg-white text-indigo-700 px-4 py-2 rounded-full border border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative flex items-center gap-2">
                                    <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin text-purple-600' : 'text-purple-500'}`} />
                                    {isTranslating ? 'Traduction IA...' : 'Auto-Translate'}
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">
                            {/* French Column */}
                            <div className="p-6 space-y-6 bg-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Français (Source)</span>
                                </div>

                                <div>
                                    <label className={labelClass}>Titre FR</label>
                                    <input className={inputClass} value={getStr(formData.title, 'fr')} onChange={e => updateLoc('title', 'fr', e.target.value)} placeholder="Titre en français" />
                                </div>
                                <div>
                                    <label className={labelClass}>Accroche (Short)</label>
                                    <textarea className={inputClass} rows={3} value={getStr(formData.description, 'fr')} onChange={e => updateLoc('description', 'fr', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Markdown FR</label>
                                    <div className="relative">
                                        <textarea className={`${inputClass} font-mono text-xs leading-relaxed`} rows={12} value={getStr(formData.content || "", 'fr')} onChange={e => updateLoc('content', 'fr', e.target.value)} />
                                        <span className="absolute bottom-2 right-2 text-[10px] text-slate-300 font-mono">MD</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-50 space-y-4">
                                    <h5 className="text-xs font-bold text-slate-400">Sections avancées</h5>
                                    <input className={inputClass} placeholder="Problématique..." value={getStr(formData.problem_statement || "", 'fr')} onChange={e => updateLoc('problem_statement', 'fr', e.target.value)} />
                                    <input className={inputClass} placeholder="Résultats..." value={getStr(formData.results || "", 'fr')} onChange={e => updateLoc('results', 'fr', e.target.value)} />
                                </div>
                            </div>

                            {/* English Column */}
                            <div className="p-6 space-y-6 bg-slate-50/30 relative">
                                {isTranslating && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                                        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <p className="mt-3 text-xs font-bold text-indigo-600 animate-pulse">Génération en cours...</p>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">English (Target)</span>
                                </div>

                                <div>
                                    <label className={labelClass}>Title EN</label>
                                    <input className={`${inputClass} border-indigo-100 bg-indigo-50/10 focus:bg-white`} value={getStr(formData.title, 'en')} onChange={e => updateLoc('title', 'en', e.target.value)} placeholder="English Title" />
                                </div>
                                <div>
                                    <label className={labelClass}>Summary</label>
                                    <textarea className={`${inputClass} border-indigo-100 bg-indigo-50/10 focus:bg-white`} rows={3} value={getStr(formData.description, 'en')} onChange={e => updateLoc('description', 'en', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Markdown EN</label>
                                    <textarea className={`${inputClass} border-indigo-100 bg-indigo-50/10 focus:bg-white font-mono text-xs leading-relaxed`} rows={12} value={getStr(formData.content || "", 'en')} onChange={e => updateLoc('content', 'en', e.target.value)} />
                                </div>
                                <div className="pt-4 border-t border-slate-100 space-y-4">
                                    <h5 className="text-xs font-bold text-slate-400">Advanced Sections</h5>
                                    <input className={`${inputClass} border-indigo-100 bg-indigo-50/10`} placeholder="Problem statement..." value={getStr(formData.problem_statement || "", 'en')} onChange={e => updateLoc('problem_statement', 'en', e.target.value)} />
                                    <input className={`${inputClass} border-indigo-100 bg-indigo-50/10`} placeholder="Results..." value={getStr(formData.results || "", 'en')} onChange={e => updateLoc('results', 'en', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Stack Widget (Identique) */}
                    <div className={cardClass}>
                        <h3 className="font-bold text-slate-900 mb-4 text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            Tech Stack
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="React, AWS..."
                                    value={newTag}
                                    onChange={e => setNewTag(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addTag()}
                                    className={`${inputClass} py-1.5`}
                                />
                                <Button size="sm" onClick={addTag} className="rounded-xl bg-slate-900 hover:bg-slate-800"><Plus className="w-4 h-4" /></Button>
                            </div>
                            <div className="flex flex-wrap gap-2 min-h-[60px] content-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                                {formData.stack.length === 0 && <span className="text-xs text-slate-400 italic p-1">Aucune technologie...</span>}
                                {formData.stack.map(tag => (
                                    <span key={tag} className="pl-3 pr-2 py-1 bg-white text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 border border-slate-200 shadow-sm group hover:border-red-200 transition-colors">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="p-0.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-md transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Widget (Identique) */}
                    <div className={cardClass}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <Users className="w-4 h-4 text-indigo-500" />
                                Participants
                            </h3>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={formData.is_team} onChange={e => setFormData({ ...formData, is_team: e.target.checked })} className="sr-only peer" />
                                <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500 shadow-inner"></div>
                            </label>
                        </div>

                        {formData.is_team ? (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                {formData.team?.map((member, idx) => (
                                    <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm space-y-2 group hover:border-indigo-200 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <input
                                                placeholder="Nom du membre"
                                                className="w-full text-sm font-bold text-slate-800 placeholder:text-slate-300 border-none p-0 focus:ring-0 bg-transparent"
                                                value={member.name}
                                                onChange={(e) => {
                                                    const newTeam = [...(formData.team || [])];
                                                    newTeam[idx].name = e.target.value;
                                                    setFormData({ ...formData, team: newTeam });
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                            <Github className="w-3 h-3 text-slate-400" />
                                            <input
                                                className="w-full bg-transparent text-xs text-slate-600 focus:ring-0 border-none p-0 placeholder:text-slate-300"
                                                placeholder="github.com/user"
                                                value={member.github_url}
                                                onChange={(e) => {
                                                    const newTeam = [...(formData.team || [])];
                                                    newTeam[idx].github_url = e.target.value;
                                                    setFormData({ ...formData, team: newTeam });
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full text-xs border-dashed border-slate-300 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl" onClick={addMember}>
                                    <Plus className="w-3 h-3 mr-1" /> Ajouter un membre
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-6 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                <p className="text-xs text-slate-400">Projet individuel activé.</p>
                            </div>
                        )}
                    </div>

                    {/* Media Widget: COVER & ASSETS (Refondu selon demande) */}
                    <div className={cardClass}>
                        <h3 className="font-bold text-slate-900 mb-6 text-sm flex items-center gap-2">
                            <MonitorPlay className="w-4 h-4 text-pink-500" />
                            Média & Galerie
                        </h3>

                        <div className="space-y-8">

                            {/* SECTION 1: COVER (Single, Unique) */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className={labelClass}>Image de Couverture</label>

                                    {/* Tabs Cover */}
                                    <div className="bg-slate-100 p-0.5 rounded-lg flex gap-1 w-32">
                                        <button
                                            onClick={() => setCoverMode('url')}
                                            className={tabClass(coverMode === 'url')}
                                        >
                                            Link
                                        </button>
                                        <button
                                            onClick={() => setCoverMode('upload')}
                                            className={tabClass(coverMode === 'upload')}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>

                                {coverMode === 'url' ? (
                                    <div className="relative group">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                        <input
                                            className={`${inputClass} pl-10`}
                                            placeholder="https://..."
                                            value={formData.cover_image_url}
                                            onChange={e => setFormData({ ...formData, cover_image_url: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-indigo-100 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group bg-slate-50/30">
                                        <UploadCloud className="w-6 h-6 text-indigo-300 group-hover:text-indigo-500 mb-1 transition-colors" />
                                        <span className="text-[10px] font-bold text-slate-500">Glisser image principale</span>
                                    </div>
                                )}

                                {/* Preview Cover */}
                                {formData.cover_image_url && (
                                    <div className="relative mt-2 rounded-xl overflow-hidden h-32 w-full bg-slate-900 group shadow-md border border-slate-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.cover_image_url} alt="Cover Preview" className="w-full h-full object-cover opacity-90 transition-opacity" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setFormData({ ...formData, cover_image_url: "" })}
                                                className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-red-500/80 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">MAIN COVER</span>
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-px bg-slate-100" />

                            {/* SECTION 2: ASSETS (Multiple + Type Selection) */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className={labelClass}>Galerie (Assets)</label>

                                    {/* Tabs Assets */}
                                    <div className="bg-slate-100 p-0.5 rounded-lg flex gap-1 w-32">
                                        <button
                                            onClick={() => setAssetMode('url')}
                                            className={tabClass(assetMode === 'url')}
                                        >
                                            Link
                                        </button>
                                        <button
                                            onClick={() => setAssetMode('upload')}
                                            className={tabClass(assetMode === 'upload')}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>

                                {assetMode === 'url' ? (
                                    <div className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex group focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl transition-all shadow-sm">
                                                <div className="bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl px-2 flex items-center">
                                                    <select
                                                        value={newAssetType}
                                                        onChange={(e) => setNewAssetType(e.target.value as "image" | "video")}
                                                        className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer py-2"
                                                    >
                                                        <option value="image">IMG</option>
                                                        <option value="video">VID</option>
                                                    </select>
                                                </div>
                                                <input
                                                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-r-xl outline-none placeholder:text-slate-400"
                                                    placeholder="https://..."
                                                    value={newAssetUrl}
                                                    onChange={e => setNewAssetUrl(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && addAsset()}
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={addAsset} size="sm" className="h-[38px] w-[38px] p-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center shrink-0">
                                            <Plus className="w-5 h-5" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-indigo-100 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group bg-slate-50/30">
                                        <div className="flex gap-4 mb-1">
                                            <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 cursor-pointer hover:text-indigo-500">
                                                <input type="radio" name="uploadType" checked={newAssetType === 'image'} onChange={() => setNewAssetType('image')} className="accent-indigo-500" /> Image
                                            </label>
                                            <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 cursor-pointer hover:text-indigo-500">
                                                <input type="radio" name="uploadType" checked={newAssetType === 'video'} onChange={() => setNewAssetType('video')} className="accent-indigo-500" /> Vidéo
                                            </label>
                                        </div>
                                        <UploadCloud className="w-6 h-6 text-indigo-300 group-hover:text-indigo-500 transition-colors" />
                                        <span className="text-[10px] font-bold text-slate-500 mt-1">Glisser pour ajouter</span>
                                    </div>
                                )}

                                {/* Assets List */}
                                <div className="space-y-2 mt-2">
                                    {formData.assets?.map((asset, i) => (
                                        <div key={i} className="group flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${asset.type === 'video' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-blue-500'}`}>
                                                    {asset.type === 'video' ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-xs font-medium text-slate-700 truncate block max-w-[140px]">{asset.url}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{asset.type}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeAsset(i)}
                                                className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {(!formData.assets || formData.assets.length === 0) && (
                                        <div className="text-center py-2 text-xs text-slate-300 italic">
                                            Aucun asset additionnel.
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}