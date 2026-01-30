import Hero from '@/components/Hero';
import TrendingSwiper from '@/components/TrendingSwiper';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Laptop, Shirt, Smartphone, Home, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getDb } from '@/lib/db';
import DealsUnder999 from '@/components/DealsUnder999';
import FlashSale from '@/components/FlashSale';
import TrustSection from '@/components/TrustSection';
import * as motion from 'framer-motion/client';

export default async function HomePage() {
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

  const trendingProducts = getProductsWithCategory(data.products.filter((p: any) => p.isTrending && p.isActive !== false).slice(0, 8));
  const featuredProducts = getProductsWithCategory(data.products.filter((p: any) => p.isFeatured && p.isActive !== false).slice(0, 8));
  const recentProducts = getProductsWithCategory([...data.products].reverse().slice(0, 8));

  const categories = [
    { name: 'Mobiles', icon: Smartphone, color: 'text-blue-400', slug: 'mobiles' },
    { name: 'Electronics', icon: Laptop, color: 'text-purple-400', slug: 'electronics' },
    { name: 'Fashion', icon: Shirt, color: 'text-pink-400', slug: 'fashion' },
    { name: 'Home', icon: Home, color: 'text-orange-400', slug: 'home-appliances' },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen">
      <Hero />
      <FlashSale />

      {/* Trending Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-widest">
                <Sparkles size={16} /> Hot Right Now
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Trending Today</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-all font-bold">
              View All Deals <ArrowRight size={20} />
            </Link>
          </motion.div>

          {trendingProducts.length > 0 ? (
            <TrendingSwiper products={JSON.parse(JSON.stringify(trendingProducts))} />
          ) : (
            <div className="py-20 text-center text-zinc-500 italic bg-zinc-900/50 rounded-3xl border border-zinc-800 border-dashed">
              No trending products found. Check back later!
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white">Shop by Category</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg">Browse hand-picked deals across your favorite categories from the top retailers.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group block p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all text-center space-y-4 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 duration-500"
                >
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${cat.color} group-hover:bg-zinc-800/80 shadow-inner`}>
                    <cat.icon size={40} />
                  </div>
                  <h3 className="font-black text-xl text-white">{cat.name}</h3>
                  <p className="text-zinc-500 text-sm font-semibold group-hover:text-blue-400 transition-colors">Explore Deals</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Under 999 - New Features! */}
      <DealsUnder999 products={getProductsWithCategory(data.products)} />

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-white">Featured Deals</h2>
              <p className="text-zinc-400 text-lg">Hand-picked collection of premium products.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((p, i) => (
                <div key={p._id.toString()}>
                  <ProductCard product={JSON.parse(JSON.stringify(p))} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-zinc-500 italic bg-zinc-900/50 rounded-3xl border border-zinc-800 border-dashed text-lg">
                Stay tuned for our featured collection.
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-zinc-900 border border-zinc-800 font-black hover:bg-zinc-800 transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/5"
            >
              Discover More <ShoppingBag size={22} className="text-blue-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-zinc-900/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-white">New Arrivals</h2>
              <p className="text-zinc-400 text-lg">The latest deals just added to our collection.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentProducts.length > 0 ? (
              recentProducts.map((p) => (
                <ProductCard key={p._id.toString()} product={JSON.parse(JSON.stringify(p))} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-zinc-500 italic bg-zinc-900/50 rounded-3xl border border-zinc-800 border-dashed">
                Loading newest deals...
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Newsletter */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden shadow-[0_32px_80px_rgba(37,99,235,0.3)]"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[80px]" />

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Never miss a great deal again.</h2>
              <p className="text-blue-100 mb-10 text-xl font-medium leading-relaxed opacity-90">Join 10,000+ smart shoppers and get the hottest hand-picked deals delivered to your inbox every morning.</p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  suppressHydrationWarning
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-100 outline-none focus:ring-4 focus:ring-white/30 transition-all font-bold text-lg"
                />
                <button className="px-10 py-5 rounded-2xl bg-white text-blue-600 font-extrabold text-lg hover:bg-zinc-100 transition-all active:scale-95 shadow-2xl hover:shadow-white/20">
                  Subscribe Now
                </button>
              </form>
              <p className="mt-6 text-sm text-blue-100 font-bold opacity-60">No spam. Only the best deals. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

