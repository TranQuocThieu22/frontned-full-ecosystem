
export const dateUtils = {
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
    toHHmmss(date?: Date | string) {
        const parsedDate = typeof date === "string" ? new Date(date) : date;
        if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return "";
        const h = String(parsedDate.getHours()).padStart(2, "0");
        const m = String(parsedDate.getMinutes()).padStart(2, "0");
        const s = String(parsedDate.getSeconds()).padStart(2, "0");
        return `${h}:${m}:${s}`;
    },
    toDateTime(date?: Date | string, withSeconds: boolean = true): string {
        const parsedDate = typeof date === "string" ? new Date(date) : date;
        if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return "";
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();
        const hours = String(parsedDate.getHours()).padStart(2, "0");
        const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
        const seconds = String(parsedDate.getSeconds()).padStart(2, "0");
        const time = withSeconds
            ? `${hours}:${minutes}:${seconds}`
            : `${hours}:${minutes}`;
        return `${day}/${month}/${year} - ${time}`;
    }
    ,
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
    convertMMYYYYToDate(str?: string) {
        if (!str) return undefined
        const [month, year] = str.split('/');
        return `${year}-${month?.padStart(2, '0')}-01`;
    }

}