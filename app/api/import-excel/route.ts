import { NextRequest, NextResponse } from 'next/server';
import { read, utils } from 'xlsx';
// import { uploadToCloudinary } from '@/lib/cloudinary/uploadHelper';
// import fs from "node:fs/promises";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Use the ArrayBuffer from the uploaded file directly
        const wb = read(buffer); // parse the array buffer
        // Header
        const wsHeader = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const Header = utils.sheet_to_json(wsHeader); // generate objects
        // Entitas
        const wsEntitas = wb.Sheets[wb.SheetNames[1]]; // get the first worksheet
        const Entitas = utils.sheet_to_json(wsEntitas); // generate objects
        // Dokumen
        const wsDokumen = wb.Sheets[wb.SheetNames[2]]; // get the first worksheet
        const Dokumen = utils.sheet_to_json(wsDokumen); // generate objects
        // Pengangkut
        const wsPengangkut = wb.Sheets[wb.SheetNames[3]]; // get the first worksheet
        const Pengangkut = utils.sheet_to_json(wsPengangkut); // generate objects
        // Kemasan
        const wsKemasan = wb.Sheets[wb.SheetNames[4]]; // get the first worksheet
        const Kemasan = utils.sheet_to_json(wsKemasan); // generate objects
        // Kontainer
        const wsKontainer = wb.Sheets[wb.SheetNames[5]]; // get the first worksheet
        const Kontainer = utils.sheet_to_json(wsKontainer); // generate objects
        // Barang
        const wsBarang = wb.Sheets[wb.SheetNames[6]]; // get the first worksheet
        const Barang = utils.sheet_to_json(wsBarang); // generate objects
        // BarangTarif
        const wsBarangTarif = wb.Sheets[wb.SheetNames[7]]; // get the first worksheet
        const BarangTarif = utils.sheet_to_json(wsBarangTarif); // generate objects
        // BarangDokumen
        const wsBarangDokumen = wb.Sheets[wb.SheetNames[8]]; // get the first worksheet
        const BarangDokumen = utils.sheet_to_json(wsBarangDokumen); // generate objects
        // BarangEntitas
        const wsBarangEntitas = wb.Sheets[wb.SheetNames[9]]; // get the first worksheet
        const BarangEntitas = utils.sheet_to_json(wsBarangEntitas); // generate objects
        // BarangKhusus
        const wsBarangKhusus = wb.Sheets[wb.SheetNames[10]]; // get the first worksheet
        const BarangKhusus = utils.sheet_to_json(wsBarangKhusus); // generate objects
        // BarangVDS
        const wsBarangVDS = wb.Sheets[wb.SheetNames[11]]; // get the first worksheet
        const BarangVDS = utils.sheet_to_json(wsBarangVDS); // generate objects
        // BahanBaku
        const wsBahanBaku = wb.Sheets[wb.SheetNames[12]]; // get the first worksheet
        const BahanBaku = utils.sheet_to_json(wsBahanBaku); // generate objects
        // BahanBakuTarif
        const wsBahanBakuTarif = wb.Sheets[wb.SheetNames[13]]; // get the first worksheet
        const BahanBakuTarif = utils.sheet_to_json(wsBahanBakuTarif); // generate objects
        // BahanBakuDokumen
        const wsBahanBakuDokumen = wb.Sheets[wb.SheetNames[14]]; // get the first worksheet
        const BahanBakuDokumen = utils.sheet_to_json(wsBahanBakuDokumen); // generate objects
        // Pungutan
        const wsPungutan = wb.Sheets[wb.SheetNames[15]]; // get the first worksheet
        const Pungutan = utils.sheet_to_json(wsPungutan); // generate objects
        // Jaminan
        const wsJaminan = wb.Sheets[wb.SheetNames[16]]; // get the first worksheet
        const Jaminan = utils.sheet_to_json(wsJaminan); // generate objects
        // BahanBakuDevisa
        const wsBahanBakuDevisa = wb.Sheets[wb.SheetNames[17]]; // get the first worksheet
        const BahanBakuDevisa = utils.sheet_to_json(wsBahanBakuDevisa); // generate objects
        if (Header) {
            return NextResponse.json({
                message: 'Upload successful',
                data: {
                    Header,
                    Barang,
                    Entitas,
                    Dokumen,
                    Pengangkut,
                    Kemasan,
                    Kontainer,
                    BarangTarif,
                    BarangDokumen,
                    BarangEntitas,
                    BarangKhusus,
                    BarangVDS,
                    BahanBaku,
                    BahanBakuTarif,
                    BahanBakuDokumen,
                    Pungutan,
                    Jaminan,
                    BahanBakuDevisa
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
        }
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}