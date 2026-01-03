"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type Localized = string | { fr: string; en: string };
export type MediaItem = { type: "image" | "video"; src: string; alt?: Localized };

function pick(value: unknown, pref: "fr" | "en" = "fr"): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    const loc = v[pref];
    if (typeof loc === "string") return loc;
    const fr = v["fr"];
    if (typeof fr === "string") return fr;
  }
  return "";
}

export function MediaGallery({ media, title }: { media: MediaItem[]; title: Localized }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const scrollYRef = useRef<number | null>(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (openIndex !== null) {
      const y = window.scrollY;
      scrollYRef.current = y;
      const { body } = document;
      if (body.style.position !== "fixed") {
        body.style.position = "fixed";
        body.style.top = `-${y}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
      }
      return () => {
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        const restoreY = scrollYRef.current ?? 0;
        window.scrollTo(0, restoreY);
      };
    }
  }, [openIndex]);

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {media.map((m, i) => (
          m.type === "image" ? (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative group overflow-hidden rounded-xl border border-slate-200 cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-blue-100"
              aria-label={(pick(m.alt) || pick(title)) + ` — image ${i + 1}`}
            >
              <div className="aspect-video bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.src}
                  alt={pick(m.alt) || pick(title)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </button>
          ) : (
            <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-black">
              <video controls className="w-full h-full">
                <source src={m.src} />
              </video>
            </div>
          )
        ))}
      </div>

      {/* Lightbox modal for images */}
      {openIndex !== null && media[openIndex]?.type === "image" &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={pick(media[openIndex].alt) || pick(title)}
          >
            {/* Backdrop with Blur */}
            <button
              type="button"
              aria-label="Fermer"
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity"
              onClick={() => setOpenIndex(null)}
            />
            
            {/* Content wrapper */}
            <div className="relative z-10 w-full max-w-5xl max-h-full flex items-center justify-center outline-none" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media[openIndex].src}
                alt={pick(media[openIndex].alt) || pick(title)}
                className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
              />
            </div>
            
            {/* Close button */}
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 text-white p-2 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>,
          document.body
        )}
    </>
  );
}