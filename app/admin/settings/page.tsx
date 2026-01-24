"use client";

import { User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>

            {/* Profile Section */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-slate-400" />
                    Profil Administrateur
                </h2>
                <div className="grid gap-6">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                            A
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">Admin User</p>
                            <p className="text-sm text-slate-500">admin@example.com</p>
                        </div>
                    </div>
                    <div className="text-sm text-slate-500">
                        La modification du profil n&apos;est pas encore disponible.
                    </div>
                </div>
            </section>

            {/* Security Section (API Keys) */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 opacity-75 pointer-events-none grayscale">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-slate-400" />
                        Sécurité & Clés API
                    </h2>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Bientôt disponible</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Clé API Groq (IA)</label>
                        <input type="password" value="sk-xxxxxxxxxxxxxxxx" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-400">Cette clé est utilisée pour la traduction automatique. Configurez-la dans le fichier .env.</p>
                </div>
            </section>

            {/* Logout Action */}
            <div className="pt-4 border-t border-slate-200">
                <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                </Button>
            </div>
        </div>
    );
}
