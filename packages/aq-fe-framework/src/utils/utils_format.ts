export function utils_format_fixDecimal(number: number, digits = 2): number | undefined {
    if (typeof number !== "number" || isNaN(number)) return undefined;
    return parseFloat(number.toFixed(digits));
}