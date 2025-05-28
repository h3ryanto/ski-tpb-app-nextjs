"use server";
import { prisma } from '@/lib/prisma/init';
import type { Header } from "@prisma/client";

export async function CreateEntitas(header: Header | Header[]) {

    const headersArray = Array.isArray(header) ? header : [header];
    const result = headersArray.map(async (item: any) => {
        try {
            await prisma.entitas.create({
                data: {
                    nomor_aju: item['NOMOR AJU']?.toString() || "",
                    seri: item['SERI']?.toString() || "",
                    kode_entitas: item['KODE ENTITAS']?.toString() || "",
                    kode_jenis_identitas: item['KODE JENIS IDENTITAS']?.toString() || "",
                    nomor_identitas: item['NOMOR IDENTITAS']?.toString() || "",
                    nama_entitas: item['NAMA ENTITAS']?.toString() || "",
                    alamat_entitas: item['ALAMAT ENTITAS']?.toString() || "",
                    nib_entitas: item['NIB ENTITAS']?.toString() || "",
                    kode_jenis_api: item['KODE JENIS API']?.toString() || "",
                    kode_status: item['KODE STATUS']?.toString() || "",
                    nomor_ijin_entitas: item['NOMOR IJIN ENTITAS']?.toString() || "",
                    tanggal_ijin_entitas: item['TANGGAL IJIN ENTITAS']?.toString() || "",
                    kode_negara: item['KODE NEGARA']?.toString() || "",
                    niper_entitas: item['NIPER ENTITAS']?.toString() || "",
                    kode_kategori_konsolidator: item['KODE KATEGORI KONSOLIDATOR']?.toString() || "",
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                }
            })
            return Response.json({ message: "Success", status: true }, { status: 200 })
        } catch (error) {
            return error
        }
    });
    return Promise.all(result);
}