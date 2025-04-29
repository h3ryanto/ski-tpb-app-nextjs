'use server'

import { decrypt } from "@/lib/auth/session"
import { NextRequest } from "next/server"
import { forgotPassword } from '@/lib/database/neon_postgresSql/authentication';
import { resetPassword } from "@/lib/database/neon_postgresSql/user";

export async function POST(request: NextRequest) {
    const token = await request.headers.get('Authorization')?.split(' ')[1];
    const body = await request.json()
    const password = body.password as string | null
    // console.log("token", password)
    if (token) {
        const secretKey = process.env.SESSION_SECRET
        const jwtVerify = await decrypt(token, `${secretKey}`)
        if (jwtVerify && typeof jwtVerify.email === 'string') {
            const getUser = await forgotPassword(jwtVerify.email);

            if (getUser.id !== undefined) {
                if (password) {
                    const result = await resetPassword(password, Number(getUser.id)) as { status: boolean };
                    if (result.status) {
                        return Response.json(
                            {
                                message: "success"
                            },
                            {
                                status: 200, statusText: 'OK',
                                headers: { 'content-type': 'application/json' }
                            }
                        )
                    } else {
                        return Response.json({ message: 'Failed to reset password.', status: false }, { status: 400 });
                    }

                } else {
                    return Response.json({ message: 'Password is required.', status: false }, { status: 400 });
                }

            } else {
                return Response.json({ message: 'User ID is undefined.', status: false }, { status: 400 });
            }
        } else {
            return Response.json({ message: 'Invalid token data.', status: false }, { status: 403 });
        }


    } else {
        return Response.json({ message: 'Akses ditolak.', status: false }, { status: 401 })
    }





}