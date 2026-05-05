export function utils_list_isTotalEqual<T>(list: T[], field: keyof T, total: number): boolean {
    const totalValue = list.reduce((sum, item) => sum + Number(item[field]), 0);
    return totalValue === total;
}
export function utils_list_isFieldUnique<T>(list: T[], field: keyof T): boolean {
    const seen = new Set();
    for (const item of list) {
        const value = item[field];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
    }
    return true;
}

export function utils_list_hasEmptyField<T>(list: T[], field: keyof T): boolean {
    return list.some(item => {
        const value = item[field];
        return value === null || value === undefined || value === "";
    });
}
export function utils_list_sumField<T>(list: T[], field: keyof T): number {
    return list.reduce((sum, item) => sum + Number(item[field]), 0);
}