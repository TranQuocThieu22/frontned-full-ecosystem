import { FileDetail } from "./IFileDetail";



export interface IComplaintCreateViewModel {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    eventCode?: string;
    description?: string;
    status?: number;
    studentId?: number;
    point?: number;
    complaintpoint?: number;
    newPoint?: number;
    path?: string;
    fileDetail?: FileDetail | any;
}