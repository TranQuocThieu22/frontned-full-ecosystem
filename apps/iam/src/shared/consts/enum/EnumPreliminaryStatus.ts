export enum EnumPreliminaryStatus {
    Waiting = 1,
    FixRequested = 2,
    Rejected = 3,
    Approved = 4,
}

export const EnumLabelPreliminaryStatus: Record<EnumPreliminaryStatus, string> = {
  [EnumPreliminaryStatus.Waiting]: "Chờ kiểm tra sơ bộ",
  [EnumPreliminaryStatus.FixRequested]: "Yêu cầu điều chỉnh sơ bộ",
  [EnumPreliminaryStatus.Rejected]: "Không đạt yêu cầu sơ bộ",
  [EnumPreliminaryStatus.Approved]: "Đạt kiểm tra sơ bộ",
};