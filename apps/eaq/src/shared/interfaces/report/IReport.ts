import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IEvidenceUsageHistory } from "../evidence/IEvidenceUsageHistory";
import { IReminder } from "../reminder/IReminder";
import { ITaskDetail } from "../task/ITaskDetail";

export interface IReport extends BaseEntity {
    /** Lần báo cáo */
    order?: number;

    /** Id phân công tiêu chí */
    eaqTaskDetailId?: number;

    /** Phân công tiêu chí */
    eaqTaskDetail?: ITaskDetail;

    /** Ngày hết hạn */
    reportDate?: string;

    /** Ghi chú */
    note?: string;

    /** Kết quả cải tiến */
    result?: string;

    /** Trạng thái báo cáo */
    reportStatus?: number;

    eaqReportReminder?: IReminder;

    isReminded?: boolean

    eaqEvidenceUsageHistories?: IEvidenceUsageHistory[]

    trackingStatus?: number
}
