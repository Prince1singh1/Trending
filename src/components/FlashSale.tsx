"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, ArrowRight, Flame } from 'lucide-react';
import Link from 'next/link';

export default function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 12,
        minutes: 45,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-xl text-white shadow-lg">
                {value.toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1 text-blue-200 opacity-70">{label}</span>
        </div>
    );

    return (
        <section className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-1 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 rounded-[36px] overflow-hidden shadow-2xl shadow-blue-500/20"
            >
                <div className="bg-zinc-950 rounded-[34px] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Zap size={40} className="fill-current animate-pulse" />
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1"
                            >
                                <Flame size={24} className="text-orange-600 fill-current" />
                            </motion.div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Lightning Deals!</h2>
                            <p className="text-zinc-400 font-medium">Extra discounts for a limited time only. Don't blink!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <TimeUnit value={timeLeft.hours} label="Hrs" />
                        <span className="text-2xl font-black text-white/30 mb-5">:</span>
                        <TimeUnit value={timeLeft.minutes} label="Min" />
                        <span className="text-2xl font-black text-white/30 mb-5">:</span>
                        <TimeUnit value={timeLeft.seconds} label="Sec" />
                    </div>

                    <Link
                        href="/products?sort=discount"
                        className="group flex items-center gap-3 px-8 py-5 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 transition-all hover:scale-105 shadow-xl shadow-white/10"
                    >
                        Grab Offers <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
