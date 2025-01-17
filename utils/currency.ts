export function formatCurrency(value: number = 0, currency: string = 'USD'): string {
    const getLocale = (currency: string) => {
        if (currency == 'USD') {
            return 'en-US'
        } else if (currency == 'IDR') {
            return 'id-ID'
        } else if (currency == 'JPY') {
            return 'ja-JP'
        } else if (currency == 'EUR') {
            return 'en-GB'
        } else if (currency == 'HKD') {
            return 'zh-HK'
        } else if (currency == 'EUR') {
            return 'de-CH'
        }
    }
    return new Intl.NumberFormat(getLocale(currency), { style: 'currency', currency }).format(value);
}