"use server"

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey)

}

export async function decrypt(token: string | undefined = '', secret: string | undefined) {
  const verifyScret = new TextEncoder().encode(secret)
  if (token) {
    try {
      const { payload } = await jwtVerify(token, verifyScret, {
        algorithms: ['HS256'],
      })
      return payload
    } catch (error) {
      console.error(error)
      console.log('Failed to verify session')
    }
  }
}


export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookieStore = (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  })
}


export async function deleteSession() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookieStore = (await cookies()).delete('session')

}



