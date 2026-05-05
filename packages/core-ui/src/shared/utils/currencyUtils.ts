export const currencyUtils = {
    formatWithSuffix(amount?: number, suffix: string = ''): string {
        if (amount == null || isNaN(amount)) {
            return '';
        }

        const formatter = new Intl.NumberFormat('vi-VN');
        const formattedAmount = formatter.format(amount).replace(/\./g, ',');
        return `${formattedAmount}${suffix}`;
    }
};