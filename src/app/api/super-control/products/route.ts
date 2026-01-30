import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import slugify from 'slugify';

export function getUpdatedProductsWithCategory(db: any, products: any[]) {
    return products.map((p: any) => {
        // Look up by ID or slug to be robust
        const cat = db.categories.find((c: any) => c._id === p.category || c.slug === p.category);
        return {
            ...p,
            category: cat ? { name: cat.name, slug: cat.slug, _id: cat._id } : { name: 'Uncategorized' }
        };
    });
}

export async function GET(req: Request) {
    try {
        const db = getDb();
        const { searchParams } = new URL(req.url);
        const categoryParam = searchParams.get('category');
        const trending = searchParams.get('trending');

        let filteredProducts = [...db.products];

        if (categoryParam) {
            const foundCat = db.categories.find((c: any) => c.slug === categoryParam || c._id === categoryParam);
            const catSearch = foundCat ? [foundCat._id, foundCat.slug] : [categoryParam];

            filteredProducts = filteredProducts.filter((p: any) =>
                catSearch.includes(p.category)
            );
        }
        if (trending) {
            filteredProducts = filteredProducts.filter((p: any) => p.isTrending);
        }

        return NextResponse.json(getUpdatedProductsWithCategory(db, filteredProducts));
    } catch (error) {
        console.error('Error fetching admin products:', error);
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(req: Request) {
    try {
        const db = getDb();
        const body = await req.json();

        const newProduct = {
            ...body,
            _id: Date.now().toString(),
            slug: body.slug || slugify(body.title, { lower: true }),
            isActive: body.isActive !== undefined ? body.isActive : true,
            isTrending: body.isTrending || false,
            isFeatured: body.isFeatured || false,
            clicks: 0,
            createdAt: new Date().toISOString()
        };

        db.products.push(newProduct);
        saveDb(db);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json({ message: 'Error creating product' }, { status: 400 });
    }
}
