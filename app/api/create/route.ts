import { prisma } from '@/lib/prisma/init'
import { decrypt } from "@/lib/auth/session"
// import { createEntitas, createHeader } from '@/database/prisma/create';


export async function POST(request: Request) {
  const token = await request.headers.get('Authorization')?.split(' ')[1];
  if (token) {
    const secretKey = process.env.SESSION_SECRET
    const jwtVerify = await decrypt(token, `${secretKey}`)
    // console.log(jwtVerify)
    if (jwtVerify) {


      const body = await request.json();
      const doc = body[0]
      // console.log(doc.bahan_baku)


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

      const Barang = body[0].barang.map((item: any) => ({
        seri_barang: item.seri_barang,
        hs: item.hs,
        kode_barang: item.kode_barang,
        uraian: item.uraian,
        merek: item.merek,
        tipe: item.tipe,
        ukuran: item.ukuran,
        spesifikasi_lain: item.spesifikasi_lain,
        kode_satuan: item.kode_satuan,
        jumlah_satuan: parseFloat(item.jumlah_satuan),
        kode_kemasan: item.kode_kemasan,
        jumlah_kemasan: item.jumlah_kemasan,
        kode_dokumen_asal: item.kode_dokumen_asal,
        kode_kantor_asal: item.kode_kantor_asal,
        nomor_daftar_asal: item.nomor_daftar_asal,
        tanggal_daftar_asal: item.tanggal_daftar_asal,
        nomor_aju_asal: item.nomor_aju_asal,
        seri_barang_asal: item.seri_barang_asal,
        netto: item.netto,
        bruto: parseFloat(item.bruto),
        volume: item.volume,
        saldo_awal: item.saldo_awal,
        saldo_akhir: item.saldo_akhir,
        jumlah_realisasi: item.jumlah_realisasi,
        cif: item.cif,
        cif_rupiah: item.cif_rupiah,
        ndpbm: item.ndpbm,
        fob: item.fob,
        asuransi: item.asuransi,
        freight: item.freight,
        nilai_tambah: item.nilai_tambah,
        diskon: item.diskon,
        harga_penyerahan: item.harga_penyerahan,
        harga_perolehan: item.harga_perolehan,
        harga_satuan: item.harga_satuan,
        harga_ekspor: item.harga_ekspor,
        harga_patokan: item.harga_patokan,
        nilai_barang: item.nilai_barang,
        nilai_jasa: item.nilai_jasa,
        nilai_dana_sawit: item.nilai_dana_sawit,
        nilai_devisa: item.nilai_devisa,
        persentase_impor: item.persentase_impor,
        kode_asal_barang: item.kode_asal_barang,
        kode_daerah_asal: item.kode_daerah_asal,
        kode_guna_barang: item.kode_guna_barang,
        kode_jenis_nilai: item.kode_jenis_nilai,
        jatuh_tempo_royalti: item.jatuh_tempo_royalti,
        kode_kategori_barang: item.kode_kategori_barang,
        kode_kondisi_barang: item.kode_kondisi_barang,
        kode_negara_asal: item.kode_negara_asal,
        kode_perhitungan: item.kode_perhitungan,
        pernyataan_lartas: item.pernyataan_lartas,
        flag_4_tahun: item.flag_4_tahun,
        seri_izin: item.seri_izin,
        tahun_pembuatan: item.tahun_pembuatan,
        kapasitas_silinder: item.kapasitas_silinder,
        kode_bkc: item.kode_bkc,
        kode_komoditi_bkc: item.kode_komoditi_bkc,
        kode_sub_komoditi_bkc: item.kode_sub_komoditi_bkc,
        flag_tis: item.flag_tis,
        isi_per_kemasan: item.isi_per_kemasan,
        umlah_dilekatkan: item.umlah_dilekatkan,
        jumlah_pita_cukai: item.jumlah_pita_cukai,
        hje_cukai: item.hje_cukai,
        tarif_cukai: item.tarif_cukai,
        stok: parseFloat(item.stok),
        created_at: item.created_at,
        updated_at: item.updated_at,

      }))
      // console.log(body[0].dokumen)
      const Dokumen = body[0].dokumen.map((item: any) => ({
        seri: item.seri,
        kode_dokumen: item.kode_dokumen,
        nomor_dokumen: item.nomor_dokumen,
        tanggal_dokumen: item.tanggal_dokumen + "T00:00:00.000000Z",
        kode_fasilitas: item.kode_fasilitas,
        kode_ijin: item.kode_ijin,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))

      const Kemasan = body[0].kemasan.map((item: any) => ({
        seri: item.seri,
        kode_kemasan: item.kode_kemasan,
        jumlah_kemasan: item.jumlah_kemasan,
        merek: item.merek,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))

      const BahanBakuTarif = body[0].bahan_baku_tarif && body[0].bahan_baku_tarif.map((item: any) => ({
        seri_barang: item.seri_barang,
        seri_bahan_baku: item.seri_bahan_baku,
        kode_asal_bahan_baku: item.kode_asal_bahan_baku,
        kode_pungutan: item.kode_pungutan,
        kode_tarif: item.kode_tarif,
        tarif: item.tarif,
        kode_fasilitas: item.kode_fasilitas,
        tarif_fasilitas: item.tarif_fasilitas,
        nilai_bayar: item.nilai_bayar,
        nilai_fasilitas: item.nilai_fasilitas,
        nilai_sudah_dilunasi: item.nilai_sudah_dilunasi,
        kode_satuan: item.kode_satuan,
        jumlah_satuan: item.jumlah_satuan,
        flag_bmt_sementara: item.flag_bmt_sementara,
        kode_komoditi_cukai: item.kode_komoditi_cukai,
        kode_sub_komoditi_cukai: item.kode_sub_komoditi_cukai,
        flag_tis: item.flag_tis,
        flag_pelekatan: item.flag_pelekatan,
        kode_kemasan: item.kode_kemasan,
        jumlah_kemasan: item.jumlah_kemasan,
        created_at: item.created_at,
        updated_at: item.updated_at,

      })) || []

      const BahanBakuDokumen = body[0].bahan_baku_dokumen && body[0].bahan_baku_dokumen.map((item: any) => ({
        seri_barang: item.seri_barang,
        seri_bahan_baku: item.seri_bahan_baku,
        kode_asal_bahan_baku: item.kode_asal_bahan_baku,
        seri_dokumen: item.seri_dokumen,
        seri_izin: item.seri_izin,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []

      // console.log(body[0].bahan_baku)
      const BahanBaku = body[0].bahan_baku && body[0].bahan_baku.map((item: any) => ({
        seri_barang: item.seri_barang,
        seri_bahan_baku: item.seri_bahan_baku,
        kode_asal_bahan_baku: item.kode_asal_bahan_baku,
        hs: item.hs,
        kode_barang: item.kode_barang,
        uraian: item.uraian,
        merek: item.merek,
        tipe: item.tipe,
        ukuran: item.ukuran,
        spesifikasi_lain: item.spesifikasi_lain,
        kode_satuan: item.kode_satuan,
        jumlah_satuan: item.jumlah_satuan,
        kode_kemasan: item.kode_kemasan,
        jumlah_kemasan: item.jumlah_kemasan,
        kode_dokumen_asal: item.kode_dokumen_asal,
        kode_kantor_asal: item.kode_kantor_asal,
        nomor_daftar_asal: item.nomor_daftar_asal,
        tanggal_daftar_asal: item.tanggal_daftar_asal + "T00:00:00.000000Z",
        nomor_aju_asal: item.nomor_aju_asal,
        seri_barang_asal: item.seri_barang_asal,
        netto: item.netto,
        bruto: item.bruto,
        volume: item.volume,
        cif: item.cif,
        cif_rupiah: item.cif_rupiah,
        ndpbm: item.ndpbm,
        harga_penyerahan: item.harga_penyerahan,
        harga_perolehan: item.harga_perolehan,
        nilai_jasa: item.nilai_jasa,
        seri_izin: item.seri_izin,
        kode_bkc: item.kode_bkc,
        kode_komoditi_bkc: item.kode_komoditi_bkc,
        kode_sub_komoditi_bkc: item.kode_sub_komoditi_bkc,
        flag_tis: item.flag_tis,
        isi_per_kemasan: item.isi_per_kemasan,
        jumlah_dilekatkan: item.jumlah_dilekatkan,
        jumlah_pita_cukai: item.jumlah_pita_cukai,
        hje_cukai: item.hje_cukai,
        tarif_cukai: item.tarif_cukai,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []


      const Kontainer = body[0].kontainer.map((item: any) => ({
        seri: item.seri,
        nomor_kontiner: item.nomor_kontiner,
        kode_ukuran_kontainer: item.kode_ukuran_kontainer,
        kode_jenis_kontainer: item.kode_jenis_kontainer,
        kode_tipe_kontainer: item.kode_tipe_kontainer,
        created_at: item.created_at,
        updated_at: item.updated_at,

      }))

      const BankDevisa = body[0].bank_devisa && body[0].bank_devisa.map((item: any) => ({
        seri: item.seri,
        kode: item.kode,
        nama: item.nama,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []


      const BarangDokumen = body[0].barang_dokumen && body[0].barang_dokumen.map((item: any) => ({
        seri_barang: item.seri_barang,
        seri_dokumen: item.seri_dokumen,
        seri_izin: item.seri_izin,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []


      const BarangEntitas = body[0].barang_entitas && body[0].barang_entitas.map((item: any) => ({
        seri_barang: item.seri_barang,
        seri_dokumen: item.seri_dokumen,
        seri_izin: item.seri_izin,
        created_at: item.created_at,
        updated_a: item.updated_at,

      })) || []


      const BarangSpekKhusus = body[0].barang_spek_khusus && body[0].barang_spek_khusus.map((item: any) => ({
        seri_barang: item.seri_barang,
        kode: item.kode,
        uraian: item.uraian,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []

      const BarangTarif = body[0].barang_tarif && body[0].barang_tarif.map((item: any) => ({
        seri_barang: item.seri_barang,
        kode_pungutan: item.kode_pungutan,
        kode_tarif: item.kode_tarif,
        tarif: item.tarif,
        kode_fasilitas: item.kode_fasilitas,
        tarif_fasilitas: item.tarif_fasilitas,
        nilai_bayar: item.nilai_bayar,
        nilai_fasilitas: item.nilai_fasilitas,
        nilai_sudah_dilunasi: item.nilai_sudah_dilunasi,
        kode_satuan: item.kode_satuan,
        jumlah_satuan: item.jumlah_satuan,
        flag_bmt_sementara: item.flag_bmt_sementara,
        kode_komoditi_cukai: item.kode_komoditi_cukai,
        kode_sub_komoditi_cukai: item.kode_sub_komoditi_cukai,
        flag_tis: item.flag_tis,
        flag_pelekatan: item.flag_pelekatan,
        kode_kemasan: item.kode_kemasan,
        jumlah_kemasan: item.jumlah_kemasan,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []

      const BarangVd = body[0].barang_vds && body[0].barang_vds.map((item: any) => ({
        seri_barang: item.seri_barang,
        kode_vd: item.kode_vd,
        nilai_barang: item.nilai_barang,
        biaya_tambahan: item.biaya_tambahan,
        biaya_pengurang: item.biaya_pengurang,
        jatuh_tempo: item.jatuh_tempo,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []


      // const Jaminan = body[0].jaminan && body[0].jaminan.map((item: any) => ({
      //   id: item.id,
      //   header: item.header,
      //   nomor_aju: item.nomor_aju,
      //   kode_fasilitas_tarif: item.kode_fasilitas_tarif,
      //   kode_jenis_pungutan: item.kode_jenis_pungutan,
      //   nilai_pungutan: item.nilai_pungutan,
      //   created_at: item.created_at,
      //   updated_at: item.updated_at,
      // })) || []

      const Pengangkut = body[0].pengangkut && body[0].pengangkut.map((item: any) => ({
        seri: item.seri,
        kode_cara_angkut: item.kode_cara_angkut,
        nama_pengangkut: item.nama_pengangkut,
        nomor_pengangkut: item.nomor_pengangkut,
        kode_bendera: item.kode_bendera,
        call_sign: item.call_sign,
        flag_angkut_plb: item.flag_angkut_plb,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []

      const Pungutan = body[0].pungutan && body[0].pungutan.map((item: any) => ({
        kode_fasilitas_tarif: item.kode_fasilitas_tarif,
        kode_jenis_pungutan: item.kode_jenis_pungutan,
        nilai_pungutan: item.nilai_pungutan,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })) || []




      try {

        // const header = await createHeader(doc)
        // console.log(header);

        // const entitas = await createEntitas(doc.entitas)
        // console.log(entitas);
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
            tanggal_bc11: doc.tanggal_bc11 + "T00:00:00.000000Z",
            nomor_pos: doc.nomor_pos,
            nomor_sub_pos: doc.nomor_sub_pos,
            kode_pelabuhan_bongkar: doc.kode_pelabuhan_bongkar,
            kode_pelabuhan_muat: doc.kode_pelabuhan_muat,
            kode_pelabuhan_muat_akhir: doc.kode_pelabuhan_muat_akhir,
            kode_pelabuhan_transit: doc.kode_pelabuhan_transit,
            kode_pelabuhan_tujuan: doc.kode_pelabuhan_tujuan,
            kode_pelabuhan_ekspor: doc.kode_pelabuhan_ekspor,
            kode_tps: doc.kode_tps,
            tanggal_berangkat: doc.tanggal_berangkat + "T00:00:00.000000Z",
            tanggal_ekspor: doc.tanggal_ekspor + "T00:00:00.000000Z",
            tanggal_masuk: doc.tanggal_masuk + "T00:00:00.000000Z",
            tanggal_muat: doc.tanggal_muat + "T00:00:00.000000Z",
            tanggal_tiba: doc.tanggal_tiba + "T00:00:00.000000Z",
            tanggal_periksa: doc.tanggal_periksa + "T00:00:00.000000Z",
            tempat_stuffing: doc.tempat_stuffing + "T00:00:00.000000Z",
            tanggal_stuffing: doc.tanggal_stuffing + "T00:00:00.000000Z",
            kode_tanda_pengaman: doc.kode_tanda_pengaman,
            jumlah_tanda_pengaman: Number(doc.jumlah_tanda_pengaman),
            flag_curah: doc.flag_curah,
            flag_sda: doc.flag_sda,
            flag_vd: doc.flag_vd,
            flag_ap_bk: doc.flag_ap_bk,
            flag_migas: doc.flag_migas,
            kode_asuransi: doc.kode_asuransi,
            asuransi: parseFloat(doc.asuransi),
            nilai_barang: parseFloat(doc.nilai_barang),
            nilai_incoterm: parseFloat(doc.nilai_incoterm),
            nilai_maklon: parseFloat(doc.nilai_maklon),
            freight: parseFloat(doc.freight),
            fob: parseFloat(doc.fob),
            biaya_tambahan: parseFloat(doc.biaya_tambahan),
            biaya_pengurang: parseFloat(doc.biaya_pengurang),
            vd: parseFloat(doc.vd),
            cif: parseFloat(doc.cif),
            harga_penyerahan: parseFloat(doc.harga_penyerahan),
            ndpbm: parseFloat(doc.ndpbm),
            total_dana_sawit: parseFloat(doc.total_dana_sawit),
            dasar_pengenaan_pajak: parseFloat(doc.dasar_pengenaan_pajak),
            nilai_jasa: parseFloat(doc.nilai_jasa),
            uang_muka: parseFloat(doc.uang_muka),
            bruto: parseFloat(doc.bruto),
            netto: parseFloat(doc.netto),
            volume: parseFloat(doc.volume),
            kota_pernyataan: doc.kota_pernyataan,
            tanggal_pernyataan: doc.tanggal_pernyataan + "T00:00:00.000000Z",
            nama_pernyataan: doc.nama_pernyataan,
            jabatan_pernyataan: doc.jabatan_pernyataan,
            kode_valuta: doc.kode_valuta,
            kode_incoterm: doc.kode_incoterm,
            kode_jasa_kena_pajak: doc.kode_jasa_kena_pajak,
            nomor_bukti_bayar: doc.nomor_bukti_bayar,
            tanggal_bukti_bayar: doc.tanggal_bukti_bayar + "T00:00:00.000000Z",
            kode_jenis_nilai: doc.kode_jenis_nilai,
            nomor_daftar: doc.nomor_daftar,
            tanggal_daftar: doc.tanggal_daftar + "T00:00:00.000000Z",
            kode_kantor_muat: "",
            kode_asal_barang_ftz: "",
            kode_tujuan_pengeluaran: "",
            ppn_pajak: 0,
            ppnbm_pajak: 0,
            tarif_ppn_pajak: 0,
            tarif_ppnbm_pajak: 0,
            barang_tidak_berwujud: "",
            kode_jenis_pengeluaran: "",
            barang_kiriman: "",
            kode_jenis_pengangkutan: "",
            create_by: doc.create_by,
            created_at: doc.created_at,
            updated_at: doc.updated_at,
            entitas:
            {
              createMany: {
                data: Entitas
              }
            },
            barang:
            {
              createMany: {
                data: Barang
              }
            },
            dokumen:
            {
              createMany: {
                data: Dokumen
              }
            },
            kemasan:
            {
              createMany: {
                data: Kemasan
              }
            },
            kontainer:
            {
              createMany: {
                data: Kontainer
              }
            },
            bahan_baku:
            {
              createMany: {
                data: BahanBaku
              }
            },
            bahan_baku_dokumen:
            {
              createMany: {
                data: BahanBakuDokumen
              }
            },
            bahan_baku_tarif:
            {
              createMany: {
                data: BahanBakuTarif
              }
            },
            bank_devisa:
            {
              createMany: {
                data: BankDevisa
              }
            },
            barang_dokumen:
            {
              createMany: {
                data: BarangDokumen
              }
            },
            barang_entitas:
            {
              createMany: {
                data: BarangEntitas
              }
            },
            barang_spek_khusus:
            {
              createMany: {
                data: BarangSpekKhusus
              }
            },
            barang_tarif:
            {
              createMany: {
                data: BarangTarif
              }
            },
            barang_vd:
            {
              createMany: {
                data: BarangVd
              }
            },
            // jaminan:
            // {
            //   createMany: {
            //     data: Jaminan
            //   }
            // },
            pengangkut:
            {
              createMany: {
                data: Pengangkut
              }
            },
            pungutan:
            {
              createMany: {
                data: Pungutan
              }
            }

          }
        })
        // console.log(result);
        return Response.json({ message: "Success", status: true }, { status: 200 })
      } catch (error) {

        return Response.json({ error, status: false }, { status: 400 })
      }
    } else {
      return Response.json({ message: 'Token Tidak Valid', status: false }, { status: 403 })
    }
  } else {
    return Response.json({ message: 'Silahkan Login Terlebih Dahulu', status: false }, { status: 401 })
  }

}
