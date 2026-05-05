import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMConclusion } from "./SRMConclusion";
import { SRMCriteria } from "./SRMCriteria";
import { SRMEvaluationCommittee } from "./SRMEvaluationCommittee";
import { SRMTopic } from "./SRMTopic";
import { SRMTopicMember } from "./SRMTopicMember";

export interface SRMEvaluationTopic extends BaseEntity {
    /** Thứ tự */
    order?: number,
    /** id hội đồng đánh giá */
    srmEvaluationCommitteeId?: number,
    /** Ngày họp */
    meetingDate?: string,
    /** Ghi chú */
    recommendation?: string,
    /** File đính kèm */
    attachmentPath?: string,
    /** id kết luận */
    srmConclusionId?: number,
    /** id đề tài */
    srmTopicId?: number,
    /** đề tài */
    srmTopic?: SRMTopic,
    /** kết luận */
    srmConclusion?: SRMConclusion,
    /** hội đồng đánh giá */
    srmEvaluationCommittee?: SRMEvaluationCommittee,
    /** thành viên đánh giá */
    srmEvaluationTopicMembers?: IEvaluationTopicMembers[],
    attachmentDetail?: AQFileDetail;
}

export interface IEvaluationTopicMembers extends BaseEntity {
    /** id thành viên đánh giá */
    srmEvaluationMemberId?: number,
    /** id kết luận */
    srmConclusionId?: number,
    /** thành viên đánh giá */
    srmEvaluationMember?: SRMTopicMember,
    /** danh sách tiêu chí đánh giá */
    srmEvaluationTopicMemberCriterias?: IEvaluationTopicMemberCriteria[],
    /** kết luận */
    srmConclusion?: SRMConclusion,
}

export interface IEvaluationTopicMemberCriteria extends BaseEntity {
    /** id thành viên đánh giá */
    srmEvaluationTopicMemberId?: number,
    /** id tiêu chí đánh giá */
    srmCriteriaId?: number,
    /** kết quả yes/no */
    isResult?: boolean,
    /** kết quả text */
    comment?: string,
    /** kết quả điểm */
    point?: number,
    /** tiêu chí đánh giá */
    srmCriteria?: SRMCriteria
}
