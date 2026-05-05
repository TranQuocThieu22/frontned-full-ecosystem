
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMAcceptanceContract } from "./SRMAcceptanceContract";
import { SRMAcceptanceMember } from "./SRMAcceptanceMember";
import { SRMContractReportHistory } from "./SRMContractReportHistory";
import { SRMTopic } from "./SRMTopic";

export interface SRMAcceptanceCouncil extends BaseEntity {
    /** Thứ tự */
    order?: number,
    /** Trạng thái hội đồng */
    status?: number,
    /** File thuyết minh */
    attachmentPath?: string
    /** File detail */
    attachmentDetail?: AQFileDetail
    /** Ngày họp dự kiến */
    meetingDate?: string,
    /** Thời gian họp */
    meetingTime?: string;
    /** Địa điểm họp */
    meetingLocation?: string;
    /** Loại hội đồng */
    type?: number;
    /** Id năm học */
    academicYearId?: number;
    /** Id tiêu chí đánh giá hội đồng */
    srmEvaluationCriteriaSetId?: number;
    /** Thành viên hội đồng */
    srmAcceptanceMembers?: SRMAcceptanceMember[],
    /** Đề tài nghiệm thu */
    srmAcceptanceContracts?: SRMAcceptanceContract[]
    /** Đề tài */
    srmTopic?: SRMTopic
    /** Trạng thái thực hiện */
    executionStatus?: number;

    /** Danh sách ngày báo cáo */
    srmContractReportHistories?: SRMContractReportHistory[]
    // For import
    meetingDateValue?: string; // For import
    /** Đề tài */
}