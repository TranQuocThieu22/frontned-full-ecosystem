import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMAcceptanceContractMember } from "./SRMAcceptanceContractMember";
import { SRMAcceptanceCouncil } from "./SRMAcceptanceCouncil";
import { SRMConclusion } from "./SRMConclusion";
import { SRMContract } from "./SRMContract";


/** Hợp đồng thuộc hội đồng trường/khoa được hội đồng đánh giá */
export interface SRMAcceptanceContract extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Thông tin hội đồng */
    srmAcceptanceCouncil?: SRMAcceptanceCouncil
    /** Id hội đồng */
    srmAcceptanceCouncilId?: number
    /** Ngày họp */
    dateMeeting?: string
    /** Đề tài nghiệm thu */
    srmContract?: SRMContract
    /** Id đề tài nghiệm thu */
    srmContractId?: number
    /** Điểm trung bình */
    point?: number
    /** Thông tin kết luận */
    srmConclusion?: SRMConclusion
    /** Id kế luận */
    srmConclusionId?: number
    /** Kiến nghị */
    recommendation?: string
    /** Nhận xét */
    comment?: string
    /** Danh sách thành viên và đánh giá của họ */
    srmAcceptanceContractMembers?: SRMAcceptanceContractMember[]
    /** File họp hội đồng */
    attachmentDetail?: AQFileDetail
    /** Link file họp hội đồng */
    attachmentPath?: string
}
