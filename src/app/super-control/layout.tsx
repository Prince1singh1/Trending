"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Layers,
    BarChart3,
    Settings,
    LogOut,
    TrendingUp,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/super-control/dashboard' },
    { icon: Package, label: 'Products', path: '/super-control/products' },
    { icon: Layers, label: 'Categories', path: '/super-control/categories' },
    { icon: BarChart3, label: 'Analytics', path: '/super-control/analytics' },
    { icon: TrendingUp, label: 'Promotions', path: '/super-control/promotions' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    if (pathname === '/super-control/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await fetch('/api/super-control/logout', { method: 'POST' });
        router.push('/super-control/login');
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                            <span className="font-bold text-xl">A</span>
                        </div>
                        {!collapsed && (
                            <span className="font-bold text-lg tracking-tight">TrendHub Admin</span>
                        )}
                    </div>

                    <nav className="flex-1 space-y-2">
                        {MENU_ITEMS.map((item) => {
                            const active = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${active
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={22} className={active ? '' : 'group-hover:text-blue-400'} />
                                    {!collapsed && <span className="font-medium">{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-zinc-800 space-y-2">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 p-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all group"
                        >
                            <ExternalLink size={20} />
                            {!collapsed && <span className="font-medium">View Site</span>}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 p-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
                        >
                            <LogOut size={22} />
                            {!collapsed && <span className="font-medium">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} p-8`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
