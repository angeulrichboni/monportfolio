"use client";

import { LogOut, Shield, Lock, Sparkles, Key, Mail, Fingerprint, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-6 space-y-8 font-sans text-slate-800">

            {/* Header */}
            <div className="max-w-4xl mx-auto flex items-end gap-4 mb-8">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <SettingsIcon className="w-8 h-8 text-slate-700" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                        Paramètres Système
                    </h1>
                    <p className="text-slate-500 font-medium">Configuration du profil administrateur et sécurité.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 pb-20">

                {/* Profile Section (Digital ID Card) */}
                <section className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl p-8 overflow-hidden">

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white">
                                    A
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    ONLINE
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                                        Admin User
                                        <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-lg border border-indigo-100 uppercase tracking-wider font-bold">
                                            Super Admin
                                        </span>
                                    </h2>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 mt-1 font-mono text-sm">
                                        <Mail className="w-3.5 h-3.5" />
                                        admin@example.com
                                    </div>
                                </div>

                                {/* Read-only fields aesthetic */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                                        <Fingerprint className="w-5 h-5 text-slate-400" />
                                        <div className="text-left">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">ID Utilisateur</p>
                                            <p className="text-xs font-mono text-slate-700">USR-8829-X92</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-slate-400" />
                                        <div className="text-left">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Niveau d&apos;accès</p>
                                            <p className="text-xs font-mono text-slate-700">ROOT_ACCESS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notice footer */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-sm text-slate-500 bg-slate-50/50 -mx-8 -mb-8 p-4 px-8">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>L&apos;édition du profil sera disponible dans la prochaine mise à jour de l&apos;admin.</span>
                        </div>
                    </div>
                </section>

                {/* Security Section (The Vault) */}
                <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100/50 p-1">
                    {/* The "Glass" Overlay that locks content */}
                    <div className="absolute inset-0 z-10 backdrop-blur-[2px] bg-slate-50/40 flex flex-col items-center justify-center text-center p-6">
                        <div className="p-4 bg-white rounded-full shadow-xl mb-4 animate-in zoom-in duration-500">
                            <Lock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Zone Sécurisée Verrouillée</h3>
                        <p className="text-slate-500 text-sm max-w-md mt-1 mb-4">
                            La gestion des clés API et des tokens de sécurité est actuellement en cours de maintenance ou désactivée.
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-600 border border-slate-300">
                            Bientôt disponible
                        </span>
                    </div>

                    {/* The "Content" behind the glass (Visual representation) */}
                    <div className="bg-white rounded-[20px] p-8 opacity-40 select-none grayscale">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <Key className="w-5 h-5" />
                                Clés d&apos;API & Intégrations
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Groq AI API Key</label>
                                <div className="relative">
                                    <input type="password" value="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx" disabled className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 font-mono text-sm" />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">HIDDEN</div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    Utilisée pour la traduction automatique des contenus.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Logout Action */}
                <div className="flex justify-end pt-8 border-t border-slate-200">
                    <Button
                        variant="outline"
                        className="group border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 px-6 py-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-red-500/10"
                    >
                        <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Déconnexion sécurisée</span>
                    </Button>
                </div>

            </div>
        </div>
    );
}