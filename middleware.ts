import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const secureCookie = process.env.NODE_ENV === "production";
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    secureCookie,
    cookieName: secureCookie
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/projects")) {
    const ua = request.headers.get("user-agent") || "";
    const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    response.headers.set(
      "Cross-Origin-Embedder-Policy",
      isSafari ? "require-corp" : "credentialless",
    );
  }
  return response;
}

export const config = {
  matcher: ["/projects/:path*", "/workspace/:path*"],
};
