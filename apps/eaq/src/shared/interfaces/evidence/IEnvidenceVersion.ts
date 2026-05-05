import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";

export interface IEnvidenceVersion extends BaseEntity {
  versionNumberIssueDate?: string;
  validDate?: string;
  expiredDate?: string;
  isCurrent?: boolean;
  isExpired?: boolean;
  attachFileName?: string;
  attachFileDescription?: string;
  link?: string;
  department?: Department;
  departmentId?: number
  eaqEvidenceId?: number;
  attachFilePath?: string; //filePath trên server
  attachFile?: File; // Dùng để lưu vào trong  MyFileInput
  attachFileViewModel?: AQFileDetail; // Dùng để upload lên servers
  statusAction?: 'isCreate' | 'isUpdate' | 'isDelete';
}
