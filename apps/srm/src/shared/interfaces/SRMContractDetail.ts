import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMContract } from "./SRMContract";

export interface SRMContractDetail extends BaseEntity {
    /** thứ tự */
    order?: number,
    /** Nội dung sửa đổi */
    amendmentContent?: string,
    /** thời gian thực hiện */
    duration?: string,
    /** mục tiêu */
    objective?: string,
    /** Nội dung */
    content?: string,
    /** Tổng chi phí */
    totalCost?: number,
    /** sản phẩm */
    output?: string,
    /** thành viên */
    member?: string,
    /** đơn vị phối hợp */
    collaboratingInstitution?: string,
    /** tiên độ */
    implementationProgress?: string,
    /** tên File phiếu điều chỉnh*/
    attachmentPath?: string,
    /** File phiếu điều chỉnh*/
    attachmentDetail?: AQFileDetail,
    /** tên File xử lí yêu cầu điều chỉnh*/
    processingAttachmentPath?: string,
    /** File xử lí yêu cầu điều chỉnh*/
    processingAttachmentDetail?: AQFileDetail,
    /** Từ ngày */
    fromDate?: string,
    /** Đến ngày */
    toDate?: string,
    /** Phương pháp */
    method?: string,
    /** id hợp đồng */
    srmContractId?: number,
    /** id năm học */
    academicYearId?: number,
    /** Trạng thái xử lí */
    processingStatus?: number,
    /** Trạng thái thực hiện  */
    executionStatus?: number,
    /** Tóm tắt xử lí */
    processingSummary?: string,
    /** chi tiết năm học */
    academicYear?: AcademicYear,
    /** Hợp đồng */
    srmContract?: SRMContract,

    signingDate?: string,
}
