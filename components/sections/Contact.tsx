"use client";
import { useState } from "react";

export function Contact() {
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
    <div>
      <form
        onSubmit={onSubmit}
        className="card space-y-3 md:max-w-2xl lg:max-w-3xl mx-auto"
      >
        <div>
          <label className="block text-sm mb-1">Nom</label>
          <input name="name" required className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" name="email" required className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea name="message" rows={5} required className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Envoi…" : "Envoyer"}
        </button>
        {status === "sent" && (
          <p className="text-sm text-green-600">Message envoyé, merci !</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Une erreur est survenue, réessayez.</p>
        )}
      </form>
    </div>
  );
}
