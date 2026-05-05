import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMContract } from "./SRMContract";
import { SRMDeclarationMember } from "./SRMDeclarationMember";
import { SRMPublicationType } from "./SRMPublicationType";

export interface SRMPublicationDeclaration extends BaseEntity {
    order?: number;
    note?: string;

    /** Đơn vị công tác */
    affiliation?: string;

    /** Tóm tắt */
    abstract?: string;

    /** Năm xuất bản */
    publicationYear?: number;

    /** Trích dẫn */
    citation?: string;

    /** Số trích dẫn */
    citationIndex?: string;

    /** Liên kết toàn văn */
    fullTextLink?: string;

    /** Ngôn ngữ */
    language?: number;

    /** Đường dẫn file đính kèm */
    attachmentPath?: string;

    /** File đính kèm */
    attachmentDetail?: AQFileDetail;

    /** Tên tạp chí/Hội thảo/NXB */
    journal?: string;

    /** ISSN/ISBN */
    issn?: string;

    /** Cơ sở dữ liệu chỉ mục */
    databaseIndex?: string;

    /** Chỉ số tác động */
    impactFactor?: string;

    /** Số bằng độc quyền */
    patentNumber?: string;

    /** Ngày cấp bằng */
    grantDate?: string;

    /** Đơn vị cấp bằng */
    issuingAuthority?: string;

    /** Phạm vi bảo hộ */
    protectionScope?: string;

    /** Tổng số trang */
    totalPage?: number;

    /** Tổng số chương */
    totalChapter?: number;

    /** Id phiên bản */
    version?: string;

    /** Id loại công bố */
    srmPublicationTypeId?: number;

    /** Loại công bố */
    srmPublicationType?: SRMPublicationType;

    /** Id năm học */
    academicYearId?: number;

    // Id đề tài liên quan
    srmContractId?: number;

    // Đề tài liên quan
    srmContract?: SRMContract;

    /** Danh sách thành viên nội bộ */
    srmDeclarationMemberInternals?: SRMDeclarationMember[];

    /** Danh sách thành viên ngoại bộ */
    srmDeclarationMemberExternals?: SRMDeclarationMember[];

    isSendMail?: boolean,

    sendMailDate?: string,

    review?: string,

    status?: number,
}