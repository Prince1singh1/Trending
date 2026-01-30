import { getDb } from '@/lib/db';

export const CATEGORIES = getDb().categories;
export const PRODUCTS = getDb().products;

// Helper to refresh data if needed (though imports are cached in Next.js)
export function getFreshData() {
    return getDb();
}
