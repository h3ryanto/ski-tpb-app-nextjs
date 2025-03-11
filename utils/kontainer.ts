
const JenisKontainer = (kodeJenis: string) => {
    if (kodeJenis === '4') {
        return 'EMPTY'
    } else if (kodeJenis === '8') {
        return 'FCL'
    } else if (kodeJenis === '7') {
        return 'LCL'
    }
}
export { JenisKontainer }


const TipeKontainer = (kodeTipe: string) => {
    if (kodeTipe === '1') {
        return 'General / Dry Cargo'
    } else if (kodeTipe === '2') {
        return 'Tunne Type'
    } else if (kodeTipe === '3') {
        return 'Open Top Steel'
    } else if (kodeTipe === '4') {
        return 'Flat Rack'
    } else if (kodeTipe === '5') {
        return 'Reefer/Refregete'
    } else if (kodeTipe === '6') {
        return 'Barge Container'
    } else if (kodeTipe === '7') {
        return 'Bulk Container'
    } else if (kodeTipe === '8') {
        return 'Isotank'
    } else if (kodeTipe === '99') {
        return 'Lain-lain'
    }

}
export { TipeKontainer }