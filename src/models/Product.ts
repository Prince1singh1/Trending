import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    slug: string;
    description?: string;
    price: number;
    affiliateLink: string;
    image: string;
    category: mongoose.Types.ObjectId;
    platform: 'amazon' | 'flipkart';
    rating: number;
    isTrending: boolean;
    isFeatured: boolean;
    isActive: boolean;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        price: { type: Number, required: true },
        affiliateLink: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        platform: { type: String, enum: ['amazon', 'flipkart'], required: true },
        rating: { type: Number, default: 0 },
        isTrending: { type: Boolean, default: false },
        isFeatured: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        clicks: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
