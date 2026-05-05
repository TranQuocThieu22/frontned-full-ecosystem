import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface StudentRanking extends BaseEntity {
    totalPoint: number;
    rateName: string;
    activityStudentInfoViewModels: ActivityStudentInfoViewModel[];
}

interface ActivityStudentInfoViewModel {
    standardId: number;
    standardName: string;
    standardMinPoint: number;
    standardMaxpoint: number;
    maxPoint: number;
    evidences: Evidences[];
}

interface Evidences {
    eventName: string;
    eventCode: string;
    point: number;
    teacherPoint: number | null;
    schoolPoint: number | null;
    maxPoint: number;
    isApply: boolean;
}
