const kodeDokumen = (kode: any) => {

    if (kode == '40') {
        return "BC 4.0"
    } else if (kode == '23') {
        return "BC 2.3"
    } else if (kode == '41') {
        return "BC 4.1"
    } else if (kode == '27') {
        return "BC 2.7"
    } else if (kode == '261') {
        return "BC 2.6.1"
    } else if (kode == '920') {
        return "SKEP"
    } else if (kode == '740') {
        return "H AWB"
    } else if (kode == '741') {
        return "M AWB"
    } else if (kode == '704') {
        return "M B/L"
    } else if (kode == '705') {
        return "H B/L"
    } else if (kode == '217') {
        return "Packing List"
    } else if (kode == '380') {
        return "Invoice"
    } else if (kode == '920') {
        return "SKEP"
    } else if (kode == '388') {
        return "Faktur Pajak"
    } else if (kode == '994') {
        return "BPJ"
    } else if (kode == '204' || kode == '205') {
        return "Persetujuan"
    } else if (kode == '315') {
        return "Kontrak"
    } else if (kode == '640') {
        return "Surat Jalan"
    } else if (kode == '999') {
        return "Lain-lain"
    }
}

export default kodeDokumen;