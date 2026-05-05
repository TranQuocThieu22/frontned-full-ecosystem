export const formatUtils = {
    fixDecimal(number: number, digits = 2): number | undefined {
        if (typeof number !== "number" || isNaN(number)) return undefined;
        return parseFloat(number.toFixed(digits));
    }
}