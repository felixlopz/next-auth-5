import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/"];
const publicRoutes = ["/login", "/signup"];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isAuth = req.auth != null;

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isAuth) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    isAuth &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
