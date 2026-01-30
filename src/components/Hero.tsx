"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-zinc-950">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-blue-400 text-sm font-medium backdrop-blur-md"
                    >
                        <Sparkles size={16} />
                        <span>Discover the Future of Shopping</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
                    >
                        The Ultimate Hub for <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Trending Deals
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
                    >
                        Hand-picked deals from Amazon & Flipkart, updated every hour.
                        Stop searching, start saving with TrendHub's algorithm-backed selections.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link
                            href="/products"
                            className="group relative px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Deals <ArrowRight size={20} />
                            </span>
                        </Link>
                        <Link
                            href="/categories"
                            className="px-8 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-lg hover:bg-zinc-800 transition-all"
                        >
                            View Categories
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-8 pt-12 grayscale opacity-50 contrast-125"
                    >
                        <span className="text-xl font-bold flex items-center gap-2">amazon</span>
                        <span className="text-xl font-bold flex items-center gap-2 tracking-tighter">Flipkart</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
