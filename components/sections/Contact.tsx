"use client";
import { useState } from "react";
import { useI18n } from "../I18nProvider";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Container Unifié : Une seule carte divisée en deux */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-slate-100">

        {/* Colonne Gauche : Informations (Fond Bleu pour contraste max) */}
        <div className="bg-blue-600 p-8 md:p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Cercle décoratif en arrière-plan */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-2xl pointer-events-none"></div>

          <div>
            <h3 className="text-2xl font-bold mb-2">{t("contact.infoTitle")}</h3>
            <p className="text-blue-100 text-sm mb-8 opacity-90">
              Discutons de vos projets et de comment je peux vous aider.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">{t("contact.email")}</div>
                  <a href="mailto:acobeangeulrich.boni@tek-up.de" className="font-medium hover:text-white hover:underline decoration-blue-300 underline-offset-4 break-all">
                    acobeangeulrich.boni@tek-up.de
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">{t("contact.phone")}</div>
                  <a href="tel:+21653117212" className="font-medium hover:text-white hover:underline decoration-blue-300 underline-offset-4">
                    +216 53 117 212
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">{t("contact.location")}</div>
                  <div className="font-medium">{t("contact.locationValue")}</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-500/50">
            {/* Tu peux ajouter tes réseaux sociaux ici en icônes blanches si tu veux */}
            <p className="text-xs text-blue-200">Disponible pour freelance & CDI</p>
          </div>
        </div>

        {/* Colonne Droite : Formulaire (Fond Blanc) */}
        <div className="p-8 md:p-10 bg-white">
          <form onSubmit={onSubmit} className="space-y-5">
            <input type="hidden" name="_ts" value={String(Date.now())} />

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">{t("contact.name")}</label>
              <input
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="Jean Dupont"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">{t("contact.email")}</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="jean@exemple.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">{t("contact.message")}</label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                placeholder="Bonjour, j'aimerais discuter d'un projet..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3.5 px-6 mt-2 rounded-lg bg-slate-900 text-white font-bold hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>

            {status === "sent" && (
              <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center font-medium border border-green-200">
                {t("contact.sent")}
              </div>
            )}
            {status === "error" && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center font-medium border border-red-200">
                {t("contact.error")}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}