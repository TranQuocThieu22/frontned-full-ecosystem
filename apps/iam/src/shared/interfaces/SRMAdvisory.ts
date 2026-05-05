import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMEvaluationCriteriaSet } from "./SRMEvaluationCriteriaSet";
import { SRMEvaluationMember } from "./SRMEvaluationMember";
import { SRMEvaluationTopic } from "./SRMEvaluationTopic";

export interface SRMAdvisory extends BaseEntity {
    meetingDate?: string
    meetingTime?: string
    type?: number
    meetingLocation?: string
    srmEvaluationMembers?: SRMEvaluationMember[]
    srmEvaluationMembersId?: number[]
    note?: string
    academicYearId?: number
    // submitRegistrations?: ISubmitRegistrationInfoViewModal[]
    status?: number
    attachmentPath?: string
    attachmentDetail?: AQFileDetail
    srmEvaluationCriteriaSet?: SRMEvaluationCriteriaSet
    srmEvaluationCriteriaSetId?: number
    srmEvaluationTopics?: SRMEvaluationTopic[]
    srmEvaluationTopicsIds?: number[]

}

/**
 * @property meetingDate         Ngày họp
 * @property meetingTime         Thời gian họp
 * @property meetingAddress      Địa điểm  họp
 * @property members             Danh sách thành viên
 * @property submitRegistrations Các đăng ký tuyển chọn được xét duyệt
 * @property status              Trạng thái hội đồng
 * @property attachFilePath      Đường dẫn tệp đính kèm
 * @property criteriaSet         Bộ tiêu chí đánh giá
 */
