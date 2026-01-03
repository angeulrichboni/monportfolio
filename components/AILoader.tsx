"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AILoader() {
    const [progress, setProgress] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimensions({
            width: typeof window !== "undefined" ? window.innerWidth : 0,
            height: typeof window !== "undefined" ? window.innerHeight : 0,
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {dimensions.width > 0 && [...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        initial={{
                            x: Math.random() * dimensions.width,
                            y: Math.random() * dimensions.height,
                        }}
                        animate={{
                            x: Math.random() * dimensions.width,
                            y: Math.random() * dimensions.height,
                            scale: [1, 2, 1],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Neural network visualization */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg width="600" height="400" className="max-w-full">
                    {/* Nodes */}
                    {[
                        { cx: 100, cy: 100 },
                        { cx: 100, cy: 200 },
                        { cx: 100, cy: 300 },
                        { cx: 300, cy: 150 },
                        { cx: 300, cy: 250 },
                        { cx: 500, cy: 200 },
                    ].map((node, i) => (
                        <motion.g key={i}>
                            {/* Connections */}
                            {i < 3 && (
                                <>
                                    <motion.line
                                        x1={node.cx}
                                        y1={node.cy}
                                        x2={300}
                                        y2={150}
                                        stroke="url(#gradient)"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.6 }}
                                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                    />
                                    <motion.line
                                        x1={node.cx}
                                        y1={node.cy}
                                        x2={300}
                                        y2={250}
                                        stroke="url(#gradient)"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.6 }}
                                        transition={{ duration: 2, delay: i * 0.2 + 0.5, repeat: Infinity }}
                                    />
                                </>
                            )}
                            {i >= 3 && i < 5 && (
                                <motion.line
                                    x1={node.cx}
                                    y1={node.cy}
                                    x2={500}
                                    y2={200}
                                    stroke="url(#gradient)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.6 }}
                                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                />
                            )}
                            {/* Node circle */}
                            <motion.circle
                                cx={node.cx}
                                cy={node.cy}
                                r="8"
                                fill="url(#nodeGradient)"
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                            />
                        </motion.g>
                    ))}
                    {/* Gradients */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                        </linearGradient>
                        <radialGradient id="nodeGradient">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Main loader content */}
            <div className="relative z-10 flex flex-col items-center space-y-8">
                {/* AI Brain Icon with pulse animation */}
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {/* Glowing ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-xl opacity-50"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Brain/AI Icon */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg
                            className="w-full h-full text-cyan-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 8V4M12 20v-4M8 12H4M20 12h-4M16.24 7.76l2.83-2.83M4.93 19.07l2.83-2.83M7.76 7.76L4.93 4.93M19.07 19.07l-2.83-2.83" />
                        </svg>
                    </div>
                </motion.div>

                {/* Loading text */}
                <div className="text-center space-y-2">
                    <motion.h2
                        className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0%", "100%", "0%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            backgroundSize: "200% 100%",
                        }}
                    >
                        Initialisation en cours...
                    </motion.h2>

                    {/* Animated dots */}
                    <div className="flex justify-center space-x-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundSize: "200% 100%",
                        }}
                    />
                </div>

                {/* Progress percentage */}
                <motion.p
                    className="text-cyan-400 text-sm font-mono"
                    key={progress}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {progress}% chargé
                </motion.p>

                {/* Data stream effect */}
                <div className="flex space-x-1 text-xs font-mono text-blue-400/40">
                    {["01", "11", "00", "10", "11", "01", "00", "11"].map((bit, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        >
                            {bit}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
}
