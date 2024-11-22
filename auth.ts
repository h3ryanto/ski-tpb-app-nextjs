/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import authConfig from "./auth.config"



export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token
        token.email = user.email;
        if (user.name) {
          token.name = user.name;
        }
        if (user.photo) {
          token.photo = user.photo;
        }
      }
      return token
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      if (token.id) {
        session.accessToken = token.accessToken
        session.user.email = token.email
        if (token.name) {
          session.user.name = token.name
        }
        if (token.photo) {
          session.user.photo = token.photo
        }
      }

      return session
    }
  },
  pages: {
    signIn: '/login'
  }

  // }
});



