import { IconUserCheck, IconCertificate, IconFileCheck, TablerIcon } from "@tabler/icons-react";

export enum EnumSourceType {
  Participate = 1,
  StudyResult = 2,
  FileVerification = 3,
}

export const EnumSourceTypeLabel: Record<EnumSourceType, string> = {
  [EnumSourceType.Participate]: "Điểm danh",
  [EnumSourceType.StudyResult]: "Kết quả học tập",
  [EnumSourceType.FileVerification]: "Xác duyệt minh chứng",
};

export const EnumSourceTypeColor: Record<EnumSourceType, string> = {
  [EnumSourceType.Participate]: "green",
  [EnumSourceType.StudyResult]: "blue",
  [EnumSourceType.FileVerification]: "yellow",
};

export const EnumSourceTypeIcon: Record<EnumSourceType, TablerIcon> = {
  [EnumSourceType.Participate]: IconUserCheck,
  [EnumSourceType.StudyResult]: IconCertificate,
  [EnumSourceType.FileVerification]: IconFileCheck,
};
