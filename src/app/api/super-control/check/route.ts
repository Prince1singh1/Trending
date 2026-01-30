import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
    const token = req.headers.get('cookie')
        ?.split('; ')
        .find((row) => row.startsWith('admin_token='))
        ?.split('=')[1];

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json({ authenticated: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
