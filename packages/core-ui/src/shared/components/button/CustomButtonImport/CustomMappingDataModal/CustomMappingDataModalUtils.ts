function isDDMMYYYYFormat(date?: string): boolean {
    if (!date) return false;

    // Kiểm tra định dạng dd/MM/yyyy bằng regex
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = date.match(regex);
    if (!match) return false;

    const day = parseInt(match[1] ?? "", 10);
    const month = parseInt(match[2] ?? "", 10);
    const year = parseInt(match[3] ?? "", 10);

    // Kiểm tra tháng hợp lệ (1–12)
    if (month < 1 || month > 12) return false;

    // Số ngày tối đa của từng tháng
    const daysInMonth = new Date(year, month, 0).getDate();

    // Kiểm tra ngày hợp lệ (1–ngày tối đa)
    if (day < 1 || day > daysInMonth) return false;

    return true;
}

function convertToYYYYMMDD(date?: string): string | null {
    if (!date) return null;

    // Kiểm tra định dạng dd/MM/yyyy
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = date.match(regex);
    if (!match) return null;

    const day = parseInt(match[1] ?? "", 10);
    const month = parseInt(match[2] ?? "", 10);
    const year = parseInt(match[3] ?? "", 10);

    // Kiểm tra hợp lệ của ngày/tháng/năm
    const daysInMonth = new Date(year, month, 0).getDate();
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return null;

    // Trả về chuỗi theo định dạng yyyy-MM-dd
    const yyyy = year.toString();
    const MM = month.toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');

    return `${yyyy}-${MM}-${dd}`;
}



export const CustomMappingDataModalUtils = {
    isDDMMYYYYFormat,
    convertToYYYYMMDD
}