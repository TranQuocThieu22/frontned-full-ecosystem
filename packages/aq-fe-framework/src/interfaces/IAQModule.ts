import { IBaseEntity } from "./IBaseEntity";

export interface IAQModule extends IBaseEntity {
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