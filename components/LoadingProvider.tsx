"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AILoader from "./AILoader";
// import SimpleLoader from "./SimpleLoader";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const pathname = usePathname();

    // Disable loader completely for admin routes to avoid blocking issues
    const isAdminRoute = pathname?.startsWith('/admin');

    useEffect(() => {
        // Skip loader for admin routes entirely
        if (isAdminRoute) {
            setShowLoader(false);
            setIsLoading(false);
            return;
        }

        // For non-admin routes, show loader briefly
        setIsLoading(true);
        setShowLoader(true);

        const hideTimer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => setShowLoader(false), 300);
        }, 1500);

        return () => {
            clearTimeout(hideTimer);
        };
    }, [pathname, isAdminRoute]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <AnimatePresence mode="wait">
                {showLoader && !isAdminRoute && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] pointer-events-none"
                    >
                        <AILoader />
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </LoadingContext.Provider>
    );
}
