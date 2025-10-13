"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Localized = string | { fr: string; en: string };
type MediaItem = { type: "image" | "video"; src: string; alt?: Localized };

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

  // Lock scroll when modal is open (prevents background shifting/"dancing")
  useEffect(() => {
    if (openIndex !== null) {
      const y = window.scrollY;
      scrollYRef.current = y;
      const { body } = document;
      // Lock the body in place
      if (body.style.position !== "fixed") {
        body.style.position = "fixed";
        body.style.top = `-${y}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
      }
      return () => {
        // Restore scroll
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
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {media.map((m, i) => (
          m.type === "image" ? (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative group overflow-hidden rounded cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label={(pick(m.alt) || pick(title)) + ` — image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={pick(m.alt) || pick(title)}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ) : (
            <div key={i} className="rounded overflow-hidden">
              <video controls className="w-full rounded">
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
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={pick(media[openIndex].alt) || pick(title)}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Fermer"
              className="absolute inset-0 bg-black/70 overscroll-contain touch-none"
              onClick={() => setOpenIndex(null)}
            />
            {/* Content wrapper to stop closing when clicking the image */}
            <div className="relative z-10 p-2 sm:p-3" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media[openIndex].src}
                alt={pick(media[openIndex].alt) || pick(title)}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded shadow-2xl block"
              />
            </div>
            {/* Close button at viewport top-right */}
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 rounded-full bg-white text-gray-700 shadow p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
