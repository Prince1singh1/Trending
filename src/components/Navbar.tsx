"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 py-3' : 'bg-transparent py-5'
                }`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all">
                            <Flame className="text-white fill-current" size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            TrendHub
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-sm font-medium"
                        >
                            <Search size={18} />
                            Search deals...
                            <span className="ml-4 px-1.5 py-0.5 rounded border border-zinc-800 text-[10px] font-bold">⌘K</span>
                        </button>
                        <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Home</Link>
                        <Link href="/products" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Trending</Link>
                        <Link href="/categories" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Categories</Link>
                        <Link href="/products?sort=trending" className="relative group">
                            <span className="text-sm font-bold text-orange-500 group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                Hot Deals
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-zinc-400 hover:text-white md:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            className="fixed inset-0 bg-zinc-950 z-[200] p-8 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <span className="font-bold text-xl">TrendHub</span>
                                <button onClick={() => setMobileMenuOpen(false)}>
                                    <X size={32} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6 text-2xl font-bold">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                                <Link href="/products" onClick={() => setMobileMenuOpen(false)}>Trending</Link>
                                <Link href="/categories" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
                                <Link href="/products?sort=trending" className="text-orange-500 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                                    <Flame size={28} /> Hot Deals
                                </Link>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setIsSearchOpen(true);
                                    }}
                                    className="text-left flex items-center gap-3"
                                >
                                    <Search size={24} /> Search
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
