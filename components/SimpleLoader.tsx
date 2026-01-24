"use client";

import { motion } from "framer-motion";

export default function SimpleLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Top progress bar */}
            <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 1, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600"
            />
            {/* Optional subtle spinner in corner if needed, but progress bar is usually enough for nav */}
        </div>
    );
}
