"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Logic to determine if we are on a project detail page
    // Route: /projets/[slug]
    // We want to show header on /projets but hide on /projets/agent-x
    const isProjectDetail = pathname?.startsWith("/projets/") && pathname.split("/").length > 2;

    // Additional check if we want to support english route /en/projects/... if localized routing was used, 
    // but current implementation seems to use cookie/searchParam for lang, so pathname is stable.

    return (
        <>
            {/* Hide header on project detail pages */}
            {!pathname.startsWith('/projets/') && <SiteHeader />}
            {children}
            <SiteFooter />
        </>
    );
}
