export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { parse } from "cookie";
import db from "@/lib/db";
import { verifyToken } from "./lib/auth";

//Public routes (non-authenticated access allowed)
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/mens",
  "/womens",
  "/about",
  "/contact",
  "/api/auth/login",
  "/api/auth/register",
  "/api/perfumes",
  '/admin-role/login-admin',
];


export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const isAdminRoute = url.pathname.startsWith("/admin-role");
  const isLoginRoute = url.pathname === "/admin-role/login-admin";

  // 1. Public paths → allow immediately
  if (
    publicPaths.some(
      (path) => url.pathname === path || url.pathname.startsWith(`${path}/`)
    )
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(token){
    if(url.pathname === '/login' || url.pathname === '/register'){
      return window.location.replace('/')
    }
  }

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("admin_session");
  const token_admin = cookie?.value;

  if (!isLoginRoute) {
    // If no token exists, kick them to login
    if (!token_admin) {
      return NextResponse.redirect(
        new URL("/admin-role/login-admin", request.url)
      );
    }

    const verfiyTokenAdminPayload = await verifyToken(token_admin);

    if (!verfiyTokenAdminPayload) {
      // Optional: delete the bad cookie so the browser cleans up
      const response = NextResponse.redirect(
        new URL("/admin-role/login-admin", request.url)
      );
      response.cookies.delete("admin_session");
      return response;
    }

    // Success! Allow access.
    return NextResponse.next();
  }

  if (isLoginRoute) {
    // If they already have a VALID token, why let them login again?
    // Redirect them straight to the dashboard.
    if (token_admin) {
      const verifiedTokenPayload = await verifyToken(token_admin);
      if (verifiedTokenPayload) {
        return NextResponse.redirect(new URL("/admin-role/", request.url));
      }
    }
    // If no token, let them stay on the login page
    return NextResponse.next();
  }

  // 3. All other protected routes → use JWT auth (for regular users)

  try {
    verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
