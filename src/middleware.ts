export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';
import db from '@/lib/db';

// ✅ Public routes (non-authenticated access allowed)
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/mens',
  '/womens',
  '/about',
  '/contact',
  '/api/auth/login',
  '/api/auth/register', 
  '/api/perfumes'
];

// ✅ Check if route is admin route
const isAdminRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/admin-role');

// ✅ Admin auth helper
async function handleAdminAuth(request: NextRequest) {
  const cookie = request.headers.get('cookie');
  if (!cookie) {
    return NextResponse.redirect(new URL('/admin-role/login', request.url));
  }

  const cookies = parse(cookie);
  const session = cookies['admin_session'];
  if (!session) {
    return NextResponse.redirect(new URL('/admin-role/login', request.url));
  }

  try {
    const [adminId] = Buffer.from(session, 'base64').toString().split(':');
    const result = await db.query('SELECT id FROM admin WHERE id = $1', [adminId]);
    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/admin-role/login', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/admin-role/login', request.url));
  }
}

// ✅ Main middleware
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // 1. Public paths → allow immediately
  if (publicPaths.some(path => 
    url.pathname === path || 
    url.pathname.startsWith(`${path}/`)
  )) {
    return NextResponse.next();
  }

  // 2. Admin routes → use custom admin auth
  if (isAdminRoute(request)) {
    return await handleAdminAuth(request);
  }

  // 3. All other protected routes → use JWT auth (for regular users)
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};