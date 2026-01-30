import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalytics extends Document {
    productId: mongoose.Types.ObjectId;
    platform: 'amazon' | 'flipkart';
    timestamp: Date;
}

const AnalyticsSchema: Schema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        platform: { type: String, enum: ['amazon', 'flipkart'], required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { expires: '365d' } // Keep analytics for a year
);

const Analytics: Model<IAnalytics> =
    mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
