import { auth } from "@/auth"
import { encrypt, decrypt } from "@/lib/auth/session"

export async function GET() {
  const session = await auth()
  const token = await encrypt(session)
  // console.log(token)
  const secretKey = process.env.SESSION_SECRET
  const jwtVerify = await decrypt(token, `${secretKey}`)
  console.log(jwtVerify)
  const respons = Response.json(
    {
      'session': jwtVerify
    },
    {
      status: 200, statusText: 'OK',
      headers: { 'content-type': 'application/json' }
    }
  )


  return respons
}

