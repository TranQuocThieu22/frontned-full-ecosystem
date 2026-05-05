import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IQuality extends BaseEntity {
    criteriaCode?: string; // Mã tiêu chí
    criteriaName?: string; // Tên tiêu chí
    weaknessCode?: string; // Mã khu vực
    weaknessName?: string;
    weaknessType?: string;
    taskCode?: string;
    taskName?: string;
    taskDetailEvidenceCode?: string;
    taskDetailEvidenceName?: string;
    duration: string;
    expectedResult?: string;
    hostingOrganization?: string;
    collabUnit?: string;
    /** Nguoi phu trach */
    affiliatedPersonel?: string;
    affiliatedPersonelId?: string;
    user?: Account;
}
