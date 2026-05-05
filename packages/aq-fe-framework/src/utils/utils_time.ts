/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_time.convertTimeStringToSeconds` từ `utils-v2` thay thế.
 */
export function utils_time_convertTimeStringToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};
/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_date.toHHmm` từ `utils-v2` thay thế.
 */
export function utils_time_getHourMinuteFromString(input?: string | Date): string {
  if (!input) return "";
  if (typeof input === "string") {
    const [hour, minute] = input.split(":");
    return `${hour}:${minute}`;
  }
  const hour = String(input.getHours()).padStart(2, "0");
  const minute = String(input.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}
/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_time.getCurrentTime` từ `utils-v2` thay thế.
 */
export function utils_time_getCurrentTimeString(): string {
  const formatTime = (number: number) => {
    return number < 10 ? "0" + number : number;
  };
  const now = new Date();
  const hours = formatTime(now.getHours());
  const minutes = formatTime(now.getMinutes());
  const seconds = formatTime(now.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};
/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_date.toHHmm` từ `utils-v2` thay thế.
 */
export function utils_time_extractHourMinute(isoString?: string) {
  if (!isoString) return ""; // hoặc có thể trả về "00:00" tùy nhu cầu
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

