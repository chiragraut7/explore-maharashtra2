import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🛡️ Content Security Policy
  // Added basemaps.cartocdn.com to img-src to fix your map background
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://www.goexploremaharashtra.in https://*.google.com https://*.gstatic.com https://*.googleapis.com;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https://*.google.com https://api.open-meteo.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);

  // 🔒 API Protection Logic
  if (pathname.startsWith('/api') || pathname.startsWith('/admin')) {
    const ADMIN_KEY = process.env.ADMIN_SECRET_KEY;
    const authToken = request.headers.get('x-admin-token');

    if (!authToken || authToken !== ADMIN_KEY) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Content-Security-Policy': cspHeader 
          } 
        }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};