"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, GripVertical, Check, X } from 'lucide-react';

interface Category {
    _id: string;
    name: string;
    slug: string;
    order: number;
    isActive: boolean;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCatName, setNewCatName] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const fetchCategories = async () => {
        const res = await fetch('/api/super-control/categories');
        const data = await res.json();
        setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName.trim()) return;

        const res = await fetch('/api/super-control/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCatName }),
        });

        if (res.ok) {
            setNewCatName('');
            fetchCategories();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure? This will not delete products in this category but they will lose their category reference.')) return;
        const res = await fetch(`/api/super-control/categories/${id}`, { method: 'DELETE' });
        if (res.ok) fetchCategories();
    };

    const handleUpdate = async (id: string) => {
        const res = await fetch(`/api/super-control/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editValue }),
        });
        if (res.ok) {
            setEditingId(null);
            fetchCategories();
        }
    };

    const toggleStatus = async (cat: Category) => {
        const res = await fetch(`/api/super-control/categories/${cat._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: !cat.isActive }),
        });
        if (res.ok) fetchCategories();
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="text-zinc-400 mt-1">Manage product categories and their order.</p>
                </div>
            </div>

            <form onSubmit={handleAdd} className="flex gap-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="New category name (e.g. Electronics)"
                    className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition-all"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                    <Plus size={20} /> Add
                </button>
            </form>

            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-10 text-zinc-500">Loading categories...</div>
                ) : (
                    <AnimatePresence>
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat._id.toString()}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
                            >
                                <div className="cursor-grab text-zinc-600 hover:text-zinc-400">
                                    <GripVertical size={20} />
                                </div>

                                <div className="flex-1">
                                    {editingId === cat._id ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-1 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
                                                autoFocus
                                            />
                                            <button onClick={() => handleUpdate(cat._id)} className="p-1 text-emerald-400 hover:bg-emerald-400/10 rounded">
                                                <Check size={20} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="p-1 text-zinc-400 hover:bg-zinc-700 rounded">
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`font-medium ${cat.isActive ? 'text-white' : 'text-zinc-500 line-through'}`}>
                                            {cat.name}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setEditingId(cat._id); setEditValue(cat.name); }}
                                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(cat)}
                                        className={`p-2 rounded-lg transition-all ${cat.isActive ? 'text-emerald-400 hover:bg-emerald-400/10' : 'text-zinc-500 hover:bg-zinc-800'}`}
                                    >
                                        {cat.isActive ? 'Active' : 'Disabled'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
