export const runtime = 'nodejs'; // ✅ Needed for DB access

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import db from './lib/db';

// Public routes for Clerk
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/mens',
  '/womens',
  '/admin/login', // ← Clerk se bahar, custom auth
  '/about',
  '/api/admin/log-in',
  '/contact',
  '/api/admin/countusers',
  "api/admin/orders-product-count", 
  '/api/perfumes',
]);

// Check if route is admin
const isAdminRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/admin-role');

// ✅ Unified middleware
export default clerkMiddleware(async (auth:any, request) => {
  const url = request.nextUrl;

  // Agar /admin/login hai → Clerk se bahar → allow
  if (url.pathname === '/admin-role/login') {
    return NextResponse.next();
  }

  if (url.pathname === "/api/admin/countusers") {
    return NextResponse.next()
  }

  if (url.pathname === "/api/admin/orders-product-count") {
    return NextResponse.next()
  }

  // Agar /admin/* hai → custom admin auth lagao
  if (isAdminRoute(request)) {
    // console.log(request)
    return await handleAdminAuth(request);
  }

  // protected routes → Clerk se protect karo
  if (!isPublicRoute(request)) {
    return await auth.protect();
  }

  return NextResponse.next();
});

// --------------------------------------------------------------

//  Admin auth logic as helper
async function handleAdminAuth(request: NextRequest) {

  
  const cookie = request.headers.get('cookie');
  // console.log('Admin auth cookie:', cookie);
  if (!cookie) {
    return NextResponse.redirect(new URL('/admin-role/login', request.url));
  }

  const cookies = parse(cookie);
  // console.log('Parsed cookies:', cookies);
  const session = cookies['admin_session'];
  // console.log('Admin session cookie:', session);
  if (!session) {
    return NextResponse.redirect(new URL('/admin-role/login', request.url));
  }

  try {
    const [adminId] = Buffer.from(session, 'base64').toString().split(':');
    // console.log('Decoded admin ID from session:', adminId);
    const result = await db.query('SELECT * FROM admin WHERE id = $1', [adminId]);

    console.log('Admin lookup result:', result.rows);

    // console.log('Admin lookup result:', result.rows);
    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/admin-role/login', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    // console.error('Error during admin auth:', error);
    return NextResponse.redirect(new URL('/admin-role/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};