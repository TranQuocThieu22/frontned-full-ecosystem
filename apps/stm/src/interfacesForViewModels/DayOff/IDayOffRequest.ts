import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface IDayOff extends ISimpleViewModel {
    subjectName?: string | null;
    courseSectionId?: number;
    addressId?: number;
    classPeriodStart?: number;
    classPeriodEnd?: number;
    startDate?: Date; // Or Date if parsed
    endDate?: Date; // Or Date
    addressName?: string;
    addressCapacity?: number;
    lecturerName?: string[]; // Assuming this is a list of names; adjust if it's more complex
    fileInput?: File | null;


}
interface fileDetail {
    fileName?: string,
    fileExtension?: string,
    fileBase64String?: string
}