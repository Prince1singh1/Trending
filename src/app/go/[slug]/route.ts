import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const db = getDb();
        const productIndex = db.products.findIndex((p: any) => p.slug === slug);

        if (productIndex === -1) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Increment clicks
        db.products[productIndex].clicks = (db.products[productIndex].clicks || 0) + 1;
        saveDb(db);

        // Redirect to affiliate link
        return NextResponse.redirect(db.products[productIndex].affiliateLink);
    } catch (error) {
        console.error('Redirect error:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}
