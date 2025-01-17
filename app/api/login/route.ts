import { encrypt } from "@/lib/auth/session"
import { SignIn } from '@/lib/database/neon_postgresSql/authentication'


export async function POST(request: Request) {
  const body = await request.json()
  const credentials = await SignIn(body.email, body.password)

  if (credentials) {
    const token = await encrypt({ email: credentials.email, name: credentials.name, photo: credentials.photo, isAdmin: credentials.isAdmin })
    return Response.json(
      {
        email: credentials.email,
        nama: credentials.name,
        image: credentials.photo,
        isAdmin: credentials.isAdmin,
        status: true,
        token,
      }


      ,
      {
        status: 200, statusText: 'OK',
        headers: { 'content-type': 'application/json' }
      }
    )
  } else {
    return Response.json(
      {
        message: 'Invalid Credentials',
        status: false
      },
      {
        status: 400, statusText: 'Bad Request',
        headers: { 'content-type': 'application/json' }
      }
    )
  }

  // const token = await encrypt(session)




}

