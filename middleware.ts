import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
	const token = await getToken({ req });
	const isAuthPage =
		req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');
	const isProtectedPage = req.nextUrl.pathname.startsWith('/dashboard');

	if (token && isAuthPage) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	if (!token && isProtectedPage) {
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

export const config = {
	matcher: ['/dashboard', '/login', '/register'],
};
