"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                // Fetch from the existing GET API which we'll hope supports filtering
                const res = await fetch(`/api/super-control/products?search=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.slice(0, 5)); // Limit to top 5
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSelect = (slug: string) => {
        onClose();
        router.push(`/go/${slug}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[10vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Search Bar */}
                        <div className="relative p-6 border-b border-zinc-800">
                            <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-zinc-500" size={24} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for products, categories..."
                                className="w-full pl-14 pr-12 py-4 bg-zinc-800/50 rounded-2xl border border-zinc-700 focus:border-blue-500 outline-none text-lg transition-all"
                            />
                            <button
                                onClick={onClose}
                                className="absolute right-10 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-700 rounded-xl text-zinc-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Results / Content */}
                        <div className="max-h-[60vh] overflow-y-auto p-6">
                            {isLoading ? (
                                <div className="py-20 text-center space-y-4">
                                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                                    <p className="text-zinc-500 font-medium">Hunting for best deals...</p>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                        Top Results
                                        <span>{results.length} found</span>
                                    </div>
                                    <div className="grid gap-2">
                                        {results.map((product) => (
                                            <button
                                                key={product._id}
                                                onClick={() => handleSelect(product.slug)}
                                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all text-left group"
                                            >
                                                <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden p-2 flex-shrink-0">
                                                    <Image
                                                        src={product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=500&auto=format&fit=crop'}
                                                        alt={product.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{product.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-sm font-black text-blue-400">₹{product.price.toLocaleString('en-IN')}</span>
                                                        <span className="px-2 py-0.5 rounded-lg bg-zinc-800 text-[10px] font-bold text-zinc-400 uppercase">{product.platform}</span>
                                                    </div>
                                                </div>
                                                <ArrowRight className="text-zinc-600 group-hover:text-blue-500 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" size={20} />
                                            </button>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/products?search=${encodeURIComponent(query)}`}
                                        onClick={onClose}
                                        className="block py-4 text-center text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/5 rounded-2xl border border-blue-500/10 hover:border-blue-500/30"
                                    >
                                        View all results for &quot;{query}&quot;
                                    </Link>
                                </div>
                            ) : query.length >= 2 ? (
                                <div className="py-20 text-center space-y-4">
                                    <div className="text-zinc-700 flex justify-center">
                                        <Search size={48} />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-400">No deals found</h3>
                                    <p className="text-zinc-500">Try searching for something else like &quot;iPhone&quot; or &quot;Jeans&quot;</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">
                                            <TrendingUp size={14} /> Recommended Categories
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {['Mobiles', 'Electronics', 'Fashion', 'Home App', 'Beauty'].map((cat) => (
                                                <Link
                                                    key={cat}
                                                    href={`/products?category=${cat.toLowerCase().replace(' ', '-')}`}
                                                    onClick={onClose}
                                                    className="px-4 py-3 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-orange-500/50 text-sm font-semibold text-center transition-all"
                                                >
                                                    {cat}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-600/20">
                                        <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                            <ShoppingCart size={18} /> Quick Tip
                                        </h3>
                                        <p className="text-sm text-zinc-400">
                                            Found a better price somewhere else? Our prices are updated every hour to ensure you always get the best deal!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
