import { prisma } from '@/lib/prisma/db'



export async function POST(request: Request) {
  // let dataHeader: Prisma.HeaderCreateInput
  const body = await request.json();
  // console.log(body[0])
  const doc = body[0]

  const Entitas = body[0].entitas.map((item: any) => ({
    seri: item.seri,
    kode_entitas: item.kode_entitas,
    kode_jenis_identitas: item.kode_jenis_identitas,
    nomor_identitas: item.nomor_identitas,
    nama_entitas: item.nama_entitas,
    alamat_entitas: item.alamat_entitas,
    nib_entitas: item.nib_entitas,
    kode_jenis_api: item.kode_jenis_api,
    kode_status: item.kode_status,
    nomor_ijin_entitas: item.nomor_ijin_entitas,
    tanggal_ijin_entitas: item.tanggal_ijin_entitas,
    kode_negara: item.kode_negara,
    niper_entitas: item.niper_entitas,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }))

  try {
    await prisma.header.create({
      data: {
        id: doc.id,
        nomor_aju: doc.nomor_aju,
        kode_dokumen: doc.kode_dokumen,
        kode_kantor: doc.kode_kantor,
        kode_kantor_bongkar: doc.kode_kantor_bongkar,
        kode_kantor_periksa: doc.kode_kantor_periksa,
        kode_kantor_tujuan: doc.kode_kantor_tujuan,
        kode_kantor_ekspor: doc.kode_kantor_ekspor,
        kode_jenis_impor: doc.kode_jenis_impor,
        kode_jenis_ekspor: doc.kode_jenis_ekspor,
        kode_jenis_tpb: doc.kode_jenis_tpb,
        kode_jenis_plb: doc.kode_jenis_plb,
        kode_jenis_prosedur: doc.kode_jenis_prosedur,
        kode_tujuan_pemasukan: doc.kode_tujuan_pemasukan,
        kode_tujuan_pengiriman: doc.kode_tujuan_pengiriman,
        kode_tujuan_tpb: doc.kode_tujuan_tpb,
        kode_cara_dagang: doc.kode_cara_dagang,
        kode_cara_bayar: doc.kode_cara_bayar,
        kode_cara_bayar_lainnya: doc.kode_cara_bayar_lainnya,
        kode_gudang_asal: doc.kode_gudang_asal,
        kode_gudang_tujuan: doc.kode_gudang_tujuan,
        kode_jenis_kirim: doc.kode_jenis_kirim,
        kode_jenis_pengiriman: doc.kode_jenis_pengiriman,
        kode_kategori_ekspor: doc.kode_kategori_ekspor,
        kode_kategori_masuk_ftz: doc.kode_kategori_masuk_ftz,
        kode_kategori_keluar_ftz: doc.kode_kategori_keluar_ftz,
        kode_kategori_barang_ftz: doc.kode_kategori_barang_ftz,
        kode_lokasi: doc.kode_lokasi,
        kode_lokasi_bayar: doc.kode_lokasi_bayar,
        lokasi_asal: doc.lokasi_asal,
        lokasi_tujuan: doc.lokasi_tujuan,
        kode_daerah_asal: doc.kode_daerah_asal,
        kode_negara_tujuan: doc.kode_negara_tujuan,
        kode_tutup_pu: doc.kode_tutup_pu,
        nomor_bc11: doc.nomor_bc11,
        tanggal_bc11: doc.tanggal_bc11,
        nomor_pos: doc.nomor_pos,
        nomor_sub_pos: doc.nomor_sub_pos,
        kode_pelabuhan_bongkar: doc.kode_pelabuhan_bongkar,
        kode_pelabuhan_muat: doc.kode_pelabuhan_muat,
        kode_pelabuhan_muat_akhir: doc.kode_pelabuhan_muat_akhir,
        kode_pelabuhan_transit: doc.kode_pelabuhan_transit,
        kode_pelabuhan_tujuan: doc.kode_pelabuhan_tujuan,
        kode_pelabuhan_ekspor: doc.kode_pelabuhan_ekspor,
        kode_tps: doc.kode_tps,
        tanggal_berangkat: doc.tanggal_berangkat,
        tanggal_ekspor: doc.tanggal_ekspor,
        tanggal_masuk: doc.tanggal_masuk,
        tanggal_muat: doc.tanggal_muat,
        tanggal_tiba: doc.tanggal_tiba,
        tanggal_periksa: doc.tanggal_periksa,
        tempat_stuffing: doc.tempat_stuffing,
        tanggal_stuffing: doc.tanggal_stuffing,
        kode_tanda_pengaman: doc.kode_tanda_pengaman,
        jumlah_tanda_pengaman: doc.jumlah_tanda_pengaman,
        flag_curah: doc.flag_curah,
        flag_sda: doc.flag_sda,
        flag_vd: doc.flag_vd,
        flag_ap_bk: doc.flag_ap_bk,
        flag_migas: doc.flag_migas,
        kode_asuransi: doc.kode_asuransi,
        asuransi: doc.asuransi,
        nilai_barang: doc.nilai_barang,
        nilai_incoterm: doc.nilai_incoterm,
        nilai_maklon: doc.nilai_maklon,
        freight: doc.freight,
        fob: doc.fob,
        biaya_tambahan: doc.biaya_tambahan,
        biaya_pengurang: doc.biaya_pengurang,
        vd: doc.vd,
        cif: doc.cif,
        harga_penyerahan: doc.harga_penyerahan,
        ndpbm: doc.ndpbm,
        total_dana_sawit: doc.total_dana_sawit,
        dasar_pengenaan_pajak: doc.dasar_pengenaan_pajak,
        nilai_jasa: doc.nilai_jasa,
        uang_muka: Number(doc.uang_muka),
        bruto: Number(doc.bruto),
        netto: Number(doc.netto),
        volume: Number(doc.volume),
        kota_pernyataan: doc.kota_pernyataan,
        tanggal_pernyataan: doc.tanggal_pernyataan,
        nama_pernyataan: doc.nama_pernyataan,
        jabatan_pernyataan: doc.jabatan_pernyataan,
        kode_valuta: doc.kode_valuta,
        kode_incoterm: doc.kode_incoterm,
        kode_jasa_kena_pajak: doc.kode_jasa_kena_pajak,
        nomor_bukti_bayar: doc.nomor_bukti_bayar,
        tanggal_bukti_bayar: doc.tanggal_bukti_bayar,
        kode_jenis_nilai: doc.kode_jenis_nilai,
        nomor_daftar: doc.nomor_daftar,
        tanggal_daftar: doc.tanggal_daftar + "T00:00:00.000000Z",
        create_by: doc.create_by,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
        entitas:
        {
          createMany: {
            data: Entitas
          }
        }

      }
    })

    return Response.json({ message: "Success", status: true }, { status: 200 })
  } catch (error) {

    return Response.json({ message: error, status: false }, { status: 400 })
  }


}
