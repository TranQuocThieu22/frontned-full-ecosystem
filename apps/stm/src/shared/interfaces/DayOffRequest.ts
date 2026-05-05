import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IAQFileDetail } from "aq-fe-framework/utils";
import { User } from "./user";

export interface DayOffRequest extends BaseEntity {
    userId?: number;
    user?: User;
    fromDate?: Date;
    toDate?: Date;
    totalSection?: number;
    filePath?: string;
    fileDetail?: IAQFileDetail;
    reason?: string;
    note?: string;
    status?: number;
    comment?: string;
    isSentMail?: boolean;
    fileInput?: File;
}
