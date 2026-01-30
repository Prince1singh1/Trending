"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Trash2, Edit2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    _id: string;
    title: string;
    price: number;
    platform: string;
    image: string;
    isTrending: boolean;
    isFeatured: boolean;
    isActive: boolean;
    category: { name: string };
    clicks: number;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        const res = await fetch('/api/super-control/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;
        const res = await fetch(`/api/super-control/products/${id}`, { method: 'DELETE' });
        if (res.ok) fetchProducts();
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleBoolean = async (id: string, field: 'isTrending' | 'isFeatured' | 'isActive', currentVal: boolean) => {
        const res = await fetch(`/api/super-control/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [field]: !currentVal }),
        });
        if (res.ok) fetchProducts();
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Products</h1>
                    <p className="text-zinc-400 mt-1">Manage affiliate products across all platforms.</p>
                </div>
                <Link
                    href="/super-control/products/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20"
                >
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
                <button className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-all flex items-center gap-2">
                    <Filter size={18} /> Filter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-2xl bg-zinc-900 animate-pulse" />)
                ) : (
                    filteredProducts.map((product) => {
                        const imageSrc = product.image && product.image.trim() !== "" ? product.image : "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=500&auto=format&fit=crop";
                        return (
                            <motion.div
                                key={product._id.toString()}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-blue-900/10"
                            >
                                <div className="aspect-square relative flex items-center justify-center p-4 bg-white/5 overflow-hidden">
                                    <Image
                                        src={imageSrc}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase shadow-lg ${product.platform === 'amazon' ? 'bg-[#FF9900] text-black' : 'bg-[#2874F0] text-white'
                                            }`}>
                                            {product.platform}
                                        </span>
                                        <button
                                            onClick={() => toggleBoolean(product._id, 'isTrending', !!product.isTrending)}
                                            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all shadow-lg ${product.isTrending ? 'bg-orange-500 text-white' : 'bg-zinc-800/80 text-zinc-400 hover:text-white'}`}
                                        >
                                            {product.isTrending ? '🔥 Trending' : 'Trending'}
                                        </button>
                                        <button
                                            onClick={() => toggleBoolean(product._id, 'isFeatured', !!product.isFeatured)}
                                            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all shadow-lg ${product.isFeatured ? 'bg-purple-600 text-white' : 'bg-zinc-800/80 text-zinc-400 hover:text-white'}`}
                                        >
                                            {product.isFeatured ? '⭐ Featured' : 'Featured'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">{product.title}</h3>
                                        <div className="text-zinc-500 px-2 py-1 rounded bg-zinc-800 text-[10px]">
                                            {product.category?.name || 'Uncategorized'}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                                        <span className="text-zinc-500 text-xs">{product.clicks} clicks</span>
                                    </div>

                                    <div className="flex gap-2 pt-2 border-t border-zinc-800">
                                        <Link
                                            href={`/super-control/products/${product._id}`}
                                            className="flex-1 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all flex items-center justify-center"
                                        >
                                            <Edit2 size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-500/10 text-rose-500 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
