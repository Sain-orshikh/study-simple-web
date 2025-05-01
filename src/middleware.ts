import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For API routes, we'll let the actual API handler connect to MongoDB
  // We don't need to pre-connect in middleware since Edge runtime doesn't support it
  
  // Continue with the request
  return NextResponse.next();
}

// Only run middleware on API routes
export const config = {
  matcher: '/api/:path*',
};