"use client";
import { useState } from "react";
import { useI18n } from "../I18nProvider";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

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
    } catch (e) {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {/* Info panel */}
      <aside className="card md:col-span-2">
        <h3 className="font-display font-semibold text-lg">{t("contact.infoTitle")}</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300">@</span>
            <div>
              <div className="text-gray-600 dark:text-gray-300">{t("contact.email")}</div>
              {/* <a href="mailto:acobeangeulrich.boni@tek-up.de" className="font-medium hover:text-sky-600">acobeangeulrich.boni@tek-up.de</a> <br /> */}
              <a href="mailto:acobeangeulrich.boni@tek-up.de" className="font-medium hover:text-sky-600">acobeangeulrich.boni@tek-up.de</a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300">☎</span>
            <div>
              <div className="text-gray-600 dark:text-gray-300">{t("contact.phone")}</div>
              <a href="tel:+216 53 117 212" className="font-medium hover:text-sky-600">+216 53 117 212</a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300">📍</span>
            <div>
              <div className="text-gray-600 dark:text-gray-300">{t("contact.location")}</div>
              <div className="font-medium">{t("contact.locationValue")}</div>
            </div>
          </li>
        </ul>
      </aside>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="card space-y-3 md:col-span-3"
      >
        {/* Honeypot field (leave empty) */}
        <div className="hidden" aria-hidden>
          <label>Website</label>
          <input name="website" autoComplete="off" tabIndex={-1} />
        </div>
        {/* Form start timestamp */}
        <input type="hidden" name="_ts" value={String(Date.now())} />
        <div>
          <label className="block text-sm mb-1">{t("contact.name")}</label>
          <input name="name" required className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">{t("contact.email")}</label>
          <input type="email" name="email" required className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">{t("contact.message")}</label>
          <textarea name="message" rows={5} required className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? t("contact.sending") : t("contact.send")}
        </button>
        {status === "sent" && (
          <p className="text-sm text-green-600">{t("contact.sent")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">{t("contact.error")}</p>
        )}
      </form>
    </div>
  );
}
