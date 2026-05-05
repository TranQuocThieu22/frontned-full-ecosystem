
export interface IGradeSubjectPIViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
    coeGradeSubjectId?: number | null
    coepiId?: number | null
    armiValue?: string | null
}