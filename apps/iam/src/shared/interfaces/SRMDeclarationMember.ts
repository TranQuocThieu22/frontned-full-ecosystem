import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { SRMPublicationDeclaration } from "./SRMPublicationDeclaration";
import { SRMTitle } from "./SRMTitle";

export interface SRMDeclarationMember extends BaseEntity {
    /** Số thứ tự */
    order?: number;

    /** Tỷ lệ đóng góp (%) */
    contributionRate?: number;

    /** Là thành viên ngoại bộ */
    isExternal?: boolean;

    /** Id công bố */
    srmPublicationDeclarationId?: number;

    /** Id người dùng */
    userId?: number;

    /** Id vai trò */
    srmTitleId?: number;

    /** Người dùng */
    user?: User;

    /** Vai trò */
    srmTitle?: SRMTitle;

    /** Công bố khoa học */
    srmPublicationDeclaration?: SRMPublicationDeclaration;

    /** Số điểm quy đổi */
    convertedScore?: number;

    /** Số giờ quy đổi */
    convertedTime?: number;

    /** Số điểm quy đổi chênh lệch */
    scoreDifference?: number

    /** Thời gian quy đổi chênh lệch */
    timeDifference?: number

    /** Khóa */
    isBlock?: boolean
}