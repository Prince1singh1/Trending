import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const db = getDb();
        const product = db.products.find((p: any) => p._id === id);
        if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching product' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const db = getDb();
        const body = await req.json();

        const index = db.products.findIndex((p: any) => p._id === id);
        if (index === -1) return NextResponse.json({ message: 'Product not found' }, { status: 404 });

        db.products[index] = { ...db.products[index], ...body };
        saveDb(db);

        return NextResponse.json(db.products[index]);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const db = getDb();

        db.products = db.products.filter((p: any) => p._id !== id);
        saveDb(db);

        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
}
