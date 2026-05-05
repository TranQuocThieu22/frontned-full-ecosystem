export interface IStudentInfoViewModel {
    fullName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    gender?: number;
    facultyName?: string;
    className?: string | null;
    majorsName?: string | null;
    avatarPath?: string;
    dateOfBirth?: string;
    placeOfBirth?: string | null;
    identifier?: string | null;
    identifierIssuePlace?: string | null;
    identifierIssueDate?: string | null;
    id?: number;
    code?: string;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}