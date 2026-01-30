"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Percent, Zap, Megaphone, Sparkles } from 'lucide-react';

export default function PromotionsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Promotions</h1>
                <p className="text-zinc-400 mt-1">Manage feature banners and specialized trending deals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 space-y-6"
                >
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Zap size={28} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Hero Banner</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">Customize the main hero area announcement and featured links for high-traffic events.</p>
                    </div>
                    <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-all">
                        Configure Hero
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-orange-600/20 to-rose-600/20 border border-orange-500/20 space-y-6"
                >
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Sparkles size={28} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Sale Events</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">Create and manage time-limited sale events like 'Big Billion Days' or 'Prime Day'.</p>
                    </div>
                    <button className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold transition-all">
                        Manage Events
                    </button>
                </motion.div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-zinc-800 text-zinc-400">
                        <Megaphone size={24} />
                    </div>
                    <h2 className="text-xl font-bold">Active Notifications</h2>
                </div>
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="font-medium">Welcome Banner Active</p>
                                    <p className="text-xs text-zinc-500">Currently visible to all visitors on home page</p>
                                </div>
                            </div>
                            <button className="text-zinc-500 hover:text-white transition-all">
                                <Percent size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
