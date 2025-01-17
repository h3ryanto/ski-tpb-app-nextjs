import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { SignIn } from "@/lib/database/neon_postgresSql/authentication"

export default {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials: any) {
                console.log(credentials)
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {
                    const users = await SignIn(email, password)
                    if (users) {
                        if (users.email = email) {
                            const user = {
                                email: users.email,
                                name: users.name,
                                photo: users.photo,
                                isAdmin: users.isAdmin
                            }
                            return user

                        } else {
                            return null
                        }
                    } else {
                        return null
                    }



                } catch (error) {
                    console.log(error)
                    return null
                }

            },

        }),
    ],
} satisfies NextAuthConfig