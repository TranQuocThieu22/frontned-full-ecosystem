import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";


export interface ITaskDetailAnalysis extends BaseEntity {
    duration?: string,
    expectedResult?: string,
    hostUnit?: Department,
    hostUnitId?: number;
    supportUnit?: string,
    note?: string,
    reportCount?: number,
    eaqAnalysisId?: number,
    userId?: number,
    user?: User,
    eaqAnalysis?: IAnalysis,
    eaqTaskDetailEvidences?: ITaskDetailEvidence[],
    eaqPhaseId?: number,
}
