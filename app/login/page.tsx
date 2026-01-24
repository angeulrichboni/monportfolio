"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { authenticate } from "@/app/lib/actions"; // We will create this action

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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4 ring-4 ring-blue-50/50">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
                    <p className="text-slate-500 text-sm mt-1">Accès sécurisé à votre portfolio</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1.5 ml-1">Utilisateur</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                defaultValue="admin" // Mock prefill
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                placeholder="Identifiant"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1.5 ml-1">Mot de passe</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                defaultValue="admin" // Mock prefill
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <LoginButton />
                    </div>

                    {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center justify-center">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20"
            disabled={pending}
        >
            {pending ? "Connexion..." : <span className="flex items-center">Se connecter <ArrowRight className="w-4 h-4 ml-2 opacity-80" /></span>}
        </Button>
    );
}
