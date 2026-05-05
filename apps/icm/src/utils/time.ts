export const U0ConvertTimeStringToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return (hours ?? 0) * 3600 + (minutes ?? 0) * 60 + (seconds ?? 0);
};

export const U0GetCurrentTime = (): string => {
  const formatTime = (number: number) => {
    return number < 10 ? "0" + number : number;
  };
  const now = new Date();
  const hours = formatTime(now.getHours());
  const minutes = formatTime(now.getMinutes());
  const seconds = formatTime(now.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};
