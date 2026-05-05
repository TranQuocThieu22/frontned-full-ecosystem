import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface Account extends BaseEntity {
  fullName?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  gender?: number;
  facultyName?: string;
  className?: string;
  majorsName?: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  identifier?: string;
  identifierIssuePlace?: string;
  identifierIssueDate?: string;
  isEnabled?: boolean;
}
