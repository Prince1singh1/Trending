"use client";

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, MousePointer2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const STATS = [
    { label: 'Total Clicks', value: '12,480', change: '+12.5%', trending: 'up', icon: MousePointer2, color: 'text-blue-500' },
    { label: 'Top Platform', value: 'Amazon', change: '65% share', trending: 'neutral', icon: TrendingUp, color: 'text-orange-500' },
    { label: 'Active Users', value: '1,205', change: '+5.2%', trending: 'up', icon: Users, color: 'text-purple-500' },
    { label: 'Conversion', value: '3.2%', change: '-0.4%', trending: 'down', icon: ArrowUpRight, color: 'text-emerald-500' },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-zinc-400 mt-1">Track your affiliate performance and user engagement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-xl bg-zinc-800 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.trending === 'up' ? 'text-emerald-500' :
                                    stat.trending === 'down' ? 'text-rose-500' : 'text-zinc-500'
                                }`}>
                                {stat.change}
                                {stat.trending === 'up' && <ArrowUpRight size={16} />}
                                {stat.trending === 'down' && <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 h-80 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-zinc-800 text-zinc-600">
                        <BarChart3 size={40} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg">Click Distribution</h3>
                        <p className="text-zinc-500 text-sm max-w-xs">Detailed chart showing clicks across different platforms and products.</p>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Real-time Data Active
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 h-80 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-zinc-800 text-zinc-600">
                        <Users size={40} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg">User Behavior</h3>
                        <p className="text-zinc-500 text-sm max-w-xs">Analysis of user journeys and peak engagement times.</p>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider">
                        Updated 5m ago
                    </div>
                </div>
            </div>
        </div>
    );
}
