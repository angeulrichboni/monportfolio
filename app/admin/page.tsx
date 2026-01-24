"use client";

import { FolderGit2, Briefcase, Cpu, FileText, Star, Eye, ArrowUpRight } from "lucide-react";

const stats = [
    {
        label: "Total Projets",
        value: "12",
        change: "+2 ce mois",
        icon: FolderGit2,
        color: "bg-blue-500",
        textColor: "text-blue-600"
    },
    {
        label: "Expériences",
        value: "5",
        change: "À jour",
        icon: Briefcase,
        color: "bg-purple-500",
        textColor: "text-purple-600"
    },
    {
        label: "Compétences",
        value: "24",
        change: "+3 nouvelles",
        icon: Cpu,
        color: "bg-emerald-500",
        textColor: "text-emerald-600"
    },
    {
        label: "Traductions IA",
        value: "98%",
        change: "Couverture EN",
        icon: FileText,
        color: "bg-amber-500",
        textColor: "text-amber-600"
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500">Vue d&apos;overview de votre portfolio.</p>
                </div>
                <div className="flex gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 my-auto animate-pulse"></span>
                    Système opérationnel
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                <stat.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        Projets mis en avant
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer group">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Portfolio V3</h4>
                                    <p className="text-sm text-slate-500">Mis à jour il y a 2 heures</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                                    En ligne
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                    <h3 className="text-lg font-bold mb-4 relative z-10">État du système</h3>
                    <div className="space-y-6 relative z-10">
                        <div>
                            <div className="flex justify-between text-sm mb-2 text-slate-300">
                                <span>Base de données</span>
                                <span className="text-emerald-400">Opérationnel</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-emerald-500 rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2 text-slate-300">
                                <span>API IA (Groq)</span>
                                <span className="text-emerald-400">Connecté</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-purple-500 rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2 text-slate-300">
                                <span>Stockage (S3)</span>
                                <span className="text-emerald-400">75% Libre</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-[25%] bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
