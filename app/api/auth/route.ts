/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers'
import { SignIn, GetSignInErrorMessage } from '../../lib/firebase/authentication/service'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = formData.get('password')
  const email = formData.get('email')

  try {
    await SignIn(email, password)
  } catch (error:any) {

    
    switch (error.code) {
      case 'auth/invalid-credential':
        return new Response('Email tidak terdaftar', {status: 400})
      case 'auth/invalid-email':
      default:
        return new Response('Email atau password salah' , {status: 401, statusText:'Email atau password salah'})
    }
   
  }




}
