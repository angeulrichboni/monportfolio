"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AILoader from "./AILoader";

import SimpleLoader from "./SimpleLoader";

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
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const pathname = usePathname();

    // Initial page load
    useEffect(() => {
        // Simulate initial loading with heavy AI Loader
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Keep loader visible for smooth exit animation
            setTimeout(() => {
                setShowLoader(false);
                setIsInitialLoad(false); // Mark initial load as done
            }, 500);
        }, 2000); // Show loader for 2 seconds on initial load

        return () => clearTimeout(timer);
    }, []);

    // Handle route changes
    useEffect(() => {
        // Don't trigger if it's the very first load (handled above)
        if (!isInitialLoad) {
            setIsLoading(true);
            setShowLoader(true);

            const timer = setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => setShowLoader(false), 500);
            }, 800); // Shorter duration for page transitions

            return () => clearTimeout(timer);
        }
    }, [pathname, isInitialLoad]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <AnimatePresence mode="wait">
                {showLoader && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[60] pointer-events-none" // Ensure click-through when fading out
                    >
                        {isInitialLoad ? <AILoader /> : <SimpleLoader />}
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </LoadingContext.Provider>
    );
}
