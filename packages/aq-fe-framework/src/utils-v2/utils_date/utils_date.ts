
export const utils_date = {
    toDDMMYYYY(date?: Date | string) {
        const parsedDate = typeof date === "string" ? new Date(date) : date;
        if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return "";
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    },
    toMMYYYY(date?: Date | string) {
        const parsedDate = typeof date === "string" ? new Date(date) : date;
        if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return "";
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();
        return `${month}/${year}`;
    },
    toHHmm(date: Date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) return "";
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${hour}:${minute}`;
    },
    toDateTime(date?: Date | string, WithSeconds?: boolean): string {
        const parsedDate = typeof date === "string" ? new Date(date) : date;
        if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return "";
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();
        const hours = String(parsedDate.getHours()).padStart(2, "0");
        const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
        const seconds = String(parsedDate.getSeconds()).padStart(2, "0");
        return `${day}/${month}/${year} - ${hours}:${minutes}${WithSeconds && `:${seconds}`}`;
    },
    toDateTimeStartEnd(startDate: Date, endDate: Date) {
        const startday = String(startDate.getDate()).padStart(2, "0");
        const startmonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên phải cộng thêm 1
        const startyear = startDate.getFullYear();
        const starthour = String(startDate.getHours()).padStart(2, "0");
        const startminute = String(startDate.getMinutes()).padStart(2, "0");
        const endhour = String(endDate.getHours()).padStart(2, "0");
        const endminuate = String(endDate.getMinutes()).padStart(2, "0");
        return `${startday}/${startmonth}/${startyear}  [${starthour}:${startminute} - ${endhour}:${endminuate}]`;
    },

}