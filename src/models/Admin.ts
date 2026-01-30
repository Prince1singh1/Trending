import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const AdminSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

AdminSchema.pre('save', async function () {
    const admin = this as any;
    if (!admin.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
    } catch (err: any) {
        throw err;
    }
});

AdminSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

const Admin: Model<IAdmin> =
    mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
