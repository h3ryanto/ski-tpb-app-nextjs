"use server";
import { prisma } from '@/lib/prisma/init';
import type { Header } from "@prisma/client";

export async function Validasi(header: Header | Header[]) {
    const headersArray = Array.isArray(header) ? header : [header];
    const response = await headersArray.map(async (item: any) => {
        const header = await prisma.header.findFirst({
            where: {
                nomor_aju: item['NOMOR AJU'],
            }
        });
        if (header) {
            return { message: 'Nomor Aju Sudah Ada', error: 'Nomor Aju Sudah Ada', status: 500 }


        } else {
            return { message: 'Nomor Aju Valid', status: 200 }
        }
    });
    return Promise.all(response)
}