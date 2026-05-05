import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { Class } from "./Class";

export interface StudentList extends Account {
    fullName: string,
    email: string,
    address: string,
    phoneNumber: string,
    facultyCode: string,
    facultyName: string,
    classCode: string,
    className: string,
    majorsCode: string,
    majorsName: string,
    avatarPath: string,
    dateOfBirth: string,
    placeOfBirth: string,
    identifier: string,
    identifierIssuePlace: string,
    identifierIssueDate: string,
    coeClass?: Class
}
