import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMRecipient extends BaseEntity {
    name?: string;
    email?: string;
    dateOfBirth?: string
    // Add other recipient fields as needed
}