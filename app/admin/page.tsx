"use client";

import { FolderGit2, Briefcase, Cpu, FileText, Star, ArrowUpRight, Activity, Server, Zap, Database } from "lucide-react";

const stats = [
    {
        label: "Total Projets",
        value: "12",
        change: "+2 ce mois",
        icon: FolderGit2,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "group-hover:border-blue-200"
    },
    {
        label: "Expériences",
        value: "5",
        change: "À jour",
        icon: Briefcase,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "group-hover:border-purple-200"
    },
    {
        label: "Compétences",
        value: "24",
        change: "+3 nouvelles",
        icon: Cpu,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "group-hover:border-emerald-200"
    },
    {
        label: "Traductions IA",
        value: "98%",
        change: "Couverture EN",
        icon: FileText,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "group-hover:border-amber-200"
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 font-sans">

            {/* Header with Pulse Indicator */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tableau de Bord</h1>
                    <p className="text-slate-500 mt-1">Vue d&apos;ensemble des métriques du Portfolio.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-emerald-100 rounded-full shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Système Opérationnel</span>
                </div>
            </div>

            {/* Stats Grid - Data Prisms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`relative bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${stat.border}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-colors`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-bold bg-white/50 px-2 py-1 rounded-full text-slate-500 border border-slate-100">
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Activity - Holodeck Style */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg shadow-slate-200/40 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                            Projets en Vedette
                        </h2>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">Voir tout</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-md transition-all cursor-pointer">
                                {/* Project Icon Placeholder */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 group-hover:from-blue-100 group-hover:to-indigo-100 flex items-center justify-center transition-colors">
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">P{i}</span>
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Portfolio V3 - Release</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Activity className="w-3 h-3 text-emerald-500" />
                                        <p className="text-xs text-slate-400 font-medium">Mis à jour il y a 2 heures</p>
                                    </div>
                                </div>

                                <div className="px-3 py-1 rounded-full bg-white border border-slate-100 text-slate-600 text-xs font-bold shadow-sm group-hover:border-blue-200 group-hover:text-blue-600">
                                    En ligne
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status - Dark HUD Style */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                    {/* Decorative Blurs */}
                    <div className="absolute top-0 right-0 p-32 bg-blue-600 rounded-full blur-[90px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 p-24 bg-purple-600 rounded-full blur-[90px] opacity-20 pointer-events-none"></div>

                    <h3 className="text-lg font-bold mb-6 relative z-10 flex items-center gap-2">
                        <Server className="w-5 h-5 text-blue-400" />
                        Moniteur Système
                    </h3>

                    <div className="space-y-8 relative z-10">
                        {/* Database Module */}
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-2 text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Database className="w-3 h-3" /> Base de données</span>
                                <span className="text-emerald-400 font-bold animate-pulse">LIVE</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </div>

                        {/* API Module */}
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-2 text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> API IA (Groq)</span>
                                <span className="text-purple-400 font-bold">98ms</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                            </div>
                        </div>

                        {/* Storage Module */}
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-2 text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Briefcase className="w-3 h-3" /> Stockage (S3)</span>
                                <span className="text-blue-400 font-bold">25% Used</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[25%] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Footer decoration */}
                    <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <span>CPU: 12%</span>
                        <span>MEM: 2.4GB</span>
                        <span>UPTIME: 14D</span>
                    </div>
                </div>
            </div>
        </div>
    );
}