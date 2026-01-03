"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { projects, Project } from "../../data/projects";
import { useI18n } from "../../components/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";

function pick(value: unknown, lang: "fr" | "en"): string {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
        const v = value as Record<string, unknown>;
        return (v[lang] as string) || (v["fr"] as string) || "";
    }
    return "";
}

export default function AllProjectsPage() {
    const { t, lang } = useI18n();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", "Dev", "Analytics", "Big Data", "Data Eng", "ML"];

    // Filter logic
    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
            const matchSearch = p.stack.some((tech) =>
                tech.toLowerCase().includes(searchQuery.toLowerCase())
            ) || pick(p.title, lang).toLowerCase().includes(searchQuery.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [selectedCategory, searchQuery, lang]);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            <main className="flex-grow pt-28 pb-16 px-6 container mx-auto max-w-7xl">

                {/* Header Section */}
                <header className="mb-8 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        {t("projects.hero.title")}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                        {t("projects.hero.subtitle")}
                    </p>
                </header>

                {/* Controls Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30 backdrop-blur-md bg-white/90 supports-[backdrop-filter]:bg-white/80">

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
                        <span className="hidden md:block w-px h-6 bg-slate-200 mx-2"></span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                {cat === "All" ? t("projects.all") : cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder={t("projects.filter.tech")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p, idx) => (
                            <motion.article
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={p.slug}
                                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-100 h-full transform hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden bg-slate-100">
                                    {p.cover_image_url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={p.cover_image_url}
                                            alt={pick(p.title, lang)}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">
                                            📂
                                        </div>
                                    )}
                                    {/* Category Badge Over Image */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-lg shadow-sm border border-slate-100">
                                            {p.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow p-6">
                                    {/* Date or Meta? Maybe show category if not on image, or stack len */}
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            {/* You could put date here if available in future */}
                                            PROJECT
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-1">
                                        {pick(p.title, lang)}
                                    </h3>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {pick(p.description, lang)}
                                    </p>

                                    {/* Stats / Tech Preview */}
                                    <div className="mt-auto pt-6 border-t border-slate-50">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.stack.slice(0, 3).map(s => (
                                                <span key={s} className="text-[10px] font-bold uppercase tracking-wide text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                    #{s}
                                                </span>
                                            ))}
                                            {p.stack.length > 3 && (
                                                <span className="text-[10px] font-bold text-slate-400 px-1 py-1">+ {p.stack.length - 3}</span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/projets/${p.slug}?lang=${lang}`}
                                            className="group/btn flex items-center justify-between w-full text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
                                        >
                                            {t("projects.viewDetails")}
                                            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 rounded-full bg-slate-100 mb-4 text-4xl">
                            🔍
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
                        <p className="text-slate-500">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
}
