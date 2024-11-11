/* eslint-disable @typescript-eslint/no-unused-vars */
import app from '../init'
import { redirect } from 'next/navigation'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from 'firebase/auth'




export const FirebaseAuth = getAuth(app)

export const Authentication = () => {
    return FirebaseAuth
    
  }

  export const SignUp = async (email :string,password:string) => {
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
  }
  
  export const SignIn = async (email:any,password:any) => {
    const res =await signInWithEmailAndPassword(FirebaseAuth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    return user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage
  });

  return res
  }

  export const Update= async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        FirebaseAuth,
       "hery.heryanto21@gmail.com",
        "H3ry4nt0#"
      );
      updateProfile(user, {
        displayName: "Hery Heryanto",
        photoURL: "https://www.freepik.com/premium-vector/portrait-young-anime-male-student-with-straight-black-hair_262727129.htm#fromView=keyword&page=1&position=8&uuid=81ec9880-3dae-4253-aef2-c52d29721393"
      });
  } catch (e) {
      console.log(e)
  }
    
}
  
    export const logOut = async () => {
    await signOut(FirebaseAuth)
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
