import { LayoutGrid, ArrowRight } from 'lucide-react';
import { getDb } from '@/lib/db';

export default async function CategoriesPage() {
    const data = getDb();
    const categories = data.categories.filter((c: any) => c.isActive).sort((a: any, b: any) => a.order - b.order);

    // Get product counts for each category
    const categoriesWithCount = categories.map((cat: any) => {
        const count = data.products.filter((p: any) => (p.category === cat.slug || p.category === cat._id) && p.isActive).length;
        return { ...cat, count };
    });

    return (
        <div className="pt-32 pb-20 min-h-screen bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-400 border border-blue-600/20 text-sm font-bold uppercase tracking-wider">
                        <LayoutGrid size={16} /> Explore Collections
                    </div>
                    <h1 className="text-5xl font-bold">Categories</h1>
                    <p className="text-zinc-400 text-lg">Browse curated deals across varied lifestyle and tech categories from Amazon and Flipkart.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoriesWithCount.map((cat: any) => (
                        <a
                            key={cat._id}
                            href={`/products?category=${cat.slug}`}
                            className="group relative p-10 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all overflow-hidden"
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -bottom-6 -right-6 text-zinc-800/20 group-hover:scale-125 transition-transform duration-500">
                                <LayoutGrid size={160} />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-all duration-300">
                                    <LayoutGrid size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                                    <p className="text-zinc-500 font-medium">{cat.count} curated products</p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                                    Show Deals <ArrowRight size={20} className="text-blue-500" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
