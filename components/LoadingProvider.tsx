"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AILoader from "./AILoader";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: true,
    setIsLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const pathname = usePathname();

    // Initial page load
    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Keep loader visible for smooth exit animation
            setTimeout(() => setShowLoader(false), 500);
        }, 2000); // Show loader for 2 seconds on initial load

        return () => clearTimeout(timer);
    }, []);

    // Handle route changes
    useEffect(() => {
        // Don't show loader on first mount (handled above)
        if (showLoader === false) {
            setIsLoading(true);
            setShowLoader(true);

            const timer = setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => setShowLoader(false), 500);
            }, 1000); // Shorter duration for page transitions

            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <AnimatePresence mode="wait">
                {showLoader && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AILoader />
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </LoadingContext.Provider>
    );
}
