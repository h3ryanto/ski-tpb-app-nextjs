import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/forgot_password", "/reset_password"];
const mainRoutes = ["/"];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isMainRoute = mainRoutes.includes(path);

  if (
    !req.auth &&
    !isPublicRoute &&
    !path.startsWith("/.well-known") &&
    !path.startsWith("/_next") &&
    !path.startsWith("/api") &&
    !path.startsWith("/favicon.ico")
  ) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    const response = NextResponse.redirect(newUrl);

    // Set cookie pada response
    response.cookies.set("from", path, {
      path: "/",
      maxAge: 60 * 5, // 5 menit (opsional)
      // httpOnly: true, // jika ingin hanya bisa diakses server
    });
    return response;
  }

  if (
    req.auth &&
    (isPublicRoute || isMainRoute) &&
    !("isGuest" in (req.auth.user ?? {}) && (req.auth.user as any).isGuest)
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    !req.nextUrl.pathname.startsWith("/pdf") &&
    "isGuest" in (req.auth.user ?? {}) &&
    (req.auth.user as any).isGuest
  ) {
    const newUrl = new URL("/api/auth/signout", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
