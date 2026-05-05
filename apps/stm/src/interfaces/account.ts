import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface IAccount extends IBaseEntity {
    fullName?: string,
    email?: string,
    address?: string;
    phoneNumber?: string;
    gender?: number;
    facultyName?: string;
    className?: string | null;
    majorsName?: string | null;
    dateOfBirth?: Date;
    placeOfBirth?: string | null;
    identifier?: string | null;
    identifierIssuePlace?: string | null;
    identifierIssueDate?: string | null;
    isEnabled?: boolean;
}