import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import Category from '@/models/Category';
import Product from '@/models/Product';

const SEED_CATEGORIES = [
    { name: 'Mobiles', slug: 'mobiles', order: 1 },
    { name: 'Electronics', slug: 'electronics', order: 2 },
    { name: 'Fashion', slug: 'fashion', order: 3 },
    { name: 'Home Appliances', slug: 'home-appliances', order: 4 },
    { name: 'Beauty', slug: 'beauty', order: 5 },
    { name: 'Deals Under ₹999', slug: 'deals-under-999', order: 6 },
];

async function seed() {
    try {
        await dbConnect();

        // Seed Admin
        const adminExists = await Admin.findOne({ email: 'admin@trendhub.live' });
        if (!adminExists) {
            await Admin.create({
                email: 'admin@trendhub.live',
                password: 'adminpassword123', // This will be hashed by the model pre-save hook
            });
            console.log('Admin seeded: admin@trendhub.live / adminpassword123');
        }

        // Seed Categories
        for (const cat of SEED_CATEGORIES) {
            await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
        }
        console.log('Categories seeded.');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
