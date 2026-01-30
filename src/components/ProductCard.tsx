"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ExternalLink, Flame, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    product: {
        _id: string;
        slug: string;
        title: string;
        price: number;
        oldPrice?: number;
        platform: 'amazon' | 'flipkart';
        image: string;
        rating: number;
        isTrending?: boolean;
        category?: { name: string };
        clicks?: number;
    };
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=500&auto=format&fit=crop";

export default function ProductCard({ product }: ProductCardProps) {
    const [copied, setCopied] = useState(false);
    const [alerted, setAlerted] = useState(false);
    const [imgSrc, setImgSrc] = useState(product.image && product.image.trim() !== "" ? product.image : DEFAULT_IMAGE);

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/go/${product.slug}`;
        const shareData = {
            title: product.title,
            text: `Check out this deal on ${product.platform}: ${product.title}`,
            url: url
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePriceAlert = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAlerted(true);
        setTimeout(() => setAlerted(false), 3000);
    };

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 40;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
        >
            {/* Media Area */}
            <div className="aspect-[4/5] relative bg-white overflow-hidden p-6 group-hover:bg-zinc-100 transition-colors">
                <Image
                    src={imgSrc}
                    alt={product.title}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={() => setImgSrc(DEFAULT_IMAGE)}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.isTrending && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase shadow-lg shadow-orange-600/40 animate-pulse border border-orange-400/50">
                            <Flame size={12} fill="currentColor" /> Hot Deal
                        </div>
                    )}
                    <div className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase shadow-lg ${product.platform === 'amazon'
                        ? 'bg-[#FF9900]/90 text-black shadow-orange-950/20'
                        : 'bg-[#2874F0]/90 text-white shadow-blue-950/20'
                        }`}>
                        {product.platform}
                    </div>
                </div>

                {/* Social Proof Stats */}
                <div className="absolute bottom-4 left-4 z-10">
                    <div className="px-2.5 py-1.5 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        {product.clicks?.toLocaleString() || 0} clicks
                    </div>
                </div>

                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button
                        onClick={handleShare}
                        className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-xl hover:bg-white transition-colors text-zinc-900"
                        title="Copy Link"
                    >
                        {copied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                    </button>
                    <button
                        onClick={handlePriceAlert}
                        className={`p-2.5 rounded-xl border shadow-xl transition-all duration-300 ${alerted ? 'bg-green-100 border-green-500 text-green-600' : 'bg-white/80 border-white text-zinc-900 hover:bg-white'}`}
                        title="Price Alert"
                    >
                        {alerted ? <Check size={18} /> : <Star size={18} />}
                    </button>
                    <Link
                        href={`/go/${product.slug}`}
                        target="_blank"
                        className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-xl text-zinc-900 hover:bg-white transition-colors"
                        title="View Deal"
                    >
                        <ExternalLink size={18} />
                    </Link>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-medium text-blue-400 uppercase tracking-widest">
                        {product.category?.name || 'Featured'}
                        <div className="flex items-center gap-1 text-zinc-400">
                            <Star size={12} className="fill-yellow-500 text-yellow-500" />
                            {product.rating}
                        </div>
                    </div>
                    <h3 className="text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                        {product.title}
                    </h3>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-zinc-500 text-xs line-through">₹{(product.oldPrice || product.price * 1.6).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                            <span className="text-green-500 text-[10px] font-bold">{discount}% OFF</span>
                        </div>
                    </div>
                    <Link
                        href={`/go/${product.slug}`}
                        target="_blank"
                        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-900/40 active:scale-95 transition-all"
                    >
                        View Deal
                    </Link>
                </div>
            </div>

            {/* Alert Toast Overlay */}
            <AnimatePresence>
                {alerted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-0 bottom-0 p-4 z-50 pointer-events-none"
                    >
                        <div className="bg-green-600 text-white text-xs font-black py-2 rounded-xl text-center shadow-xl">
                            PRICE ALERT SET!
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
