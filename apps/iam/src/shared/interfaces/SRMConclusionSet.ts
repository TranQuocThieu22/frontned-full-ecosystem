import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMConclusion } from "./SRMConclusion";

/** Bộ kết luận */
export interface SRMConclusionSet extends BaseEntity {
  /** Trạng thái không sử dụng */
  isDeactivate?: boolean;
  /** Ghi chú */
  note?: string;
  /** Danh sách kết luận */
  srmConclusions?: SRMConclusion[];
  /** Trạng thái không sử dụng ( dùng cho import) */
  isDeactivateNumber?: number; // for import
}
