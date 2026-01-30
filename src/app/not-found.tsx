"use client";

import Link from 'next/link';
import { Ghost, Home, ArrowLeft, Search } from 'lucide-react';
import * as motion from 'framer-motion/client';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-xl w-full text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative inline-block"
                >
                    <Ghost size={120} className="text-zinc-800 mx-auto" strokeWidth={1} />
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute top-0 right-0"
                    >
                        <Ghost size={40} className="text-blue-500/30" />
                    </motion.div>
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-8xl font-black text-white tracking-tighter">404</h1>
                    <h2 className="text-3xl font-bold text-zinc-400">Page Lost in Orbit</h2>
                    <p className="text-zinc-500 text-lg leading-relaxed">
                        The deal you're looking for might have expired or moved to a different galaxy. Let's get you back to the trending stuff.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
                    >
                        <Home size={20} /> Back to Home
                    </Link>
                    <Link
                        href="/products"
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all"
                    >
                        <Search size={20} /> Browse Deals
                    </Link>
                </div>

                <div className="pt-12">
                    <button
                        onClick={() => window.history.back()}
                        className="text-zinc-600 hover:text-zinc-400 font-semibold flex items-center gap-2 mx-auto transition-colors"
                    >
                        <ArrowLeft size={16} /> Go Back One Step
                    </button>
                </div>
            </div>
        </div>
    );
}
