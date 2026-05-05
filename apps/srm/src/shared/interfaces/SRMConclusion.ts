import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

/** Kết luận */
export interface SRMConclusion extends BaseEntity {
    /** Ghi chú */
    note?: string;
    /** Màu sắc hiển thị */
    color?: string;
    /** Kết luận này là đạt? */
    isPass?: boolean;
    /** Id bộ kết luận */
    srmConclusionSetId?: number;
    /** Kết luận này là đạt? (Dùng cho import) */
    isPassNumber?: number; // for imporrt
}
