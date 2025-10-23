"use server";
import { prisma } from '@/lib/prisma/init';
import type { Header } from "@prisma/client";

export async function Validasi(header: Header | Header[]) {
    const headersArray = header instanceof Array ? header : [header];
    //
    // console.log(headersArray, 'headersArray di validasi');
    const response = await headersArray.map(async (item: any) => {
        const header = await prisma.header.findFirst({
            where: {
                nomor_aju: item['NOMOR AJU'],
            }
        });
        if (header) {
            return { message: `Aju ${item['NOMOR AJU']} Sudah Ada`, error: 'Duplicate Data', status: 500 }


        } else {
            return { message: `Nomor Aju ${item['NOMOR AJU']} Valid`, status: 200 }
        }
    });
    return Promise.all(response)
}