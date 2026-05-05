export default interface ISemesterViewModel {
  id?: number;
  code?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  academicYearId?: number;
}
