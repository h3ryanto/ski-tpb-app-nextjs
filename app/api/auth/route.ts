import { handlers } from "@/app/lib/auth/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers






// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextResponse } from 'next/server'
// import { SignIn, GetSignInErrorMessage } from '../../lib/firebase/authentication/service'

// export async function POST(request: Request) {
//   const formData = await request.formData()
//   const password = formData.get('password')
//   const email = formData.get('email')

//   try {
//     const res = await SignIn("herry@sankyo.co.id", "12345678")
//       return NextResponse.json({ success: "success" }, { status: 200 })   

//   } catch (error:any) {    
//     switch (error.code) {
//       case 'auth/invalid-credential':
//         return NextResponse.json({ error: 'Email tidak terdaftar' }, { status: 400 })
//       case 'auth/invalid-email':
//       default:
//         return NextResponse.json({ error: 'Email atau password tidak valid' }, { status: 401 })
//     }
   
//   }




// }
