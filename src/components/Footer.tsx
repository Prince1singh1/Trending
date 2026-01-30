import Link from 'next/link';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl">TrendHub</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Discover hand-picked trending products from Amazon & Flipkart. We bring you the best deals and curated lifestyle picks every single day.
                        </p>
                        <div className="flex gap-4">
                            <Twitter className="text-zinc-600 hover:text-white cursor-pointer transition-colors" size={20} />
                            <Instagram className="text-zinc-600 hover:text-white cursor-pointer transition-colors" size={20} />
                            <Mail className="text-zinc-600 hover:text-white cursor-pointer transition-colors" size={20} />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Explore</h4>
                        <div className="flex flex-col gap-3 text-sm text-zinc-500">
                            <Link href="/products" className="hover:text-white transition-colors">Trending Today</Link>
                            <Link href="/categories" className="hover:text-white transition-colors">Browse Categories</Link>
                            <Link href="/products?maxPrice=999" className="hover:text-white transition-colors">Deals Under ₹999</Link>
                            <Link href="/products?sort=new" className="hover:text-white transition-colors">Newly Added</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <div className="flex flex-col gap-3 text-sm text-zinc-500">
                            <Link href="/products?platform=amazon" className="hover:text-white transition-colors">Amazon Store</Link>
                            <Link href="/products?platform=flipkart" className="hover:text-white transition-colors">Flipkart Store</Link>
                            <Link href="/compare" className="hover:text-white transition-colors">Price Comparison</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <div className="flex flex-col gap-3 text-sm text-zinc-500">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[12px]">
                    <p>© {new Date().getFullYear()} Affiliate TrendHub. All rights reserved.</p>
                    <p className="mt-2 leading-relaxed max-w-2xl mx-auto">
                        Disclaimer: Affiliate TrendHub is a participant in the Amazon Services LLC Associates Program and Flipkart Affiliate Program, designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.in and flipkart.com.
                    </p>
                </div>
            </div>
        </footer>
    );
}
