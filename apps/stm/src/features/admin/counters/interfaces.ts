export enum BusinessType {
  "Danh sách học viên" = 1,
  "Danh sách phiếu thu" = 2,
}

export enum ObjectType {
  "Toàn đơn vị" = 1,
  "Toàn bộ phòng" = 2,
}

export enum RepeatCycle {
  "Không lặp lại" = 1,
  "Hàng ngày" = 2,
  "Hàng tuần" = 3,
  "Hàng tháng" = 4,
  "Hàng năm" = 5,
}

export interface Counter {
  id?: number;
  code?: string;
  name?: string;
  businessType?: string;
  objectType?: string;
  repeatCycle?: string;
  prefix?: string;
  suffix?: string;
  length?: string;
  useZero?: string;
}

