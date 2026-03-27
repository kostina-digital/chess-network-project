import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Old paths used across the app / bookmarks → current routes (query preserved). */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/login") {
    return NextResponse.redirect(new URL(`/log-in${search}`, request.url));
  }
  if (pathname === "/register") {
    return NextResponse.redirect(new URL(`/sign-up${search}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
