import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { getDb } from '@/lib/db';

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{
        category?: string;
        sort?: string;
        search?: string;
        platform?: string;
        maxPrice?: string;
    }>;
}) {
    const data = getDb();
    const resolvedSearchParams = await searchParams;
    const categories = data.categories.filter((c: any) => c.isActive);

    let filteredProducts = data.products.filter((p: any) => p.isActive);

    if (resolvedSearchParams.sort === 'trending') {
        filteredProducts = filteredProducts.filter((p: any) => p.isTrending);
    }

    if (resolvedSearchParams.category) {
        filteredProducts = filteredProducts.filter((p: any) => p.category === resolvedSearchParams.category);
    }

    if (resolvedSearchParams.platform) {
        filteredProducts = filteredProducts.filter((p: any) => p.platform === resolvedSearchParams.platform);
    }

    if (resolvedSearchParams.maxPrice) {
        const max = Number(resolvedSearchParams.maxPrice);
        filteredProducts = filteredProducts.filter((p: any) => p.price <= max);
    }

    if (resolvedSearchParams.search) {
        const search = resolvedSearchParams.search.toLowerCase();
        filteredProducts = filteredProducts.filter((p: any) => p.title.toLowerCase().includes(search));
    }

    const sortOption = resolvedSearchParams.sort || '-createdAt';
    if (sortOption === 'price-low') filteredProducts.sort((a: any, b: any) => a.price - b.price);
    else if (sortOption === 'price-high') filteredProducts.sort((a: any, b: any) => b.price - a.price);
    else if (sortOption === 'popular') filteredProducts.sort((a: any, b: any) => (b.clicks || 0) - (a.clicks || 0));
    else if (sortOption === 'discount') filteredProducts.sort((a: any, b: any) => (b.oldPrice || b.price * 1.6 - b.price) - (a.oldPrice || a.price * 1.6 - a.price));
    else if (sortOption === 'new') filteredProducts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const products = filteredProducts.map((p: any) => {
        const cat = data.categories.find((c: any) => c.slug === p.category || c._id === p.category);
        return {
            ...p,
            category: cat ? { name: cat.name } : { name: 'Uncategorized' }
        };
    });

    return (
        <div className="pt-32 pb-20 min-h-screen bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Discover Deals</h1>
                    <p className="text-zinc-400">Showing {products.length} hand-picked affiliate products.</p>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12">
                    <div className="flex-1 flex overflow-x-auto pb-4 lg:pb-0 lg:flex-wrap gap-3 no-scrollbar scroll-smooth">
                        <Link
                            href="/products"
                            className={`px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all whitespace-nowrap ${!resolvedSearchParams.category ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                        >
                            All
                        </Link>
                        {categories.map((cat: any) => (
                            <Link
                                key={cat._id.toString()}
                                href={`/products?category=${cat.slug}`}
                                className={`px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all whitespace-nowrap ${resolvedSearchParams.category === cat.slug ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <select
                            className="px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-semibold text-zinc-300 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer pr-10 relative"
                            defaultValue={resolvedSearchParams.sort || '-createdAt'}
                        >
                            <option value="-createdAt">Recently Added</option>
                            <option value="popular">Most Popular</option>
                            <option value="discount">Highest Discount</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((p: any) => (
                            <ProductCard key={p._id.toString()} product={JSON.parse(JSON.stringify(p))} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-4 bg-zinc-900/50 rounded-3xl border border-zinc-800 border-dashed">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                            <Search size={32} />
                        </div>
                        <p className="text-zinc-500 font-medium">No products found matching your criteria.</p>
                        <Link href="/products" className="text-blue-400 hover:underline">Clear all filters</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
