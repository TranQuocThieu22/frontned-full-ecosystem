import { BaseEntity } from "./BaseEntity";

export interface AQModule extends BaseEntity {
    officelName?: string;
    phoneNumber?: string;
    email?: string;
    faviconPath?: string;
    logoPath?: string;
    registrationDate?: Date;
    limiteDate?: Date;
    faviconFileDetail?: {
        fileName?: string;
        fileExtension?: string;
        fileBase64String?: string;
    };
    logoFileDetail?: {
        fileName?: string;
        fileExtension?: string;
        fileBase64String?: string;
    };
}