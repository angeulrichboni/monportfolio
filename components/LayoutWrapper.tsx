"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Logic to determine if we should hide the public header/footer
    // Hide on /admin routes, /login, and /projets/[slug] (for header specifically as per original logic)
    const isAdmin = pathname?.startsWith("/admin");
    const isLogin = pathname?.startsWith("/login");
    const isProjectDetail = pathname?.startsWith("/projets/") && pathname.split("/").length > 2;

    const shouldHideChrome = isAdmin || isLogin;

    return (
        <>
            {/* Show Header only if NOT (admin or login) AND NOT project detail */}
            {!shouldHideChrome && !pathname.startsWith('/projets/') && <SiteHeader />}

            {children}

            {/* Show Footer only if NOT (admin or login) */}
            {!shouldHideChrome && <SiteFooter />}
        </>
    );
}
