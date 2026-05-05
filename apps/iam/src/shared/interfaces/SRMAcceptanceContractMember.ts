import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMAcceptanceMember } from "./SRMAcceptanceMember";
import { SRMConclusion } from "./SRMConclusion";

/** Kết luận của các thành viên hội đồng trường/khoa đối với hợp đồng */
export interface SRMAcceptanceContractMember extends BaseEntity {
    /** Id kết luận */
    srmConclusionId?: number;
    /** Thông tin kết luận */
    srmConclusion?: SRMConclusion;
    /** Id thành viên hội đồng */
    srmAcceptanceMemberId?: number
    /** Id của của hợp đồng trong hội đồng*/
    srmAcceptanceContractId?: number
    /** Thông tin thành viên hội đồng */
    srmAcceptanceMember?: SRMAcceptanceMember
}