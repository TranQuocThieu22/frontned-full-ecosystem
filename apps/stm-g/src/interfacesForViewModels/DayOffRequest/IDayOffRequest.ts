import { IUser } from "aq-fe-framework/interfaces";
import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface IDayOffRequest extends ISimpleViewModel {
    userId?: number;
    fromDate?: Date; // or Date if parsed
    toDate?: Date;
    status?: number;
    reason?: string;
    note?: string;
    totalSection?: number | null;
    filePath?: string;
    user?: IUser;
    fileDetail?: fileDetail; // Update with specific type if known
    comment?: string | null;
    isSentMail?: boolean | null;
    fileInput?: File | null; // For file upload, if applicable

}
interface fileDetail {
    fileName?: string,
    fileExtension?: string,
    fileBase64String?: string
}