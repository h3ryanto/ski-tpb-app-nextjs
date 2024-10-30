
import app from '../init'
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
    Authentication().onAuthStateChanged((user) => {
      if (user) {
    createSession(`${user.email}`)
      }
    })
  }

  
  export const SignOut = async () => {
    await signOut(FirebaseAuth)
    deleteSession()
  }
  
  export const GetSignInErrorMessage = (code:any) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Email tidak terdaftar'
      case 'auth/invalid-email':
      default:
        return 'Email atau password salah'
    }
  }