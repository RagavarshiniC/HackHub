import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboard = pathname === '/dashboard';

  if ((isAdminRoute || isDashboard) && !session) {
    const loginUrl = new URL(
      isAdminRoute ? '/login/admin' : '/login/contestant',
      req.nextUrl.origin
    );
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && session?.user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/login/admin', req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard', '/admin/:path*'],
};
