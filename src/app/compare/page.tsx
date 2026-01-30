import { getDb } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { Layers, Zap, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function ComparePage() {
    const data = getDb();

    const getProductsWithCategory = (products: any[]) => {
        return products.map(p => {
            const cat = data.categories.find((c: any) => c.slug === p.category || c._id === p.category);
            return {
                ...p,
                category: cat ? { name: cat.name } : { name: 'Featured' }
            };
        });
    };

    const categories = data.categories.filter((c: any) => c.isActive);
    const resolvedProducts = getProductsWithCategory(data.products.filter((p: any) => p.isActive));

    const amazonProducts = resolvedProducts.filter((p: any) => p.platform === 'amazon');
    const flipkartProducts = resolvedProducts.filter((p: any) => p.platform === 'flipkart');

    return (
        <div className="pt-32 pb-20 min-h-screen bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Scale size={14} /> Price Comparison
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black">Amazon vs Flipkart</h1>
                    <p className="text-zinc-400 max-w-2xl">Compare the best deals across top platforms and find the lowest prices instantly.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Amazon Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#FF9900]/10 flex items-center justify-center text-[#FF9900]">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" className="w-6 h-6" alt="Amazon" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Amazon Deals</h2>
                                    <p className="text-zinc-500 text-sm">{amazonProducts.length} Active Offers</p>
                                </div>
                            </div>
                            <Link href="/products?platform=amazon" className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {amazonProducts.slice(0, 4).map((p: any) => (
                                <ProductCard key={p._id} product={JSON.parse(JSON.stringify(p))} />
                            ))}
                        </div>
                    </div>

                    {/* Flipkart Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#2874F0]/10 flex items-center justify-center text-[#2874F0]">
                                    <img src="https://assets-assets.freecharge.in/root/freecharge/assets/images/merchant-logo/flipkart_new.png" className="w-6 h-6 rounded-md" alt="Flipkart" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Flipkart Deals</h2>
                                    <p className="text-zinc-500 text-sm">{flipkartProducts.length} Active Offers</p>
                                </div>
                            </div>
                            <Link href="/products?platform=flipkart" className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {flipkartProducts.slice(0, 4).map((p: any) => (
                                <ProductCard key={p._id} product={JSON.parse(JSON.stringify(p))} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Comparison Grid */}
                <div className="mt-24 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">Compare by Category</h2>
                        <p className="text-zinc-500">Find which platform has the better deals for your favorite categories.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat: any) => {
                            const catAmazon = amazonProducts.filter((p: any) => p.category === cat._id || p.category === cat.slug || p.category?.name === cat.name).length;
                            const catFlipkart = flipkartProducts.filter((p: any) => p.category === cat._id || p.category === cat.slug || p.category?.name === cat.name).length;

                            return (
                                <Link
                                    key={cat._id}
                                    href={`/products?category=${cat.slug}`}
                                    className="p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                            <Layers size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-white transition-colors">{cat.name}</h3>
                                            <div className="flex gap-4 mt-3 text-xs font-bold uppercase tracking-tighter">
                                                <span className="text-orange-400">{catAmazon} on Amazon</span>
                                                <span className="text-zinc-600">•</span>
                                                <span className="text-blue-400">{catFlipkart} on Flipkart</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Zap size={100} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
