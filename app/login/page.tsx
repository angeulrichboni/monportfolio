"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, User, ArrowRight, ShieldCheck, Sparkles, Loader2, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { authenticate } from "@/app/lib/actions";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (formData: FormData) => {
        setErrorMessage("");
        const result = await authenticate(undefined, formData);
        if (result) {
            setErrorMessage(result);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans text-slate-800">

            {/* --- Atmospheric Background --- */}
            {/* Gradient Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>
            
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>

            {/* --- Login Card --- */}
            <div className="w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
                
                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/60 relative overflow-hidden">
                    
                    {/* Top Decor Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    {/* Header */}
                    <div className="text-center mb-10 mt-2">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-6 shadow-lg shadow-blue-500/30 ring-4 ring-blue-50">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Portfolio Admin</h1>
                        <p className="text-slate-500 text-sm mt-2 font-medium flex items-center justify-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            Passerelle sécurisée
                        </p>
                    </div>

                    {/* Form */}
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Identifiant</label>
                                <div className="relative transition-all duration-300 group-focus-within:scale-[1.02]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        defaultValue="admin"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                                        placeholder="Entrez votre ID"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Mot de passe</label>
                                <div className="relative transition-all duration-300 group-focus-within:scale-[1.02]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        defaultValue="admin"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                                        placeholder="••••••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <LoginButton />
                        </div>

                        {errorMessage && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                                {errorMessage}
                            </div>
                        )}
                    </form>
                    
                    {/* Footer decoration */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 font-mono uppercase tracking-widest opacity-60">
                            <Fingerprint className="w-3 h-3" />
                            Biometric Sync: Off
                        </div>
                    </div>
                </div>
                
                <p className="text-center text-xs text-slate-400 mt-6 font-medium">
                    &copy; 2025 Mon Portfolio. All rights reserved.
                </p>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            disabled={pending}
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    <span className="text-slate-300">Authentification...</span>
                </span>
            ) : (
                <span className="flex items-center font-bold tracking-wide">
                    Accéder au Dashboard 
                    <ArrowRight className="w-5 h-5 ml-2 opacity-80 group-hover:translate-x-1 transition-transform" />
                </span>
            )}
        </Button>
    );
}