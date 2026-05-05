export interface ICourseSectionInfoViewModel {
    semesterName?: string | null;
    semesterCode?: string | null;
    subjectName?: string | null;
    subjectCode?: string | null;
    courseSectionId?: number | null;
    courseSectionName?: string | null;
    courseSectionCode?: string | null;
    numberPeriod?: number | null;
    numberCredit?: number | null;
    subjectAssessmentId?: number | null;
    subjectAssessmentName?: string | null;
    subjectAssessmentContent?: string | null;
    subjectAssessmentQuestiontype?: number | null;
    totalStudent?: number | null;
    pointQuantity?: number | null;
    pointQuantityActual?: number | null;
    coeGradeSubjectId?: number | null;
}

export enum Gender {
    "Nam" = 1,
    "Nữ" = 2,
}

export interface ICourseSectionStudentInfoViewModel {
    userId?: number;
    coeGradeSubjectId?: number | null;
    user?: {
        id?: number;
        code?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        avatarPath?: string;
        fullName?: string;
        gender?: number | null;
        dateOfBirth?: string;
        modifiedBy?: number;
        modifiedWhen?: string;
        classId?: number;
        class?: any | null;
    };
    coeCourseSection?: {
        coeGradeSubjectId?: number;
        pointRecordUserId?: number | null;
        studentQuantity?: number;
        coeGradeSubject?: any | null;
        coeCourseSectionClass?: any[];
        pointRecordUser?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}

export interface COECourseSectionStudentPointMappedViewModel {
    // subjectId?: number | null;
    // subjectName?: string | null;
    // studentId?: number | null;
    // studentFullName?: string | null;
    // studentDateOfBirth?: Date | null;
    // studentGender?: number | null;
    // studentClassCode?: string | null;
    // studentGradeCode?: number | null;
    courseSectionStudentInfo?: ICourseSectionStudentInfoViewModel | null;
    courseSectionStudentPoint?: IcourseSectionStudentPoint[]
}

export interface IcourseSectionStudentPoint {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeCourseSectionStudentId?: number;
    coecloId?: number | null;
    coecloName?: string | null;
    coeSubjectMethodId?: number | null;
    maxPointBySubjectMethod?: number | null;
    point?: number | null;
}