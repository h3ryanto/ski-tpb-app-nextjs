
import app from '../init'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth'




export const FirebaseAuth = getAuth(app)

export const Authentication = () => {
  console.log(FirebaseAuth)
    return FirebaseAuth
    
  }

  export const SignUp = async (email :string,password:string) => {
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
  }
  
  export const SignIn = async (email:any,password:any) => {
    await signInWithEmailAndPassword(FirebaseAuth, email, password)
    console.log(FirebaseAuth)
  }

  
  export const SignOut = async () => {
    await signOut(FirebaseAuth)
    console.log(FirebaseAuth)
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