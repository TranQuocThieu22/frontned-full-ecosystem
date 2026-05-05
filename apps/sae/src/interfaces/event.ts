import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Standard } from "./standard";

export interface Event extends BaseEntity {
    host?: number | null;
    hostName?: string;

    startDate?: string;
    endDate?: string;

    maxPoint?: number;
    minPoint?: number;

    standardId?: number;
    note?: string;
    isNoted?: boolean;

    address?: number;
    addressName?: string;

    quantity?: number;
    facultyId?: number;
    facultyName?: string;

    isRequired?: boolean;
    isCompleted?: boolean;

    registrationCount?: number;
    participationCount?: number;

    standardName?: string;
    standardCode?: string;

    completedBy?: number;
    completedName?: string;

    reviewedName?: string;
    reviewedBy?: number;

    approvalStatus?: number;   // Mới
    source?: number;           // Mới
    registerType?: number;     // Mới

    session?: number;
    isTemplate?: boolean;

    eventGroupId?: number;
    eventGroupName?: string;
    proofPath?: string;
    isPointVerified?: boolean; // Mới

    standard?: Standard;

    futurePlanId?: number // Mới

    location?: string;
    isRegistration?: boolean

    //Cho import
    hostCode?: string;
    reviewedCode?: string;
    completedCode?: string;
}
