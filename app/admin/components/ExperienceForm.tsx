"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Save, Building, ListPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
}

export function ExperienceForm({ initialData, isEditing = false }: ExperienceFormProps) {
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

    const handleMagicTranslate = () => {
        setIsTranslating(true);
        setTimeout(() => {
            setFormData(prev => {
                const translate = (loc: LocalizedString) => {
                    const frVal = getStr(loc, 'fr');
                    return getStr(loc, 'en') ? loc : { fr: frVal, en: `[Translated] ${frVal}` };
                };

                return {
                    ...prev,
                    title: translate(prev.title),
                    company: translate(prev.company),
                    description: prev.description.map(translate)
                };
            });
            setIsTranslating(false);
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">

            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <Link href="/admin/experiences" className="hover:text-blue-600 transition-colors">Expériences</Link>
                        <span>/</span>
                        <span>{isEditing ? "Édition" : "Nouvelle"}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{isEditing ? `Modifier : ${getStr(formData.company, 'fr')}` : "Ajouter une expérience"}</h1>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/experiences">
                        <Button variant="ghost" className="text-slate-600">Annuler</Button>
                    </Link>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-8">

                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                        <h2 className="font-semibold text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <Building className="w-5 h-5 text-slate-400" />
                            Contexte
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label-sm">Date de début</label>
                                    <input type="month" className="input-std" value={formData.start_date} onChange={e => setFormData({ ...formData, start_date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="label-sm">Date de fin</label>
                                    <input type="month" className="input-std" value={formData.end_date} onChange={e => setFormData({ ...formData, end_date: e.target.value })} />
                                    <div className="mt-2 flex items-center gap-2">
                                        <input type="checkbox" checked={!formData.end_date} onChange={e => setFormData({ ...formData, end_date: e.target.checked ? "" : formData.end_date })} className="rounded border-slate-300 text-blue-600" />
                                        <label className="text-xs text-slate-600">Poste actuel</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden ring-1 ring-blue-50">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                </div>
                                <h2 className="font-semibold text-slate-900">Détails (Multilingue)</h2>
                            </div>
                            <button type="button" onClick={handleMagicTranslate} className="group flex items-center gap-2 text-xs font-semibold bg-white text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm hover:shadow hover:border-blue-300 transition-all active:scale-95">
                                <Sparkles className={`w-3 h-3 ${isTranslating ? 'animate-spin text-purple-600' : 'text-purple-500'}`} />
                                {isTranslating ? 'Traduction...' : 'Auto-Translate'}
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                            {/* FR */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2"><span className="w-4 h-3 bg-slate-200 block"></span><span className="text-xs font-bold text-slate-400">FR</span></div>
                                <div>
                                    <label className="label-sm">Intitulé du poste</label>
                                    <input className="input-std" value={getStr(formData.title, 'fr')} onChange={e => updateLoc('title', 'fr', e.target.value)} />
                                </div>
                                <div>
                                    <label className="label-sm">Entreprise</label>
                                    <input className="input-std" value={getStr(formData.company, 'fr')} onChange={e => updateLoc('company', 'fr', e.target.value)} />
                                </div>
                                <div>
                                    <label className="label-sm">Missions</label>
                                    <div className="space-y-2">
                                        {formData.description.map((task, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input className="input-std flex-1" value={getStr(task, 'fr')} onChange={e => updateDesc(i, 'fr', e.target.value)} />
                                                <button onClick={() => removeDescTask(i)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        <button onClick={addDescTask} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><ListPlus className="w-3 h-3" /> Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            {/* EN */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2"><span className="w-4 h-3 bg-slate-200 block"></span><span className="text-xs font-bold text-slate-400">EN</span></div>
                                <div>
                                    <label className="label-sm">Job Title</label>
                                    <input className="input-std bg-purple-50/20 border-purple-100" value={getStr(formData.title, 'en')} onChange={e => updateLoc('title', 'en', e.target.value)} />
                                </div>
                                <div>
                                    <label className="label-sm">Company</label>
                                    <input className="input-std bg-purple-50/20 border-purple-100" value={getStr(formData.company, 'en')} onChange={e => updateLoc('company', 'en', e.target.value)} />
                                </div>
                                <div>
                                    <label className="label-sm">Tasks</label>
                                    <div className="space-y-2">
                                        {formData.description.map((task, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input className="input-std bg-purple-50/20 border-purple-100 flex-1" value={getStr(task, 'en')} onChange={e => updateDesc(i, 'en', e.target.value)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-semibold text-slate-900 mb-4 text-sm">Technologies</h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    className="input-std"
                                    placeholder="Add tag"
                                    value={newTech}
                                    onChange={e => setNewTech(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && newTech) {
                                            setFormData(prev => ({ ...prev, technologies: [...(prev.technologies || []), newTech] }));
                                            setNewTech("");
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies?.map(t => (
                                    <span key={t} className="px-2 py-1 bg-slate-100 text-xs rounded flex gap-1 items-center">
                                        {t}
                                        <Trash2 className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setFormData(p => ({ ...p, technologies: p.technologies?.filter(tech => tech !== t) }))} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx global>{`
        .label-sm { @apply block text-xs font-medium text-slate-500 mb-1.5; }
        .input-std { @apply w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all; }
      `}</style>
        </div>
    );
}
