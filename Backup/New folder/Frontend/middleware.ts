// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Retrieve token from cookies
  const { pathname } = request.nextUrl;

  // Protect the /admin route
  if (pathname.startsWith('/admin') && !token) {
    // Redirect to /autentikasi if not logged in
    return NextResponse.redirect(new URL('/autentikasi', request.url));
  }

  // Allow access to other routes
  return NextResponse.next();
}

// This will run the middleware on these routes
export const config = {
  matcher: ['/admin/:path*'], // Adjust the matcher to suit your routes
};
