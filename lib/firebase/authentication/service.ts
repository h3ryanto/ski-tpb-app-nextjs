import app from '../init'
import { redirect } from 'next/navigation'
import { createSession,deleteSession} from '@/lib/auth/session'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth'




export const FirebaseAuth = getAuth(app)

export const Authentication = () => {
    return FirebaseAuth
    
  }

  export const SignUp = async (email :string,password:string) => {
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
  }
  
  export const SignIn = async (email:any,password:any) => {
    await signInWithEmailAndPassword(FirebaseAuth, email, password)
    await Authentication().onAuthStateChanged((user) => {
      if (user) {
        createSession(`${user.email}`)
        redirect('/') 
      }
    })
  }

  
  export const SignOut = async () => {
    await signOut(FirebaseAuth)
    await deleteSession()
    await redirect('/login') 
  }
  
  export const GetSignInErrorMessage = (code:any) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Email atau password salah'
      case 'auth/invalid-email':
      default:
        return 'Email tidak valid'
    }
  }
