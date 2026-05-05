import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";


export interface ITaskDetailReportRequestBody extends BaseEntity {
    /** Số thứ tự */
    order?: number;

    sendBy?: string,

    /** Id phân công tiêu chí */
    eaqTaskDetailId?: number,

    /** Ngày hết hạn */
    reportDate?: string,

    /** Thông báo báo cáo */
    notificationMessage?: string,

    /** Ghi chú */
    note?: string

    /** Kết quả cải tiến */
    result?: string

    /** Trạng thái báo cáo */
    reportStatus?: number
}
