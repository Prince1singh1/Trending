"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(currentProgress);
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[90] p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white shadow-2xl hover:border-blue-500/50 transition-all group overflow-hidden"
                >
                    {/* Progress Ring */}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="22"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-zinc-800"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="22"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="140"
                                animate={{ strokeDashoffset: 140 - (progress / 100) * 140 }}
                                className="text-blue-500"
                            />
                        </svg>
                    </div>
                    <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
