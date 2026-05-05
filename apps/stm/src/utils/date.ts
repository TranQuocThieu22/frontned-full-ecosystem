import dayjs from "dayjs";

export function utils_date_dateToDDMMYYYString(date?: Date) {
  if (!date) return undefined
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên phải cộng thêm 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function utils_date_formatToDateTimeString(date?: Date) {
  if (!date) return undefined
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên phải cộng thêm 1
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} - ${hour}:${minute}:${second}`;
}

export function utils_date_formatToDateTimeStartEnd(startDate: Date, endDate: Date) {
  const startday = String(startDate.getDate()).padStart(2, "0");
  const startmonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên phải cộng thêm 1
  const startyear = startDate.getFullYear();
  const starthour = String(startDate.getHours()).padStart(2, "0");
  const startminute = String(startDate.getMinutes()).padStart(2, "0");

  const endhour = String(endDate.getHours()).padStart(2, "0");
  const endminuate = String(endDate.getMinutes()).padStart(2, "0");

  return `${startday}/${startmonth}/${startyear}  [${starthour}:${startminute} - ${endhour}:${endminuate}]`;
}

export const utils_date_addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60 * 1000);
};

export const utils_date_formatDateToLocalString = (date: Date) => {
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};


export const utils_date_countCertainWeekDays = (days: number[], start: Date, end: Date) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  let countByDay: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  let currentDate = startDate;

  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    const weekday = currentDate.day();
    if (days.includes(weekday)) {
      const key = dayMap[weekday];
      if (key && countByDay[key]) {
        countByDay[key]++;
      }
    }
    currentDate = currentDate.add(1, "day");
  }

  return countByDay;
}

export const utils_date_getWeekDay = (date: Date, language: string) => {

  const weekday = date.getDay();
  switch (language) {
    case 'vi':
      return ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][weekday];
    case 'en':
    default:
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekday];
  }
}

export function utils_date_dateToTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}