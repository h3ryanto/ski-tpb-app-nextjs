import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await axios.post(`${process.env.API_URL}/auth/login`, {
            email,
            password,
          });

          const user = res.data;
          if (user && user.email === email) {
            return {
              email: user.email,
              name: user.name,
              photo: user.photo,
              isAdmin: user.isAdmin,
              accessToken: user.accessToken,
              refreshAccessToken: user.refreshAccessToken,
              roleId: user.roleId,
            };
          }
          return null;
        } catch (error: any) {
          console.error(
            "❌ authorize error:",
            error.response?.data || error.message
          );
          return null;
        }
      },
    }),
  ],
};
