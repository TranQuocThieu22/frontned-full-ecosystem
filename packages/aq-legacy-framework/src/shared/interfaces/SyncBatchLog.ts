import { SyncBatchLogStatusEnum } from "@aq-fe/aq-legacy-framework/shared/const/enum/syncBatchLogStatusEnum";
import { BaseEntity } from "./BaseEntity";

export interface SyncBatchLog extends BaseEntity {
    /** Trạng thái đồng bộ */
    status?: SyncBatchLogStatusEnum;
    /** Thông báo */
    message?: string;
    /** Số lượng dữ liệu trong bảng tạm thời"*/
    tempCount?: number;
    /** Số lượng dữ liệu thêm mới */
    createCount?: number;
    /** Số lượng dữ liệu cập nhật */
    updateCount?: number;
    /** Tổng số lượng dữ liệu đã có sau khi đồng bộ */
    finalCount?: number;
    /** Tổng số lượng dữ liệu thay đổi hoặc thêm mới */
    syncCount?: number;
    /** Số lượng dữ liệu đã tồn tại */
    existingCount?: number;
    /** Bước hiện tại */
    currentStep?: number;
    /** Thời gian kết thúc*/
    endedAt?: string; // ISO datetime string
}