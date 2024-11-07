
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Authentication, SignIn } from '@/lib/firebase/authentication/service'
 
export default { 
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
                },
                
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                async authorize(credentials:any) {
                    console.log(credentials)
                //   const {email,password} = credentials as {
                //     email: string;
                //     password: string;
                //   };
                await SignIn(credentials.email, credentials.password)
                const user = {email:credentials.email,password:credentials.password}
                await Authentication().onAuthStateChanged((user) => {
                    if (user) {
                        return user
                    }else{
                        throw new Error("Invalid credentials.")
                    }
                });
                return user
            },
            
          }),
      ],
 } satisfies NextAuthConfig