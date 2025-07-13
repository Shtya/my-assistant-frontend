// middleware.ts
import { NextResponse } from 'next/server';
 import createMiddleware from 'next-intl/middleware';
 
// Configure next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'], 
  defaultLocale: 'en',
});

export async function middleware(request ) {
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(request);
  }

  // Extract locale from pathname
  const pathLocale = ["ar" , "en"].find((locale) => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Check if this is an auth route (needs to account for locale)
  const isAuthPage = pathname.includes('/auth') || 
                    (pathLocale && pathname === `/${pathLocale}/auth`) ||
                    (!pathLocale && pathname === '/auth');

  // Check for user cookie
  const userCookie = request.cookies.get('user');
  const hasValidAuth = !!userCookie?.value;

  // If user is authenticated and trying to access auth pages
  if (hasValidAuth && isAuthPage) {
    // Redirect to home page with proper locale
    const locale = pathLocale || 'en';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // If user is not authenticated and trying to access protected pages
  if (!hasValidAuth && !isAuthPage) {
    // Redirect to auth page with proper locale
    const locale = pathLocale || 'en';
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
  }

  // Apply internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};