export interface IStudentInfoViewModel {
    id?: number;
    code?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string | null;
    fullName?: string;
    gender?: number | null;
    dateOfBirth?: string;
    modifiedBy?: number;
    modifiedWhen?: string;
    classId?: number | null;
    class?: any | null;
}

export interface IGSMethodByGSAssessmentId {
    coeSubjectAssessmentId?: number;
    coecloId?: number;
    questionQuantity?: number;
    maxPoint?: number;
    coeSubjectAssessment?: {
        coeSubjectFormulaId?: number;
        content?: string;
        assessmentWhen?: string;
        assessmentDuration?: string;
        assessmentTool?: number;
        questionType?: number;
        totalQuestion?: number;
        coeGradeSubjectId?: number;
        coeSubjectMethods?: {
            coeSubjectAssessmentId?: number;
            coecloId?: number;
            questionQuantity?: number;
            maxPoint?: number;
            coeclo?: {
                order?: number;
                coecgId?: number;
                description?: string;
                densityCLO?: number;
                coeclopi?: any[];
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
            code?: string | null;
            name?: string | null;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            modifiedWhen?: string;
            modifiedBy?: number;
            modifiedFullName?: string;
        }[];
        coeSubjectFormula?: any;
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    coeclo?: {
        order?: number;
        coecgId?: number;
        description?: string;
        densityCLO?: number;
        coecg?: any;
        coeclopi?: any[];
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    coeSubjectMethodRubrics?: any[];
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}

export interface ICourseSetionStudentInfoViewModel {
    userId?: number;
    coeGradeSubjectId?: number | null;
    user?: any | null;
    coeCourseSection?: {
        coeGradeSubjectId?: number;
        pointRecordUserId?: number | null;
        studentQuantity?: number;
        coeGradeSubject?: {
            coeGradeId?: number;
            coeSubjectId?: number;
            coeSemesterId?: number;
            coeSubjectGroupId?: number;
            order?: number;
            isCore?: boolean;
            courseSectionQuantity?: number;
            courseSectionQuantityActual?: number;
            teachingUnitId?: number | null;
            measureUnitId?: number | null;
            collectUnitId?: number | null;
            coecGs?: any[] | null;
            coeSubjectFomulas?: any[] | null;
            coeGrade?: any | null;
            coeSubject?: any | null;
            coeSemester?: any | null;
            coeSubjectGroup?: any | null;
            coeSubjectAssessments?: any[];
            coeGradeSubjectMITPIs?: any[];
            teachingUnit?: any | null;
            measureUnit?: any | null;
            collectUnit?: any | null;
            id?: number;
            code?: string | null;
            name?: string | null;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            modifiedWhen?: string;
            modifiedBy?: number;
            modifiedFullName?: string;
        };
        coeCourseSectionClass?: any[];
        pointRecordUser?: any | null;
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}

export interface COECourseSectionStudentPointInfoViewModel {
    coeCourseSectionStudentId?: number;
    coecloId?: number | null;
    coeSubjectMethodId?: number | null;
    point?: number;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
    coeclo?: any | null;
    coeSubjectMethod?: any | null;
}

export interface COECourseSectionStudentPointViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeCourseSectionStudentId?: number;
    coecloId?: number | null;
    coeSubjectMethodId?: number | null;
    point?: number | null;
}

export interface COECourseSectionStudentPointMappedViewModel extends COECourseSectionStudentPointViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeCourseSectionStudentId?: number;
    coecloId?: number | null;
    coecloCode?: string | null;
    coecloName?: string | null;
    coeSubjectMethodId?: number | null;
    maxPointBySubjectMethod?: number | null;
    point?: number | null;
}

