import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import slugify from 'slugify';

export async function GET() {
    try {
        const db = getDb();
        return NextResponse.json(db.categories);
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(req: Request) {
    try {
        const db = getDb();
        const body = await req.json();

        if (!body.name) return NextResponse.json({ message: 'Name is required' }, { status: 400 });

        const newCategory = {
            ...body,
            _id: Date.now().toString(),
            slug: body.slug || slugify(body.name, { lower: true }),
            isActive: true,
            order: db.categories.length + 1
        };

        db.categories.push(newCategory);
        saveDb(db);

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error creating category' }, { status: 400 });
    }
}
