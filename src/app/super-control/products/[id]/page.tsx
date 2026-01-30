"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        platform: 'amazon',
        affiliateLink: '',
        image: '',
        rating: '5',
        isTrending: false,
        isFeatured: false,
        isActive: true
    });

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        // Fetch categories and product data
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch('/api/super-control/categories'),
                    fetch(`/api/super-control/products/${id}`)
                ]);

                const categoriesData = await catRes.json();
                const productData = await prodRes.json();

                setCategories(categoriesData);
                setFormData({
                    title: productData.title,
                    price: productData.price.toString(),
                    category: productData.category || '',
                    platform: productData.platform,
                    affiliateLink: productData.affiliateLink,
                    image: productData.image,
                    rating: productData.rating.toString(),
                    isTrending: productData.isTrending || false,
                    isFeatured: productData.isFeatured || false,
                    isActive: productData.isActive !== false
                });
                setPreview(productData.image);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            setError(null);
            let imageUrl = formData.image;

            if (!formData.title || !formData.price || !formData.category || !formData.affiliateLink) {
                setError('Please fill in all required fields.');
                setSaving(false);
                return;
            }

            // Upload image to Cloudinary if it's a new file (data URI)
            if (preview && preview.startsWith('data:')) {
                setUploading(true);
                const uploadRes = await fetch('/api/super-control/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: preview }),
                });

                if (!uploadRes.ok) throw new Error('Image upload failed');

                const uploadData = await uploadRes.json();
                imageUrl = uploadData.url;
                setUploading(false);
            } else if (!preview) {
                imageUrl = '';
            }

            const res = await fetch(`/api/super-control/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    rating: Number(formData.rating),
                    image: imageUrl,
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/super-control/products');
                    router.refresh();
                }, 1500);
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to update product');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/super-control/products" className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Edit Product</h1>
                    <p className="text-zinc-400 mt-1">Update the details of this deal.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Media */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                        <h3 className="text-lg font-bold mb-4">Product Image</h3>
                        <div className={`aspect-square rounded-xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center relative overflow-hidden group ${!preview && 'hover:border-blue-500 transition-all cursor-pointer'}`}>
                            {preview ? (
                                <>
                                    <Image src={preview} alt="Preview" fill className="object-contain p-4" />
                                    <button
                                        type="button"
                                        onClick={() => { setPreview(null); setFormData(prev => ({ ...prev, image: '' })); }}
                                        className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Upload className="text-zinc-500 mb-2" size={32} />
                                    <span className="text-zinc-500 text-sm">Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                        {uploading && <p className="text-blue-400 text-xs mt-2 animate-pulse">Uploading to Cloudinary...</p>}

                        <div className="pt-4 border-t border-zinc-800">
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Or Paste Image URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFormData(prev => ({ ...prev, image: val }));
                                    if (val && (val.startsWith('http') || val.startsWith('https'))) {
                                        setPreview(val);
                                    }
                                }}
                                placeholder="https://m.media-amazon.com/..."
                                className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all text-xs"
                            />
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                        <h3 className="text-lg font-bold">Visibility</h3>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isTrending}
                                onChange={e => setFormData({ ...formData, isTrending: e.target.checked })}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-zinc-300">Set as Trending Today</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-zinc-300">Feature on Homepage</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-zinc-300">Product is Active</span>
                        </label>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Product Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Apple iPhone 15 (128 GB) - Black"
                                className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="69999"
                                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Platform</label>
                                <div className="flex gap-2 p-1 bg-zinc-800 rounded-xl border border-zinc-700">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, platform: 'amazon' })}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.platform === 'amazon' ? 'bg-[#FF9900] text-black shadow-lg shadow-orange-900/20' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        Amazon
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, platform: 'flipkart' })}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.platform === 'flipkart' ? 'bg-[#2874F0] text-white shadow-lg shadow-blue-900/20' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        Flipkart
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Rating (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={e => setFormData({ ...formData, rating: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Affiliate Link</label>
                            <input
                                type="url"
                                required
                                value={formData.affiliateLink}
                                onChange={e => setFormData({ ...formData, affiliateLink: e.target.value })}
                                placeholder="https://amazon.in/dp/..."
                                className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        {error && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 font-medium text-sm">
                                {error}
                            </motion.p>
                        )}
                        {success && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 font-medium text-sm">
                                Product updated successfully! Redirecting...
                            </motion.p>
                        )}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-8 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving || success}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save size={20} />
                                {saving ? 'Saving...' : success ? 'Updated!' : 'Update Product'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
