// import { NextRequest, NextResponse } from 'next/server'
// import { decrypt } from '@/lib/auth/session'
// import { cookies } from 'next/headers'
// // import authConfig from "./auth.config"
// // import NextAuth from "next-auth"

// // const { auth } = NextAuth(authConfig)

// // 1. Specify protected and public routes
// const protectedRoutes = ['/dashboard','/','/about']
// const publicRoutes = ['/login']

// export default async function middleware(req: NextRequest) {
//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)

//   // 3. Decrypt the session from the cookie
//   const cookie = (await cookies()).get('session')?.value
//   const session = await decrypt(cookie)

//   // 4. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/login', req.nextUrl))
//   }

//   // 5. Redirect to /dashboard if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   }

//   return NextResponse.next()
// }

import { auth } from "@/auth"

const publicRoutes = ['/login', '/forgot_password']

export default auth((req) => {


  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  if (!req.auth && !isPublicRoute) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
