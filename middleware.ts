import { auth } from "@/auth"

const publicRoutes = ['/login', '/forgot_password', '/reset_password']
const adminRoutes = ['/user']
const mainRoutes = ['/']

export default auth((req) => {


  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)
  const isAdminRoute = adminRoutes.includes(path)
  const isMainRoute = mainRoutes.includes(path)

  if (!req.auth && !isPublicRoute) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (!req.auth?.user.isAdmin && isAdminRoute && !isPublicRoute) {
    const newUrl = new URL("/unauthorized", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (req.auth && (isPublicRoute || isMainRoute)) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

})

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
