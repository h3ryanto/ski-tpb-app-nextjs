const FormatExcelDokumenTpb = (input: any[]) => {
    const header: any[] = []
    let entitas: any[] = []
    let dokumen: any[] = []
    let pengangkut: any[] = []
    let kemasan: any[] = []
    let komponen_biaya: any[] = []
    let barang: any[] = []
    let kontainer: any[] = []
    let barang_tarif: any[] = []
    let barang_dokumen: any[] = []
    let barang_entitas: any[] = []
    let barang_khusus: any[] = []
    let barang_vd: any[] = []
    let bahan_baku: any[] = []
    let bahan_tarif: any[] = []
    let bahan_baku_dokumen: any[] = []
    let pungutan: any[] = []
    let jaminan: any[] = []
    let bank_devisa: any[] = []
    let versi: any[] = []
    let response: any[] = []
    console.log(input)
    input.forEach((element: any) => {
        header.push({
            'NOMOR AJU': element.nomor_aju,
            'KODE DOKUMEN': element.kode_dokumen,
            'KODE KANTOR': element.kode_kantor,
            'KODE KANTOR BONGKAR': element.kode_kantor_bongkar,
            'KODE KANTOR PERIKSA': element.kode_kantor_periksa,
            'KODE KANTOR TUJUAN': element.kode_kantor_tujuan,
            'KODE KANTOR EKSPOR': element.kode_kantor_ekspor,
            'KODE JENIS IMPOR': element.kode_jenis_impor,
            'KODE JENIS EKSPOR': element.kode_jenis_ekspor,
            'KODE JENIS TPB': element.kode_jenis_tpb,
            'KODE JENIS PLB': element.kode_jenis_plb,
            'KODE JENIS PROSEDUR': element.kode_jenis_prosedur,
            'KODE TUJUAN PEMASUKAN': element.kode_tujuan_pemasukan,
            'KODE TUJUAN PENGIRIMAN': element.kode_tujuan_pengiriman,
            'KODE TUJUAN TPB': element.kode_tujuan_tpb,
            'KODE CARA DAGANG': element.kode_cara_dagang,
            'KODE CARA BAYAR': element.kode_cara_bayar,
            'KODE CARA BAYAR LAINNYA': element.kode_cara_bayar_lainnya,
            'KODE GUDANG ASAL': element.kode_gudang_asal,
            'KODE GUDANG TUJUAN': element.kode_gudang_tujuan,
            'KODE JENIS KIRIM': element.kode_jenis_kirim,
            'KODE JENIS PENGIRIMAN': element.kode_jenis_pengiriman,
            'KODE KATEGORI EKSPOR': element.kode_kategori_ekspor,
            'KODE KATEGORI MASUK FTZ': element.kode_kategori_masuk_ftz,
            'KODE KATEGORI KELUAR FTZ': element.kode_kategori_keluar_ftz,
            'KODE KATEGORI BARANG FTZ': element.kode_kategori_barang_ftz,
            'KODE LOKASI': element.kode_lokasi,
            'KODE LOKASI BAYAR': element.kode_lokasi_bayar,
            'LOKASI ASAL': element.lokasi_asal,
            'LOKASI TUJUAN': element.lokasi_tujuan,
            'KODE DAERAH ASAL': element.kode_daerah_asal,
            'KODE_GUDANG_ASAL': element.kode_gudang_asal,
            'KODE_GUDANG_TUJUAN': element.kode_gudang_tujuan,
            'KODE NEGARA TUJUAN': element.kode_negara_tujuan,
            'KODE TUTUP PU': element.kode_tutup_pu,
            'NOMOR BC11': element.nomor_bc11,
            'TANGGAL BC11': element.tanggal_bc11,
            'NOMOR POS': element.nomor_pos,
            'NOMOR SUB POS': element.nomor_sub_pos,
            'KODE PELABUHAN BONGKAR': element.kode_pelabuhan_bongkar,
            'KODE PELABUHAN MUAT': element.kode_pelabuhan_muat,
            'KODE PELABUHAN MUAT AKHIR': element.kode_pelabuhan_muat_akhir,
            'KODE PELABUHAN TRANSIT': element.kode_pelabuhan_transit,
            'KODE PELABUHAN TUJUAN': element.kode_pelabuhan_tujuan,
            'KODE PELABUHAN EKSPOR': element.kode_pelabuhan_ekspor,
            'KODE TPS': element.kode_tps,
            'TANGGAL BERANGKAT': element.tanggal_berangkat,
            'TANGGAL EKSPOR': element.tanggal_ekspor,
            'TANGGAL MASUK': element.tanggal_masuk,
            'TANGGAL MUAT': element.tanggal_muat,
            'TANGGAL TIBA': element.tanggal_tiba,
            'TANGGAL PERIKSA': element.tanggal_periksa,
            'TEMPAT STUFFING': element.tempat_stuffing,
            'TANGGAL STUFFING': element.tanggal_stuffing,
            'KODE TANDA PENGAMAN': element.kode_tanda_pengaman,
            'JUMLAH TANDA PENGAMAN': element.jumlah_tanda_pengaman,
            'FLAG CURAH': element.flag_curah,
            'FLAG SDA': element.flag_sda,
            'FLAG VD': element.flag_vd,
            'FLAG AP BK': element.flag_ap_bk,
            'FLAG MIGAS': element.flag_migas,
            'KODE ASURANSI': element.kode_asuransi,
            'ASURANSI': element.asuransi,
            'NILAI BARANG': element.nilai_barang,
            'NILAI INCOTERM': element.nilai_incoterm,
            'NILAI MAKLON': element.nilai_maklon,
            'ASURANSI_': element.asuransi,
            'FREIGHT': element.freight,
            'FOB': element.fob,
            'BIAYA TAMBAHAN': element.biaya_tambahan,
            'BIAYA PENGURANG': element.biaya_pengurang,
            'VD': element.vd,
            'CIF': element.cif,
            'HARGA_PENYERAHAN': element.harga_penyerahan,
            'NDPBM': element.ndpbm,
            'TOTAL DANA SAWIT': element.total_dana_sawit,
            'DASAR PENGENAAN PAJAK': element.dasar_pengenaan_pajak,
            'NILAI JASA': element.nilai_jasa,
            'UANG MUKA': element.uang_muka,
            'BRUTO': element.bruto,
            'NETTO': element.netto,
            'VOLUME': element.volume,
            'KOTA PERNYATAAN': element.kota_pernyataan,
            'TANGGAL PERNYATAAN': element.tanggal_pernyataan,
            'NAMA PERNYATAAN': element.nama_pernyataan,
            'JABATAN PERNYATAAN': element.jabatan_pernyataan,
            'KODE VALUTA': element.kode_valuta,
            'KODE INCOTERM': element.kode_incoterm,
            'KODE JASA KENA PAJAK': element.kode_jasa_kena_pajak,
            'NOMOR BUKTI BAYAR': element.nomor_bukti_bayar,
            'TANGGAL BUKTI BAYAR': element.tanggal_bukti_bayar,
            'KODE JENIS NILAI': element.kode_jenis_nilai,
            'KODE KANTOR MUAT': element.kode_kantor_muat,
            'NOMOR DAFTAR': element.nomor_daftar,
            'TANGGAL DAFTAR': element.tanggal_daftar,
            'KODE ASAL BARANG FTZ': element.kode_asal_barang_ftz,
            'KODE TUJUAN PENGELUARAN': element.kode_tujuan_pengeluaran,
            'PPN PAJAK': element.ppn_pajak,
            'PPNBM PAJAK': element.ppnbm_pajak,
            'TARIF PPN PAJAK': element.tarif_ppn_pajak,
            'TARIF PPNBM PAJAK': element.tarif_ppnbm_pajak,
            'BARANG TIDAK BERWUJUD': element.barang_tidak_berwujud,
            'KODE JENIS PENGELUARAN': element.kode_jenis_pengeluaran,
            'BARANG KIRIMAN': element.barang_kiriman,
            'FLAG KONSOL': element.flag_konsol,
            'KODE JENIS PENGANGKUTAN': element.kode_jenis_pengangkutan,
            'FLAG PROPORSIONAL NETTO': element.flag_proporsional_netto,
        })


        if ((Array.isArray(element.entitas)) && element.entitas.length > 0) {
            entitas = entitas.concat(
                element.entitas.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'KODE ENTITAS': item.kode_entitas,
                    'KODE JENIS IDENTITAS': item.kode_jenis_identitas,
                    'NOMOR IDENTITAS': item.nomor_identitas,
                    'NAMA ENTITAS': item.nama_entitas,
                    'ALAMAT ENTITAS': item.alamat_entitas,
                    'NIB ENTITAS': item.nib_entitas,
                    'KODE JENIS API': item.kode_jenis_api,
                    'KODE STATUS': item.kode_status,
                    'NOMOR IJIN ENTITAS': item.nomor_ijin_entitas,
                    'TANGGAL IJIN ENTITAS': item.tanggal_ijin_entitas,
                    'KODE NEGARA': item.kode_negara,
                    'NIPER ENTITAS': item.niper_entitas,
                    'KODE KATEGORI KONSOLIDATOR': item.kode_kategori_konsolidator,
                    'KODE AFILIASI': item.kode_afiliasi,

                })));
        } else {
            entitas = entitas.concat(
                [{
                    'NOMOR AJU': '',
                    'SERI': '',
                    'KODE ENTITAS': '',
                    'KODE JENIS IDENTITAS': '',
                    'NOMOR IDENTITAS': '',
                    'NAMA ENTITAS': '',
                    'ALAMAT ENTITAS': '',
                    'NIB ENTITAS': '',
                    'KODE JENIS API': '',
                    'KODE STATUS': '',
                    'NOMOR IJIN ENTITAS': '',
                    'TANGGAL IJIN ENTITAS': '',
                    'KODE NEGARA': '',
                    'NIPER ENTITAS': '',
                    'KODE KATEGORI KONSOLIDATOR': '',
                    'KODE AFILIASI': '',

                }]
            )
        }


        if ((Array.isArray(element.dokumen)) && element.dokumen.length > 0) {
            dokumen = dokumen.concat(
                element.dokumen.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'KODE DOKUMEN': item.kode_dokumen,
                    'NOMOR DOKUMEN': item.nomor_dokumen,
                    'TANGGAL DOKUMEN': item.tanggal_dokumen,
                    'KODE FASILITAS': item.kode_fasilitas,
                    'KODE IJIN': item.kode_ijin,
                })));
        } else {
            dokumen = dokumen.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI': "",
                    'KODE DOKUMEN': "",
                    'NOMOR DOKUMEN': "",
                    'TANGGAL DOKUMEN': "",
                    'KODE FASILITAS': "",
                    'KODE IJIN': "",
                }])
        }


        if ((Array.isArray(element.pengangkut)) && element.pengangkut.length > 0) {
            pengangkut = dokumen.concat(
                element.pengangkut.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'KODE CARA ANGKUT': item.kode_cara_angkut,
                    'NAMA PENGANGKUT': item.nama_pengangkut,
                    'NOMOR PENGANGKUT': item.nomor_pengangkut,
                    'KODE BENDERA': item.kode_bendera,
                    'CALL SIGN': item.call_sign,
                    'FLAG ANGKUT PLB': item.flag_angkut_plb,
                    'CARA PENGANGKUTAN LAINNYA': item.cara_pengangkutan_lainnya,
                }))
            );
        } else {
            pengangkut = pengangkut.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI': "",
                    'KODE CARA ANGKUT': "",
                    'NAMA PENGANGKUT': "",
                    'NOMOR PENGANGKUT': "",
                    'KODE BENDERA': "",
                    'CALL SIGN': "",
                    'FLAG ANGKUT PLB': "",
                    'CARA PENGANGKUTAN LAINNYA': "",
                }]
            );
        }


        if ((Array.isArray(element.kemasan)) && element.kemasan.length > 0) {
            kemasan = kemasan.concat(
                element.kemasan.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'KODE KEMASAN': item.kode_kemasan,
                    'JUMLAH KEMASAN': item.jumlah_kemasan,
                    'MEREK': item.merek,
                }))
            );
        } else {
            kemasan = kemasan.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI': "",
                    'KODE KEMASAN': "",
                    'JUMLAH KEMASAN': "",
                    'MEREK': "",
                }]
            )
        }


        if ((Array.isArray(element.kontainer)) && element.kontainer.length > 0) {
            kontainer = kontainer.concat(
                element.kontainer.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'NOMOR KONTINER': item.nomor_kontiner,
                    'KODE UKURAN KONTAINER': item.kode_ukuran_kontainer,
                    'KODE JENIS KONTAINER': item.kode_jenis_kontainer,
                    'KODE TIPE KONTAINER': item.kode_tipe_kontainer,
                }))
            );
        } else {
            kontainer = kontainer.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI': "",
                    'NOMOR KONTINER': "",
                    'KODE UKURAN KONTAINER': "",
                    'KODE JENIS KONTAINER': "",
                    'KODE TIPE KONTAINER': "",
                }]
            );
        }


        if ((Array.isArray(element.komponen_biaya)) && element.komponen_biaya.length > 0) {
            komponen_biaya = komponen_biaya.concat(
                element.komponen_biaya.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'JENIS NILAI': item.jenis_nilai,
                    'HARGA INVOICE': item.harga_invoice,
                    'PEMBAYARAN TIDAK LANGSUNG': item.pembayaran_tidak_langsung,
                    'DISKON': item.diskon,
                    'KOMISI PENJUALAN': item.komisi_penjualan,
                    'BIAYA PENGEMASAN': item.biaya_pengemasan,
                    'BIAYA PENGEPAKAN': item.biaya_pengepakan,
                    'ASSIST': item.assist,
                    'ROYALTI': item.royalti,
                    'PROCEEDS': item.proceeds,
                    'BIAYA TRANSPORTASI': item.biaya_transportasi,
                    'BIAYA PEMUATAN': item.biaya_pemuatan,
                    'ASURANSI': item.asuransi,
                    'GARANSI': item.garansi,
                    'BIAYA KEPENTINGAN SENDIRI': item.biaya_kepentingan_sendiri,
                    'BIAYA PASCA IMPOR': item.biaya_pasca_impor,
                    'BIAYA PAJAK INTERNAL': item.biaya_pajak_internal,
                    'BUNGA': item.bunga,
                    'DEVIDEN': item.deviden,
                }))
            );
        } else {
            komponen_biaya = komponen_biaya.concat(
                [{
                    'NOMOR AJU': "",
                    'JENIS NILAI': "",
                    'HARGA INVOICE': "",
                    'PEMBAYARAN TIDAK LANGSUNG': "",
                    'DISKON': "",
                    'KOMISI PENJUALAN': "",
                    'BIAYA PENGEMASAN': "",
                    'BIAYA PENGEPAKAN': "",
                    'ASSIST': "",
                    'ROYALTI': "",
                    'PROCEEDS': "",
                    'BIAYA TRANSPORTASI': "",
                    'BIAYA PEMUATAN': "",
                    'ASURANSI': "",
                    'GARANSI': "",
                    'BIAYA KEPENTINGAN SENDIRI': "",
                    'BIAYA PASCA IMPOR': "",
                    'BIAYA PAJAK INTERNAL': "",
                    'BUNGA': "",
                    'DEVIDEN': "",
                }]
            );
        }


        if ((Array.isArray(element.barang)) && element.barang.length > 0) {
            barang = barang.concat(
                element.barang.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'HS': item.hs,
                    'KODE BARANG': item.kode_barang,
                    'URAIAN': item.uraian,
                    'MEREK': item.merek,
                    'TIPE': item.tipe,
                    'UKURAN': item.ukuran,
                    'SPESIFIKASI LAIN': item.spesifikasi_lain,
                    'KODE SATUAN': item.kode_satuan,
                    'JUMLAH SATUAN': item.jumlah_satuan,
                    'KODE KEMASAN': item.kode_kemasan,
                    'JUMLAH KEMASAN': item.jumlah_kemasan,
                    'KODE DOKUMEN ASAL': item.kode_dokumen_asal,
                    'KODE KANTOR ASAL': item.kode_kantor_asal,
                    'NOMOR DAFTAR ASAL': item.nomor_daftar_asal,
                    'TANGGAL DAFTAR ASAL': item.tanggal_daftar_asal,
                    'NOMOR AJU ASAL': item.nomor_aju_asal,
                    'SERI BARANG ASAL': item.seri_barang_asal,
                    'NETTO': item.netto,
                    'BRUTO': item.bruto,
                    'VOLUME': item.volume,
                    'SALDO AWAL': item.saldo_awal,
                    'SALDO AKHIR': item.saldo_akhir,
                    'JUMLAH REALISASI': item.jumlah_realisasi,
                    'CIF': item.cif,
                    'CIF RUPIAH': item.cif_rupiah,
                    'NDPBM': item.ndpbm,
                    'FOB': item.fob,
                    'ASURANSI': item.asuransi,
                    'FREIGHT': item.freight,
                    'NILAI TAMBAH': item.nilai_tambah,
                    'DISKON': item.diskon,
                    'HARGA PENYERAHAN': item.harga_penyerahan,
                    'HARGA PEROLEHAN': item.harga_perolehan,
                    'HARGA SATUAN': item.harga_satuan,
                    'HARGA EKSPOR': item.harga_ekspor,
                    'HARGA PATOKAN': item.harga_patokan,
                    'NILAI BARANG': item.nilai_barang,
                    'NILAI JASA': item.nilai_jasa,
                    'NILAI DANA SAWIT': item.nilai_dana_sawit,
                    'NILAI DEVISA': item.nilai_devisa,
                    'PERSENTASE IMPOR': item.persentase_impor,
                    'KODE ASAL BARANG': item.kode_asal_barang,
                    'KODE DAERAH ASAL': item.kode_daerah_asal,
                    'KODE GUNA BARANG': item.kode_guna_barang,
                    'KODE JENIS NILAI': item.kode_jenis_nilai,
                    'JATUH TEMPO ROYALTI': item.jatuh_tempo_royalti,
                    'KODE KATEGORI BARANG': item.kode_kategori_barang,
                    'KODE KONDISI BARANG': item.kode_kondisi_barang,
                    'KODE NEGARA ASAL': item.kode_negara_asal,
                    'KODE PERHITUNGAN': item.kode_perhitungan,
                    'PERNYATAAN LARTAS': item.pernyataan_lartas,
                    'FLAG 4 TAHUN': item.flag_4_tahun,
                    'SERI IZIN': item.seri_izin,
                    'TAHUN PEMBUATAN': item.tahun_pembuatan,
                    'KAPASITAS SILINDER': item.kapasitas_silinder,
                    'KODE BKC': item.kode_bkc,
                    'KODE KOMODITI BKC': item.kode_komoditi_bkc,
                    'KODE SUB KOMODITI BKC': item.kode_sub_komoditi_bkc,
                    'FLAG TIS': item.flag_tis,
                    'ISI PER KEMASAN': item.isi_per_kemasan,
                    'JUMLAH DILEKATKAN': item.jumlah_dilekatkan,
                    'JUMLAH PITA CUKAI': item.jumlah_pita_cukai,
                    'HJE CUKAI': item.hje_cukai,
                    'TARIF CUKAI': item.tarif_cukai,
                    'KODE JENIS EKSPOR': item.kode_jenis_ekspor,
                    'METODE PENENTUAN NILAI': item.metode_penentuan_nilai,
                    'ALASAN METODE PENENTUAN NILAI': item.alasan_metode_penentuan_nilai,
                    'STATEMENT PERBEDAAN HARGA': item.statement_perbedaan_harga,
                }))
            );
        } else {
            barang = barang.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'HS': "",
                    'KODE BARANG': "",
                    'URAIAN': "",
                    'MEREK': "",
                    'TIPE': "",
                    'UKURAN': "",
                    'SPESIFIKASI LAIN': "",
                    'KODE SATUAN': "",
                    'JUMLAH SATUAN': "",
                    'KODE KEMASAN': "",
                    'JUMLAH KEMASAN': "",
                    'KODE DOKUMEN ASAL': "",
                    'KODE KANTOR ASAL': "",
                    'NOMOR DAFTAR ASAL': "",
                    'TANGGAL DAFTAR ASAL': "",
                    'NOMOR AJU ASAL': "",
                    'SERI BARANG ASAL': "",
                    'NETTO': "",
                    'BRUTO': "",
                    'VOLUME': "",
                    'SALDO AWAL': "",
                    'SALDO AKHIR': "",
                    'JUMLAH REALISASI': "",
                    'CIF': "",
                    'CIF RUPIAH': "",
                    'NDPBM': "",
                    'FOB': "",
                    'ASURANSI': "",
                    'FREIGHT': "",
                    'NILAI TAMBAH': "",
                    'DISKON': "",
                    'HARGA PENYERAHAN': "",
                    'HARGA PEROLEHAN': "",
                    'HARGA SATUAN': "",
                    'HARGA EKSPOR': "",
                    'HARGA PATOKAN': "",
                    'NILAI BARANG': "",
                    'NILAI JASA': "",
                    'NILAI DANA SAWIT': "",
                    'NILAI DEVISA': "",
                    'PERSENTASE IMPOR': "",
                    'KODE ASAL BARANG': "",
                    'KODE DAERAH ASAL': "",
                    'KODE GUNA BARANG': "",
                    'KODE JENIS NILAI': "",
                    'JATUH TEMPO ROYALTI': "",
                    'KODE KATEGORI BARANG': "",
                    'KODE KONDISI BARANG': "",
                    'KODE NEGARA ASAL': "",
                    'KODE PERHITUNGAN': "",
                    'PERNYATAAN LARTAS': "",
                    'FLAG 4 TAHUN': "",
                    'SERI IZIN': "",
                    'TAHUN PEMBUATAN': "",
                    'KAPASITAS SILINDER': "",
                    'KODE BKC': "",
                    'KODE KOMODITI BKC': "",
                    'KODE SUB KOMODITI BKC': "",
                    'FLAG TIS': "",
                    'ISI PER KEMASAN': "",
                    'JUMLAH DILEKATKAN': "",
                    'JUMLAH PITA CUKAI': "",
                    'HJE CUKAI': "",
                    'TARIF CUKAI': "",
                    'KODE JENIS EKSPOR': "",
                    'METODE PENENTUAN NILAI': "",
                    'ALASAN METODE PENENTUAN NILAI': "",
                    'STATEMENT PERBEDAAN HARGA': "",
                }]
            );
        }


        if ((Array.isArray(element.barang_tarif)) && element.barang_tarif.length > 0) {
            barang_tarif = barang_tarif.concat(
                element.barang_tarif.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'KODE PUNGUTAN': item.kode_pungutan,
                    'KODE TARIF': item.kode_tarif,
                    'TARIF': item.tarif,
                    'KODE FASILITAS': item.kode_fasilitas,
                    'TARIF FASILITAS': item.tarif_fasilitas,
                    'NILAI BAYAR': item.nilai_bayar,
                    'NILAI FASILITAS': item.nilai_fasilitas,
                    'NILAI SUDAH DILUNASI': item.nilai_sudah_dilunasi,
                    'KODE SATUAN': item.kode_satuan,
                    'JUMLAH SATUAN': item.jumlah_satuan,
                    'FLAG BMT SEMENTARA': item.flag_bmt_sementara,
                    'KODE KOMODITI CUKAI': item.kode_komoditi_cukai,
                    'KODE SUB KOMODITI CUKAI': item.kode_sub_komoditi_cukai,
                    'FLAG TIS': item.flag_tis,
                    'FLAG PELEKATAN': item.flag_pelekatan,
                    'KODE KEMASAN': item.kode_kemasan,
                    'JUMLAH KEMASAN': item.jumlah_kemasan,
                }))
            );
        } else {
            barang_tarif = barang_tarif.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'KODE PUNGUTAN': "",
                    'KODE TARIF': "",
                    'TARIF': "",
                    'KODE FASILITAS': "",
                    'TARIF FASILITAS': "",
                    'NILAI BAYAR': "",
                    'NILAI FASILITAS': "",
                    'NILAI SUDAH DILUNASI': "",
                    'KODE SATUAN': "",
                    'JUMLAH SATUAN': "",
                    'FLAG BMT SEMENTARA': "",
                    'KODE KOMODITI CUKAI': "",
                    'KODE SUB KOMODITI CUKAI': "",
                    'FLAG TIS': "",
                    'FLAG PELEKATAN': "",
                    'KODE KEMASAN': "",
                    'JUMLAH KEMASAN': "",
                }]
            );
        }


        if ((Array.isArray(element.barang_dokumen)) && element.barang_dokumen.length > 0) {
            barang_dokumen = barang_dokumen.concat(
                element.barang_dokumen.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'SERI DOKUMEN': item.seri_dokumen,
                    'SERI IZIN': item.seri_izin,
                }))
            );
        } else {
            barang_dokumen = barang_dokumen.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'SERI DOKUMEN': "",
                    'SERI IZIN': "",
                }]
            );
        }


        if ((Array.isArray(element.barang_entitas)) && element.barang_entitas.length > 0) {
            barang_entitas = barang_entitas.concat(
                element.barang_entitas.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'SERI ENTITAS': item.seri_entitas,
                }))
            );
        } else {
            barang_entitas = barang_entitas.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'SERI ENTITAS': "",
                }]
            );
        }


        if ((Array.isArray(element.barang_khusus)) && element.barang_khusus.length > 0) {
            barang_khusus = barang_khusus.concat(
                element.barang_khusus.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'KODE': item.kode,
                    'URAIAN': item.uraian,
                }))
            );
        } else {
            barang_khusus = barang_khusus.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'KODE': "",
                    'URAIAN': "",
                }]
            );
        }


        if ((Array.isArray(element.barang_vd)) && element.barang_vd.length > 0) {
            barang_vd = barang_vd.concat(
                element.barang_vd.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'KODE VD': item.kode_vd,
                    'NILAI BARANG': item.nilai_barang,
                    'BIAYA TAMBAHAN': item.biaya_tambahan,
                    'BIAYA PENGURANG': item.biaya_pengurang,
                    'JATUH TEMPO': item.jatuh_tempo,
                }))
            );
        } else {
            barang_vd = barang_vd.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'KODE VD': "",
                    'NILAI BARANG': "",
                    'BIAYA TAMBAHAN': "",
                    'BIAYA PENGURANG': "",
                    'JATUH TEMPO': "",
                }]
            );
        }


        if ((Array.isArray(element.bahan_baku)) && element.bahan_baku.length > 0) {
            bahan_baku = bahan_baku.concat(
                element.bahan_baku.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'SERI BAHAN BAKU': item.seri_bahan_baku,
                    'KODE ASAL BAHAN BAKU': item.kode_asal_bahan_baku,
                    'HS': item.hs,
                    'KODE BARANG': item.kode_barang,
                    'URAIAN': item.uraian,
                    'MEREK': item.merek,
                    'TIPE': item.tipe,
                    'UKURAN': item.ukuran,
                    'SPESIFIKASI LAIN': item.spesifikasi_lain,
                    'KODE SATUAN': item.kode_satuan,
                    'JUMLAH SATUAN': item.jumlah_satuan,
                    'KODE KEMASAN': item.kode_kemasan,
                    'JUMLAH KEMASAN': item.jumlah_kemasan,
                    'KODE DOKUMEN ASAL': item.kode_dokumen_asal,
                    'KODE KANTOR ASAL': item.kode_kantor_asal,
                    'NOMOR DAFTAR ASAL': item.nomor_daftar_asal,
                    'TANGGAL DAFTAR ASAL': item.tanggal_daftar_asal,
                    'NOMOR AJU ASAL': item.nomor_aju_asal,
                    'SERI BARANG ASAL': item.seri_barang_asal,
                    'NETTO': item.netto,
                    'BRUTO': item.bruto,
                    'VOLUME': item.volume,
                    'CIF': item.cif,
                    'CIF RUPIAH': item.cif_rupiah,
                    'NDPBM': item.ndpbm,
                    'HARGA PENYERAHAN': item.harga_penyerahan,
                    'HARGA PEROLEHAN': item.harga_perolehan,
                    'NILAI JASA': item.nilai_jasa,
                    'SERI IZIN': item.seri_izin,
                    'VALUTA': item.valuta,
                    'KODE BKC': item.kode_bkc,
                    'KODE KOMODITI BKC': item.kode_komoditi_bkc,
                    'KODE SUB KOMODITI BKC': item.kode_sub_komoditi_bkc,
                    'FLAG TIS': item.flag_tis,
                    'ISI PER KEMASAN': item.isi_per_kemasan,
                    'JUMLAH DILEKATKAN': item.jumlah_dilekatkan,
                    'JUMLAH PITA CUKAI': item.jumlah_pita_cukai,
                    'HJE CUKAI': item.hje_cukai,
                    'TARIF CUKAI': item.tarif_cukai,
                }))
            );
        } else {
            bahan_baku = bahan_baku.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'SERI BAHAN BAKU': "",
                    'KODE ASAL BAHAN BAKU': "",
                    'HS': "",
                    'KODE BARANG': "",
                    'URAIAN': "",
                    'MEREK': "",
                    'TIPE': "",
                    'UKURAN': "",
                    'SPESIFIKASI LAIN': "",
                    'KODE SATUAN': "",
                    'JUMLAH SATUAN': "",
                    'KODE KEMASAN': "",
                    'JUMLAH KEMASAN': "",
                    'KODE DOKUMEN ASAL': "",
                    'KODE KANTOR ASAL': "",
                    'NOMOR DAFTAR ASAL': "",
                    'TANGGAL DAFTAR ASAL': "",
                    'NOMOR AJU ASAL': "",
                    'SERI BARANG ASAL': "",
                    'NETTO': "",
                    'BRUTO': "",
                    'VOLUME': "",
                    'CIF': "",
                    'CIF RUPIAH': "",
                    'NDPBM': "",
                    'HARGA PENYERAHAN': "",
                    'HARGA PEROLEHAN': "",
                    'NILAI JASA': "",
                    'SERI IZIN': "",
                    'VALUTA': "",
                    'KODE BKC': "",
                    'KODE KOMODITI BKC': "",
                    'KODE SUB KOMODITI BKC': "",
                    'FLAG TIS': "",
                    'ISI PER KEMASAN': "",
                    'JUMLAH DILEKATKAN': "",
                    'JUMLAH PITA CUKAI': "",
                    'HJE CUKAI': "",
                    'TARIF CUKAI': "",
                }]
            );
        }


        if ((Array.isArray(element.bahan_tarif)) && element.bahan_tarif.length > 0) {
            bahan_tarif = bahan_tarif.concat(
                element.bahan_tarif.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'SERI BAHAN BAKU': item.seri_bahan_baku,
                    'KODE ASAL BAHAN BAKU': item.kode_asal_bahan_baku,
                    'KODE PUNGUTAN': item.kode_pungutan,
                    'KODE TARIF': item.kode_tarif,
                    'TARIF': item.tarif,
                    'KODE FASILITAS': item.kode_fasilitas,
                    'TARIF FASILITAS': item.tarif_fasilitas,
                    'NILAI BAYAR': item.nilai_bayar,
                    'NILAI FASILITAS': item.nilai_fasilitas,
                    'NILAI SUDAH DILUNASI': item.nilai_sudah_dilunasi,
                    'KODE SATUAN': item.kode_satuan,
                    'JUMLAH SATUAN': item.jumlah_satuan,
                    'FLAG BMT SEMENTARA': item.flag_bmt_sementara,
                    'KODE KOMODITI CUKAI': item.kode_komoditi_cukai,
                    'KODE SUB KOMODITI CUKAI': item.kode_sub_komoditi_cukai,
                    'FLAG TIS': item.flag_tis,
                    'FLAG PELEKATAN': item.flag_pelekatan,
                    'KODE KEMASAN': item.kode_kemasan,
                    'KODE_SUB_KOMODITI_CUKAI': item.kode_sub_komoditi_cukai,
                    'FLAG_TIS': item.flag_tis,
                    'FLAG_PELEKATAN': item.flag_pelekatan,
                    'KODE_KEMASAN': item.kode_kemasan,
                    'JUMLAH KEMASAN': item.jumlah_kemasan,
                }))
            );
        } else {
            bahan_tarif = bahan_tarif.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'SERI BAHAN BAKU': "",
                    'KODE ASAL BAHAN BAKU': "",
                    'KODE PUNGUTAN': "",
                    'KODE TARIF': "",
                    'TARIF': "",
                    'KODE FASILITAS': "",
                    'TARIF FASILITAS': "",
                    'NILAI BAYAR': "",
                    'NILAI FASILITAS': "",
                    'NILAI SUDAH DILUNASI': "",
                    'KODE SATUAN': "",
                    'JUMLAH SATUAN': "",
                    'FLAG BMT SEMENTARA': "",
                    'KODE KOMODITI CUKAI': "",
                    'KODE SUB KOMODITI CUKAI': "",
                    'FLAG TIS': "",
                    'FLAG PELEKATAN': "",
                    'KODE KEMASAN': "",
                    'KODE_SUB_KOMODITI_CUKAI': "",
                    'FLAG_TIS': "",
                    'FLAG_PELEKATAN': "",
                    'KODE_KEMASAN': "",
                    'JUMLAH KEMASAN': "",
                }]
            );
        }


        if ((Array.isArray(element.bahan_baku_dokumen)) && element.bahan_baku_dokumen.length > 0) {
            bahan_baku_dokumen = bahan_baku_dokumen.concat(
                element.bahan_baku_dokumen.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI BARANG': item.seri_barang,
                    'SERI BAHAN BAKU': item.seri_bahan_baku,
                    'KODE_ASAL_BAHAN_BAKU': item.kode_asal_bahan_baku,
                    'SERI DOKUMEN': item.seri_dokumen,
                    'SERI IZIN': item.seri_izin,
                }))
            );
        } else {
            bahan_baku_dokumen = bahan_baku_dokumen.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI BARANG': "",
                    'SERI BAHAN BAKU': "",
                    'KODE_ASAL_BAHAN_BAKU': "",
                    'SERI DOKUMEN': "",
                    'SERI IZIN': "",
                }]
            );
        }


        if ((Array.isArray(element.pungutan)) && element.pungutan.length > 0) {
            pungutan = pungutan.concat(
                element.pungutan.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'KODE FASILITAS TARIF': item.kode_fasilitas_tarif,
                    'KODE JENIS PUNGUTAN': item.kode_jenis_pungutan,
                    'NILAI PUNGUTAN': item.nilai_pungutan,
                    'NPWP BILLING': item.npwp_billing,
                }))
            );
        } else {
            pungutan = pungutan.concat(
                [{
                    'NOMOR AJU': "",
                    'KODE FASILITAS TARIF': "",
                    'KODE JENIS PUNGUTAN': "",
                    'NILAI PUNGUTAN': "",
                    'NPWP BILLING': "",
                }]
            );
        }


        if ((Array.isArray(element.jaminan)) && element.jaminan.length > 0) {
            jaminan = jaminan.concat(
                element.jaminan.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'KODE': item.kode,
                    'NAMA': item.nama,
                }))
            );
        } else {
            jaminan = jaminan.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI': "",
                    'KODE': "",
                    'NAMA': "",
                }]
            );
        }


        if ((Array.isArray(element.bank_devisa)) && element.bank_devisa.length > 0) {
            bank_devisa = bank_devisa.concat(
                element.bank_devisa.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'SERI': item.seri,
                    'KODE': item.kode,
                    'NAMA': item.nama,
                }))
            );
        } else {
            bank_devisa = bank_devisa.concat(
                [{
                    'NOMOR AJU': "",
                    'SERI': "",
                    'KODE': "",
                    'NAMA': "",
                }]
            );
        }


        if ((Array.isArray(element.versi)) && element.versi.length > 0) {
            versi = versi.concat(
                element.versi.map((item: any) => ({
                    'VERSI': item.versi,
                }))
            );
        } else {
            versi = versi.concat(
                [{
                    'VERSI': "",
                }]
            );
        }


        if ((Array.isArray(element.response)) && element.response.length > 0) {
            response = response.concat(
                element.response.map((item: any) => ({
                    'NOMOR AJU': item.nomor_aju,
                    'KODE RESPON': item.kode_respon,
                    'NOMOR RESPON': item.nomor_respon,
                    'TANGGAL RESPON': item.tanggal_respon,
                }))
            );
        } else {
            response = response.concat(
                [{
                    'NOMOR AJU': "",
                    'KODE RESPON': "",
                    'NOMOR RESPON': "",
                    'TANGGAL RESPON': "",
                }]
            );
        }
    });

    return {
        HEADER: header,
        ENTITAS: entitas,
        DOKUMEN: dokumen,
        PENGANGKUT: pengangkut,
        KEMASAN: kemasan,
        KONTAINER: kontainer,
        KOMPONENBIAYA: komponen_biaya,
        BARANG: barang,
        BARANGTARIF: barang_tarif,
        BARANGDOKUMEN: barang_dokumen,
        BARANGENTITAS: barang_entitas,
        BARANGKHUSUS: barang_khusus,
        BARANGVD: barang_vd,
        BAHANBAKU: bahan_baku,
        BAHANBAKUTARIF: bahan_tarif,
        BAHANABAKUDOKUMEN: bahan_baku_dokumen,
        PUNGUTAN: pungutan,
        JAMINAN: jaminan,
        BANKDEVISA: bank_devisa,
        VERSI: versi,
        RESPON: response,

    };

};

export { FormatExcelDokumenTpb }