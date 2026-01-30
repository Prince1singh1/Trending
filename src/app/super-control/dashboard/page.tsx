"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MousePointer2,
    ShoppingBag,
    Layers,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Plus,
    Flame
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        trending: 0,
        clicks: 0
    });
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [recentProducts, setRecentProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const prodRes = await fetch('/api/super-control/products');
                const catRes = await fetch('/api/super-control/categories');
                const products = await prodRes.json();
                const categories = await catRes.json();

                setStats({
                    products: products.length,
                    categories: categories.length,
                    trending: products.filter((p: any) => p.isTrending).length,
                    clicks: products.reduce((acc: number, p: any) => acc + (p.clicks || 0), 0)
                });

                // Top products by clicks
                const top = [...products].sort((a: any, b: any) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5);
                setTopProducts(top);

                // Recent products
                const recent = [...products].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
                setRecentProducts(recent);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Products', value: stats.products, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Clicks', value: stats.clicks.toLocaleString(), icon: MousePointer2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Trending Items', value: stats.trending, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { label: 'Categories', value: stats.categories, icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black">Dashboard</h1>
                    <p className="text-zinc-400 mt-2">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/super-control/products/new"
                        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={20} /> New Product
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={28} />
                            </div>
                            <div className="p-2 rounded-lg bg-zinc-800 text-emerald-500">
                                <ArrowUpRight size={18} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-4xl font-black">
                                {loading ? '...' : stat.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-[40px] bg-zinc-900 border border-zinc-800 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Top Performing Deals</h2>
                        <Link href="/super-control/products" className="text-sm text-blue-400 hover:text-blue-300 font-bold">Manage All</Link>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-20 rounded-3xl bg-zinc-800 animate-pulse" />)
                        ) : (
                            topProducts.map((p, i) => (
                                <div key={p._id} className="flex items-center gap-4 p-5 rounded-3xl bg-zinc-800/30 border border-zinc-700/30 group hover:border-blue-500/30 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-blue-400 font-black text-lg">
                                        #{i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold line-clamp-1">{p.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={`text-[10px] font-bold uppercase ${p.platform === 'amazon' ? 'text-[#FF9900]' : 'text-[#2874F0]'}`}>{p.platform}</span>
                                            <span className="text-zinc-500">•</span>
                                            <span className="text-xs text-zinc-500">₹{p.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-xl text-emerald-500">{p.clicks?.toLocaleString() || 0}</p>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Total Clicks</p>
                                    </div>
                                </div>
                            ))
                        )}
                        {!loading && topProducts.length === 0 && (
                            <p className="text-center py-10 text-zinc-500">No product clicks yet.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[40px] bg-zinc-900 border border-zinc-800 space-y-6">
                        <h2 className="text-xl font-bold">Recently Added</h2>
                        <div className="space-y-4">
                            {loading ? (
                                [1, 2, 3].map(i => <div key={i} className="h-16 rounded-2xl bg-zinc-800 animate-pulse" />)
                            ) : (
                                recentProducts.map((p) => (
                                    <div key={p._id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex-shrink-0 relative overflow-hidden">
                                            {p.image && <img src={p.image} alt="" className="object-cover w-full h-full" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate">{p.title}</p>
                                            <p className="text-[10px] text-zinc-500">{new Date(p.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <TrendingUp size={200} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-black leading-tight text-white">Share your Dashboard</h2>
                                <p className="text-blue-100/80 font-medium text-sm">Monitor your affiliate growth in real-time.</p>
                            </div>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: 'TrendHub Admin Stats',
                                            text: `Check out our growth! ${stats.clicks} total clicks across ${stats.products} products.`,
                                            url: window.location.href
                                        });
                                    }
                                }}
                                className="mt-8 px-6 py-3 rounded-2xl bg-white text-blue-600 font-black text-center shadow-2xl hover:bg-zinc-100 transition-all active:scale-95"
                            >
                                Share Stats
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
