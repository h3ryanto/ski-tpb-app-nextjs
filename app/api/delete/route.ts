import { prisma } from '@/lib/prisma/db'
import { decrypt } from "@/lib/auth/session"

export async function DELETE(request: Request) {
    const token = await request.headers.get('Authorization')?.split(' ')[1];
    // console.log(token)
    if (token) {
        const secretKey = process.env.SESSION_SECRET
        const jwtVerify = await decrypt(token, `${secretKey}`)
        // console.log(jwtVerify)
        if (jwtVerify) {
            const body = await request.json();
            // console.log(body)
            try {
                const deleteEntitas = prisma.entitas.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteHeader = prisma.header.delete({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                await prisma.$transaction([deleteEntitas, deleteHeader])
                return Response.json({ message: `Aju ${body.aju} berhasil di haspus`, status: true }, { status: 200 })
            } catch (err: any) {
                return Response.json({ message: err.meta.cause, status: false }, { status: 400 })
            }
        } else {
            return Response.json({ message: 'Token Tidak Valid', status: false }, { status: 403 })
        }
    } else {
        return Response.json({ message: 'Silahkan Login Terlebih Dahulu', status: false }, { status: 401 })
    }
}