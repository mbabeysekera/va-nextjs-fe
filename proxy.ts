import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token");

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Optimistic Redirect: If no token, send to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Rewrite: Act as a proxy to an external microservice
  //   if (request.nextUrl.pathname.startsWith("/api/v2")) {
  //     return NextResponse.rewrite(
  //       new URL("https://api.external-service.com", request.url)
  //     );
  //   }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api", "/api/:path*"],
};
