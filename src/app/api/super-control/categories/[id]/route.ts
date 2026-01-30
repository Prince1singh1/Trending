import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import slugify from 'slugify';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const db = getDb();
        const body = await req.json();

        const index = db.categories.findIndex((c: any) => c._id === id);
        if (index === -1) return NextResponse.json({ message: 'Category not found' }, { status: 404 });

        const updatedCategory = { ...db.categories[index], ...body };
        if (body.name) {
            updatedCategory.slug = slugify(body.name, { lower: true });
        }

        db.categories[index] = updatedCategory;
        saveDb(db);

        return NextResponse.json(db.categories[index]);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating category' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const db = getDb();

        db.categories = db.categories.filter((c: any) => c._id !== id);
        saveDb(db);

        return NextResponse.json({ message: 'Category deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
    }
}
