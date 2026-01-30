"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RefreshCw, BadgePercent, CheckCircle2 } from 'lucide-react';

export default function TrustSection() {
    const trustCards = [
        { icon: ShieldCheck, title: "Verified Deals", desc: "Every deal is hand-verified for authenticity.", color: "text-emerald-400" },
        { icon: BadgePercent, title: "Max Savings", desc: "Lowest price guarantees from trusted stores.", color: "text-blue-400" },
        { icon: RefreshCw, title: "Realtime Stats", desc: "Dynamic pricing and availability updates.", color: "text-purple-400" },
    ];

    const brands = [
        { name: "Amazon", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" },
        { name: "Flipkart", img: "https://assets-assets.freecharge.in/root/freecharge/assets/images/merchant-logo/flipkart_new.png" },
        { name: "Myntra", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Myntra_logo.png" },
        { name: "Ajio", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ajio_Logo.svg/2560px-Ajio_Logo.svg.png" },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {trustCards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[40px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${card.color}`}>
                                <card.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                {card.title}
                                <CheckCircle2 size={16} className="text-emerald-500" />
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-12">
                    <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm">Empowering trust with global leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {brands.map((brand, i) => (
                            <img key={i} src={brand.img} alt={brand.name} className="h-10 md:h-12 w-auto object-contain cursor-help" title={brand.name} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
