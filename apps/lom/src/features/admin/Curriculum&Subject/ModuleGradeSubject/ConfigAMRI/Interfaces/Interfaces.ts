import { SemesterInfoViewModel } from "@/features/admin/Institution&Organization/Semester/semester-table";
import { IGradeSubjectPIViewModel } from "./IGradeSubjectPI";

export interface IGradeSubjectWithAssessment {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    coeSubjectGroupId?: number;
    order?: number;
    isCore?: boolean;
    courseSectionQuantity?: number | null;
    courseSectionQuantityActual?: number;
    coecGs?: any[];
    coeSubjectFomulas?: any[];
    coeGrade?: any | null;
    coeSubject?: {
        id?: number;
        code?: string;
        name?: string;
        nameEg?: string;
        numberPeriod?: number;
        numberCredit?: number;
        note?: string;
        coeUnitId?: number;
        coeUnit?: any | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    coeSemester?: any | null;
    coeSubjectGroup?: any | null;
    coeSubjectAssessments?: any[];
}

export interface IGradeSubjectInfoViewModel {
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    activityPlanId?: number | null;
    coeSubjectGroupId?: number;
    order?: number;
    isCore?: boolean | null;
    armiValue?: string | null;
    courseSectionQuantity?: number;
    courseSectionQuantityActual?: number;
    teachingUnitId?: number | null;
    measureUnitId?: number | null;
    collectUnitId?: number | null;
    coecGs?: any[];
    coeSubjectFomulas?: any[];
    coeGrade?: any | null;
    coeSubject?: {
        nameEg?: string;
        numberPeriod?: number;
        numberCredit?: number;
        note?: string;
        coeUnitId?: number;
        coeUnit?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    coeSemester?: {
        startDate?: string;
        endDate?: string;
        coeSchoolYearId?: number;
        numberWeek?: number;
        note?: string;
        isCurrent?: boolean;
        coeSchoolYear?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    activityPlan?: SemesterInfoViewModel | null;
    coeSubjectGroup?: {
        note?: string;
        coemitScaleId?: number;
        coemitScale?: {
            knowledge?: string;
            skill?: string;
            autonomy?: string;
            description?: string;
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
    };
    coeSubjectAssessments?: any[];
    coeGradeSubjectMITPIs?: any[];
    teachingUnit?: any | null;
    measureUnit?: any | null;
    collectUnit?: any | null;
    coeGradeSubjectPIs?: IGradeSubjectPIViewModel[];
    formulaType?: number | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
}

export interface IPLOViewModel {
    order?: number | null;
    description?: string;
    densityPLO?: number;
    coeGradeId?: number;
    proficiency?: number;
    coeGrade?: any | null;
    coepIs?: IPIViewModel[];
    id?: number;
    code?: string;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
}

export interface IPIViewModel {
    order?: number | null;
    description?: string;
    densityPI?: number;
    coeploId?: number;
    id?: number;
    code?: string;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
}

export interface IGradeSubjectViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    coeSubjectGroupId?: number;
    order?: number;
    isCore?: boolean;
    armiValue?: string;
    formulaType?: number;
    courseSectionQuantity?: number;
    teachingUnitId?: number;
    measureUnitId?: number;
    collectUnitId?: number;
}
