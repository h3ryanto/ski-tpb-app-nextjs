/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import authConfig from "./auth.config"



export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 10,
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
        // If the user is an admin or guest, add those properties to the token
        if (user.isGuest) {
          token.isGuest = user.isGuest;
        }
        if (user.isAdmin) {
          token.isAdmin = user.isAdmin;
        }

      }
      return token
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      // if (token.id) {
      //   session.accessToken = token.accessToken
      //   session.user.email = token.email
      //   session.user.image = token.photo
      // }
      if (token) {
        session.accessToken = token.accessToken
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

  // }
});



