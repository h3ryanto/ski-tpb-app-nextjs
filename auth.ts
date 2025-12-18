import NextAuth from "next-auth"
import { authConfig } from "./auth.config" // ⬅️ ubah dari "default"
import refreshAccessToken from "@/utils/refreshAccessToken"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 60 * 15,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        token.accessToken = user.accessToken
        token.refreshAccessToken = user.refreshAccessToken
        token.email = user.email
        token.name = user.name
        token.photo = user.photo
        token.isAdmin = user.isAdmin
        token.isGuest = user.isGuest
        token.accessTokenExpires = Date.now() + 13 * 60 * 1000
      }

      if (Date.now() < token.accessTokenExpires) return token
      return await refreshAccessToken(token)
    },
    async session({ session, token }: any) {
      session.user = {
        email: token.email,
        name: token.name,
        image: token.photo,
        isAdmin: token.isAdmin,
        isGuest: token.isGuest,
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
