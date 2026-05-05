import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { SRMPublicationDeclaration } from "./SRMPublicationDeclaration";
import { SRMTitle } from "./SRMTitle";

export interface SRMScientificPublicationHours extends BaseEntity {
    srmPublicationDeclaration?: SRMPublicationDeclaration
    srmTitle?: SRMTitle
    user: User
    /** Tỷ lệ đóng góp */
    contributionRate?: number
    /** Số giờ quy đổi */
    convertedTime?: number
    /** Số điểm quy đổi */
    convertedScore?: number
}