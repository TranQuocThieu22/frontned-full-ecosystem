export interface ICourseSectionViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    // modifiedWhen?: string;
    // modifiedBy?: number;
    studyGroup?: string;
    coeGradeSubjectId?: number | null;
    pointRecordUserId?: number | null;
    coeCourseSectionClass?: ICourseSectionClassViewModel[] | null;
}

export interface ICourseSectionClassViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    coeCourseSectionId?: number;
    coeClassId?: number;
}