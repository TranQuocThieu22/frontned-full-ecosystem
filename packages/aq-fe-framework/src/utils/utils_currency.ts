/**
 * @deprecated Hàm này không xài nữa nha mấy ní
 * Vui lòng dùng `utils_currency.formatWithSuffix` từ `utils-v2` thay thế.
 */
export function utils_currency_formatWithSuffix(amount: number, suffix: string = ''): string {
    const formatter = new Intl.NumberFormat('vi-VN');
    const formattedAmount = formatter.format(amount);
    return `${formattedAmount}${suffix}`
}
