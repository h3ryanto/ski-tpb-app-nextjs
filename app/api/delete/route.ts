import { prisma } from '@/lib/prisma/init'
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

                const deleteBarang = prisma.barang.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteDokumen = prisma.dokumen.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteKemasan = prisma.kemasan.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteKontainer = prisma.kontainer.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBahanBaku = prisma.bahan_Baku.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBahanBakuDokumen = prisma.bahan_Baku_Dokumen.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBahanBakuTarif = prisma.bahan_Baku_Tarif.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBankDevisa = prisma.bank_Devisa.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBarangDokumen = prisma.barang_Dokumen.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBarangEntitas = prisma.barang_Entitas.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBarangSpekKhusus = prisma.barang_Spek_Khusus.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBarangTarif = prisma.barang_Tarif.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteBarangVds = prisma.barang_Vds.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deleteJaminan = prisma.jaminan.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deletePengangkut = prisma.pengangkut.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })

                const deletePungutan = prisma.pungutan.deleteMany({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })



                const deleteHeader = prisma.header.delete({
                    where: {
                        nomor_aju: body.nomor_aju,
                    },
                })



                await prisma.$transaction([deleteEntitas, deleteBarang, deleteDokumen, deleteKemasan, deleteKontainer, deleteBahanBaku, deleteBahanBakuDokumen,
                    deleteBahanBakuTarif, deleteBarangSpekKhusus, deletePungutan, deletePengangkut, deleteBarangVds, deleteJaminan, deleteBarangTarif,
                    deleteBankDevisa, deleteBarangDokumen, deleteBarangEntitas, deleteHeader])
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