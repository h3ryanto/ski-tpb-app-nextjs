
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { SignIn } from "@/lib/firebase/authentication/service" 

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
                  const {email,password} = credentials as {
                    email: string;
                    password: string;
                  };

                  try {
                    const res = await SignIn(email, password)
                    if (res.auth.currentUser.email=email){
                        const user = {
                            email:res.auth.currentUser.email,
                            name:res.auth.currentUser.displayName,
                            photo:res.auth.currentUser.photoURL
                        }
                        return user
                    }else{
                        return null
                    }

                    } catch (error) {
                        console.log(error)
                        return null
                    }

               
                // await Authentication().onAuthStateChanged((user) => {
                //     if (user) {
                //         return user
                //     }else{
                //         throw new Error("Invalid credentials.")
                //     }
                // });
                
            },
            
          }),
      ],
 } satisfies NextAuthConfig