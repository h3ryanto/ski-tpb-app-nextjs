/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import refreshAccessToken from "@/utils/refreshAccessToken"

export const { handlers, auth, signIn, signOut, } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 5,
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {


    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = user.accessToken
        token.refreshAccessToken = user.refreshAccessToken
        token.email = user.email;
        if (user.name) {
          token.name = user.name;
        }
        if (user.photo) {
          token.photo = user.photo;
        }
        // If the user is an admin or guest, add those properties to the token
        if (user.isGuest) {
          token.isGuest = user.isGuest;
        }
        if (user.isAdmin) {
          token.isAdmin = user.isAdmin;
        }
        // token.accessTokenExpires = Date.now() + 1 * 60 * 1000;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
      }

      // Jika belum expire, gunakan token lama
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          image: token.photo,
          isAdmin: token.isAdmin,
          isGuest: token.isGuest
        };
      }

      return session
    }
  },
  pages: {
    signIn: '/login'
  }
});








