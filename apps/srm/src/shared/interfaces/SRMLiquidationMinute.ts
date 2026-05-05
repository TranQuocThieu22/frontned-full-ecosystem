import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMContract } from "./SRMContract";

export interface SRMLiquidationMinute extends BaseEntity {

    order?: number,
    /** Ngày biên bản */
    liquidationDate?: Date,
    /** File biên bản thanh lý*/
    attachmentPath?: string,
    /** Chi tiết file biên bản thanh lý*/
    attachmentDetail?: AQFileDetail,
    /** Số biên bản thanh lý*/
    minuteNumber?: string,
    /** Kinh phí đề nghị */
    proposedBudget?: number,
    /** Kinh phí hoàn trả*/
    refundedBudget?: number,
    /** Id đề tài */
    srmContractId?: number,
    /** Id năm học */
    academicYearId?: number,
    /** Chi tiết năm học */
    academicYear?: AcademicYear,
    /** Chi tiết hợp đồng */
    srmContract?: SRMContract,
    /** Tổng kinh phí thanh toán */
    totalCost?: number,
    /** Kinh phí TW (Thanh toán) */
    centralBudget?: number,
    /** Kinh phí Tỉnh (Thanh toán) */
    provincialBudget?: number,
    /** Kinh phí Trường (Thanh toán) */
    universityBudget?: number,
    /** Kinh phí Khác (Thanh toán) */
    otherBudget?: number,
}