import { prisma } from '@/lib/prisma/db'
export async function DELETE(request: Request) {
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
        return Response.json({ message: body, status: true }, { status: 200 })
    } catch (err) {
        return Response.json({ message: err, status: false }, { status: 400 })
    }
}