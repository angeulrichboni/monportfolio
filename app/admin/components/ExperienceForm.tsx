"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Save, Building, ListPlus, Trash2, ArrowLeft, Calendar, GripVertical, Rocket, Languages, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AIService } from "@/app/services/ai.service";

// -- Types mirroring data/experiences.ts --
type LocalizedString = string | { fr: string; en: string };

const getStr = (loc: LocalizedString, lang: 'fr' | 'en') => {
    if (typeof loc === 'string') return loc;
    return loc[lang] || "";
};

export interface ExperienceData {
    id?: string;
    title: LocalizedString;
    company: LocalizedString;
    start_date: string;
    end_date?: string;
    description: LocalizedString[]; // Array of LocalizedStrings
    technologies?: string[];
}

interface ExperienceFormProps {
    initialData?: ExperienceData;
    isEditing?: boolean;
    onSubmit?: (data: ExperienceData) => Promise<void>;
    isSubmitting?: boolean;
}

export function ExperienceForm({ initialData, isEditing = false, onSubmit, isSubmitting = false }: ExperienceFormProps) {
    // Default State
    const [formData, setFormData] = useState<ExperienceData>(initialData || {
        title: { fr: "", en: "" },
        company: { fr: "", en: "" },
        start_date: "",
        end_date: "",
        description: [{ fr: "", en: "" }],
        technologies: []
    });

    const [isTranslating, setIsTranslating] = useState(false);
    const [newTech, setNewTech] = useState("");

    const updateLoc = (field: keyof ExperienceData, lang: 'fr' | 'en', value: string) => {
        setFormData(prev => {
            const current = prev[field] as LocalizedString || { fr: "", en: "" };
            const newLoc = typeof current === 'string'
                ? { fr: current, en: current, [lang]: value }
                : { ...current, [lang]: value };
            return { ...prev, [field]: newLoc };
        });
    };

    // Special handler for description array
    const updateDesc = (index: number, lang: 'fr' | 'en', value: string) => {
        setFormData(prev => {
            const newDesc = [...prev.description];
            const current = newDesc[index];
            const newLoc = typeof current === 'string'
                ? { fr: current, en: current, [lang]: value }
                : { ...current, [lang]: value };
            newDesc[index] = newLoc;
            return { ...prev, description: newDesc };
        });
    };

    const addDescTask = () => {
        setFormData(prev => ({
            ...prev,
            description: [...prev.description, { fr: "", en: "" }]
        }));
    };

    const removeDescTask = (index: number) => {
        setFormData(prev => ({
            ...prev,
            description: prev.description.filter((_, i) => i !== index)
        }));
    };

    const handleMagicTranslate = async () => {
        setIsTranslating(true);
        try {
            // Translate title
            const titleFr = getStr(formData.title, 'fr');
            const titleEn = titleFr ? await AIService.translate(titleFr) : "";

            // Translate company
            const companyFr = getStr(formData.company, 'fr');
            const companyEn = companyFr ? await AIService.translate(companyFr) : "";

            // Translate descriptions (parallel)
            const descPromises = formData.description.map(desc => {
                const frText = getStr(desc, 'fr');
                return frText ? AIService.translate(frText) : Promise.resolve("");
            });
            const descEn = await Promise.all(descPromises);

            // Helper to ensure we have an object before spreading
            const toObj = (val: LocalizedString) => typeof val === 'string' ? { fr: val, en: "" } : val;

            // Update form with translations
            setFormData(prev => ({
                ...prev,
                title: { ...toObj(prev.title), en: titleEn },
                company: { ...toObj(prev.company), en: companyEn },
                description: prev.description.map((desc, i) => ({
                    ...toObj(desc),
                    en: descEn[i]
                }))
            }));
        } catch (err) {
            console.error('Translation failed:', err);
            alert('Erreur de traduction. Veuillez réessayer.');
        } finally {
            setIsTranslating(false);
        }
    };

    // --- Common Styles ---
    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm outline-none placeholder:text-slate-400";
    const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";
    const cardClass = "bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-slate-200/40 p-6 sm:p-8 relative overflow-hidden";

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-24 font-sans text-slate-800">

            {/* Sticky Header */}
            <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/experiences" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <span>Carrière</span>
                            <span>/</span>
                            <span className="text-blue-500">{isEditing ? "Édition" : "Nouveau poste"}</span>
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-700">
                            {isEditing ? getStr(formData.company, 'fr') || "Expérience" : "Ajouter une expérience"}
                        </h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/experiences">
                        <Button variant="ghost" className="text-slate-600 hover:bg-slate-100 rounded-xl">Annuler</Button>
                    </Link>
                    <Button
                        onClick={async () => {
                            if (onSubmit) {
                                try {
                                    await onSubmit(formData);
                                } catch {
                                    // Error handled by parent
                                }
                            }
                        }}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 rounded-xl px-6"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Enregistrement...' : 'Sauvegarder'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column (Main) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* 1. Context (Dates) */}
                    <section className={cardClass}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 rounded-full bg-blue-500"></span>
                            Contexte Temporel
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className={labelClass}>Début du contrat</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <input
                                        type="month"
                                        className={`${inputClass} pl-10 cursor-pointer`}
                                        value={formData.start_date}
                                        onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fin du contrat</label>

                                    {/* Toggle for "Current Position" */}
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500 transition-colors">POSTE ACTUEL</span>
                                        <div className="relative inline-flex items-center">
                                            <input type="checkbox" checked={!formData.end_date} onChange={e => setFormData({ ...formData, end_date: e.target.checked ? "" : (formData.end_date || new Date().toISOString().slice(0, 7)) })} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                                        </div>
                                    </label>
                                </div>

                                <div className={`relative transition-opacity duration-300 ${!formData.end_date ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <input
                                        type="month"
                                        className={`${inputClass} pl-10 cursor-pointer`}
                                        value={formData.end_date}
                                        disabled={!formData.end_date}
                                        onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Details (Split View) */}
                    <section className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden ring-4 ring-slate-50">
                        {/* Magic Bar */}
                        <div className="bg-gradient-to-r from-slate-50 via-white to-blue-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                    <Languages className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-800 text-sm">Détails du Poste</h2>
                                    <p className="text-xs text-slate-400">Description & Missions</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleMagicTranslate}
                                className="group relative flex items-center gap-2 text-xs font-bold bg-white text-blue-700 px-4 py-2 rounded-full border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative flex items-center gap-2">
                                    <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin text-purple-600' : 'text-purple-500'}`} />
                                    {isTranslating ? 'Traduction...' : 'Auto-Translate'}
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">

                            {/* FR Column */}
                            <div className="p-6 space-y-6 bg-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Français</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Intitulé du poste</label>
                                        <input className={inputClass} value={getStr(formData.title, 'fr')} onChange={e => updateLoc('title', 'fr', e.target.value)} placeholder="Ex: Développeur Fullstack" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Entreprise</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input className={`${inputClass} pl-10`} value={getStr(formData.company, 'fr')} onChange={e => updateLoc('company', 'fr', e.target.value)} placeholder="Nom de l'entreprise" />
                                        </div>
                                    </div>

                                    {/* Dynamic Task List FR */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <label className={labelClass}>Missions & Responsabilités</label>
                                        </div>
                                        <div className="space-y-3">
                                            {formData.description.map((task, i) => (
                                                <div key={i} className="flex gap-2 group">
                                                    <div className="mt-2.5 text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-400">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>
                                                    <textarea
                                                        rows={2}
                                                        className={`${inputClass} resize-none`}
                                                        value={getStr(task, 'fr')}
                                                        onChange={e => updateDesc(i, 'fr', e.target.value)}
                                                        placeholder={`Mission ${i + 1}...`}
                                                    />
                                                    <button onClick={() => removeDescTask(i)} className="mt-2 p-1.5 h-fit text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={addDescTask}
                                                className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 mt-2"
                                            >
                                                <ListPlus className="w-4 h-4" /> Ajouter une mission
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EN Column */}
                            <div className="p-6 space-y-6 bg-slate-50/30 relative">
                                {isTranslating && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                                        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
                                        <p className="mt-3 text-xs font-bold text-blue-600 animate-pulse">Traduction...</p>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">English</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Job Title</label>
                                        <input className={`${inputClass} border-blue-100 bg-blue-50/10 focus:bg-white`} value={getStr(formData.title, 'en')} onChange={e => updateLoc('title', 'en', e.target.value)} placeholder="Ex: Fullstack Developer" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Company</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input className={`${inputClass} pl-10 border-blue-100 bg-blue-50/10 focus:bg-white`} value={getStr(formData.company, 'en')} onChange={e => updateLoc('company', 'en', e.target.value)} placeholder="Company Name" />
                                        </div>
                                    </div>

                                    {/* Dynamic Task List EN (Read-only structure mostly, mirrors FR count) */}
                                    <div>
                                        <label className={labelClass}>Tasks & Responsibilities</label>
                                        <div className="space-y-3">
                                            {formData.description.map((task, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <div className="w-4 mt-2.5"></div> {/* Spacer for grip */}
                                                    <textarea
                                                        rows={2}
                                                        className={`${inputClass} resize-none border-blue-100 bg-blue-50/10 focus:bg-white`}
                                                        value={getStr(task, 'en')}
                                                        onChange={e => updateDesc(i, 'en', e.target.value)}
                                                        placeholder={`Task ${i + 1}...`}
                                                    />
                                                    <div className="w-7"></div> {/* Spacer for delete button */}
                                                </div>
                                            ))}
                                            {/* Spacer for Add Button */}
                                            <div className="h-[34px] mt-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Tech Stack Widget */}
                    <div className={cardClass}>
                        <h3 className="font-bold text-slate-900 mb-4 text-sm flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-amber-500" />
                            Technologies & Outils
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="React, Python, Figma..."
                                    value={newTech}
                                    onChange={e => setNewTech(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && newTech) {
                                            setFormData(prev => ({ ...prev, technologies: [...(prev.technologies || []), newTech] }));
                                            setNewTech("");
                                        }
                                    }}
                                    className={`${inputClass} py-1.5`}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 min-h-[60px] content-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                                {(!formData.technologies || formData.technologies.length === 0) && (
                                    <span className="text-xs text-slate-400 italic p-1">Aucune technologie...</span>
                                )}
                                {formData.technologies?.map(t => (
                                    <span key={t} className="pl-3 pr-2 py-1 bg-white text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 border border-slate-200 shadow-sm group hover:border-red-200 transition-colors">
                                        {t}
                                        <button
                                            onClick={() => setFormData(p => ({ ...p, technologies: p.technologies?.filter(tech => tech !== t) }))}
                                            className="p-0.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-md transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}