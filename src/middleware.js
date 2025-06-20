import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};



// import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server';
// import { routing } from './i18n/routing';

// const intlMiddleware = createMiddleware(routing);

// const PUBLIC_ROUTES = ['/sign-in', '/login'];

// export function middleware(request) {
//   const token = request.cookies.get('accessToken')?.value;
//   const { pathname } = request.nextUrl;

//   // Extract the locale from the pathname
//   const locale = routing.locales.find((locale) =>
//     pathname.startsWith(`/${locale}`)
//   ) ?? routing.defaultLocale;

//   // Remove the locale from the pathname to match against public routes
//   const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

//   // If user is NOT authenticated and accessing a protected route
//   if (!token && !PUBLIC_ROUTES.includes(pathWithoutLocale)) {
//     const signInUrl = new URL(`/${locale}/sign-in`, request.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   // If user IS authenticated and accessing the sign-in page — redirect home
//   // if (token && PUBLIC_ROUTES.includes(pathWithoutLocale)) {
//   //   const homeUrl = new URL(`/${locale}`, request.url);
//   //   return NextResponse.redirect(homeUrl);
//   // }

//   // Run i18n middleware normally
//   return intlMiddleware(request);
// }

// export const config = {
//   matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
// };
