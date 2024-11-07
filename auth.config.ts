
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Authentication, SignIn } from '@/lib/firebase/authentication/service'
import app from '@/lib/firebase/init'
import {
    getAuth,
    signInWithEmailAndPassword,
  } from 'firebase/auth' 

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

                  const FirebaseAuth = getAuth(app)
                const user = await signInWithEmailAndPassword(FirebaseAuth, email, password)
                            .then((userCredential) => {
                            
                            const user = userCredential.user;
                            return user
                        }).catch((error) => {
                            throw new Error("Invalid credentials.")
                        });

                if (user){
                    return user
                }else{
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