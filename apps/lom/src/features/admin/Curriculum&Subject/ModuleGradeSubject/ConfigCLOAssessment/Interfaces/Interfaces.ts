import { SemesterInfoViewModel } from "@/features/admin/Institution&Organization/Semester/semester-table";

export interface IGradeSubject {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    activityPlanId?: number | null;
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
    activityPlan?: SemesterInfoViewModel | null;
    coeSemester?: any | null;
    coeSubjectGroup?: any | null;
    coeSubjectAssessments?: any[];
}
