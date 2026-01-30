import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const STATIC_ADMIN = {
    email: 'admin@trendhub.live',
    password: 'adminpassword123',
    id: 'static-admin-id'
};

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // Check against static credentials since DB is removed
        if (email !== STATIC_ADMIN.email || password !== STATIC_ADMIN.password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { id: STATIC_ADMIN.id, email: STATIC_ADMIN.email },
            process.env.JWT_SECRET || 'fallback_secret_for_dev',
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
