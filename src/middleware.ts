import { NextResponse, type NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/super-control')) {
        // Skip auth check for login page itself
        if (pathname === '/super-control/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/super-control/login', request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jose.jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/super-control/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/super-control/:path*'],
};
