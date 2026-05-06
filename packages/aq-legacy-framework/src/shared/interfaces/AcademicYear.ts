/**
 * interface của năm học dùng chung
 */
export interface AcademicYear {
  id?: number;
  code?: string;
  name?: string;
  /** Ngày bắt đầu năm học */
  academicYearStart?: Date;
  /** Ngày kết thúc năm học */
  academicYearEnd?: Date;
  /** Ngày bắt đầu năm hành chính */
  administrativeYearStart?: Date;
  /** Ngày kết thúc năm hành chính */
  administrativeYearEnd?: Date;
  isEnabled?: boolean;
  isCurrent?: boolean;
  concurrencyStamp?: string;
  note?: string;
  aqModuleId?: number;
}
export type AcademicYearUpdateDto = Omit<
  AcademicYear,
  | 'academicYearStart'
  | 'academicYearEnd'
  | 'administrativeYearStart'
  | 'administrativeYearEnd'
> & {
  academicYearStart?: string | null;
  academicYearEnd?: string | null;
  administrativeYearStart?: string | null;
  administrativeYearEnd?: string | null;
};
