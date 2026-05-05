import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { ITaskDetailReport } from "@/shared/interfaces/task/ITaskDetailReport";
import { ITaskDetailReportRequestBody } from "@/shared/interfaces/task/ITaskDetailReportRequestBody";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "eaq/EAQAnalysis";

export const service_EAQAnalysis = {
    ...createBaseApi<IAnalysis>(CONTROLLER, axiosInstance),

    getTaskDetailAnalysesByEAQPhaseId: (params: { eaqPhaseId?: number, analysisType?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(CONTROLLER + "/GetEAQTaskDetailAnalysesByEAQPhaseId", {
            params,
        });
    },

    getAnalysesByEAQPhaseId: (params: { eaqPhaseId?: number, analysisType?: number }) => {
        return axiosInstance.get<CustomApiResponse<IAnalysis[]>>(CONTROLLER + "/GetEAQAnalysesByEAQPhaseId", {
            params,
        });
    },

    getCriteriaFilter: (params: IGetCriteriaFilterParams) => {
        return axiosInstance.get<CustomApiResponse<ICriteria[]>>(CONTROLLER + "/GetEAQCriteriaFilter", {
            params: params,
        });
    },

    createTaskDetailAnalysis: (data: ITaskDetailAnalysis) => {
        return axiosInstance.post<CustomApiResponse<any>>(CONTROLLER + "/CreateEAQTaskDetailAnalysis", data);
    },

    importTaskDetailAnalysis: (data: ITaskDetailAnalysis[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(CONTROLLER + "/ImportEAQLimitationAnalyses", data);
    },

    importTaskDetailAnalyses: (data: ITaskDetailAnalysis[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(CONTROLLER + "/ImportEAQTaskDetailAnalyses", data);
    },

    importTaskDetailEvidenceAnalyses: (data: ITaskDetailAnalysis[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(CONTROLLER + "/ImportEAQTaskDetailEvidenceAnalyses", data);
    },

    updateTaskDetailAnalysis: (data: ITaskDetailAnalysis) => {
        return axiosInstance.post<CustomApiResponse<any>>(CONTROLLER + "/UpdateEAQTaskDetailAnalysis", data);
    },

    deleteListTaskDetailAnalysis: (data: ITaskDetailAnalysis[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            CONTROLLER + "/deleteListEAQTaskDetailAnalysis",
            data
        );
    },

    getTaskDetailEvidenceAnalysesByEAQAnalysisIds: (params: IGetByEAQAnalysisIdsParams) => {
        return axiosInstance.post<CustomApiResponse<IAnalysis[]>>(
            CONTROLLER + "/GetEAQTaskDetailEvidenceAnalysesByEAQAnalysisIds",
            params
        );
    },

    getTaskDetailEvidenceAnalysesByEAQPhaseId: (params: { eaqPhaseId?: number, analysisType?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(
            CONTROLLER + "/GetEAQTaskDetailEvidenceAnalysesByEAQPhaseId",
            {
                params,
            }
        );
    },

    getTaskDetailEvidenceAnalysesByEAQTaskDetailIds: (params: IGetByEAQTaskDetailIdsParams) => {
        return axiosInstance.post<CustomApiResponse<IAnalysis[]>>(
            CONTROLLER + "/GetEAQTaskDetailEvidenceAnalysesByEAQTaskDetailIds",
            params
        );
    },

    createTaskDetailEvidenceAnalysis: (data: ITaskDetail) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            CONTROLLER + "/CreateEAQTaskDetailEvidenceAnalysis",
            data
        );
    },

    updateTaskDetailEvidenceAnalysis: (data: ITaskDetail) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            CONTROLLER + "/UpdateEAQTaskDetailEvidenceAnalysis",
            data
        );
    },

    deleteListTaskDetailEvidenceAnalysis: (data: ITaskDetail[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            CONTROLLER + "/DeleteListEAQTaskDetailEvidenceAnalysis",
            data
        );
    },

    GetEAQTaskDetailAnalysesByEAQPhaseId: (params: { eaqPhaseId?: number, analysisType?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetailAnalysis[]>>(
            CONTROLLER + "/GetEAQTaskDetailAnalysesByEAQPhaseId",
            { params }
        );
    },

    getEAQTaskDetailReportsByEAQPhaseId: (params: { eaqPhaseId?: number, analysisType?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(
            CONTROLLER + "/GetEAQTaskDetailReportsByEAQPhaseId",
            { params }
        );
    },

    getEAQReportRemindersByEAQReportId: (params: { eaqReportId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(
            CONTROLLER + "/GetEAQReportRemindersByEAQReportId",
            { params }
        );
    },

    updateEAQTaskDetailAnalysis: (body: EAQTaskDetailAnalysisUpdateViewModel) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetail[]>>(
            CONTROLLER + "/UpdateEAQTaskDetailAnalysis",
            body
        );
    },

    sendEAQReportReminder: (body: ISendEAQReportReminder) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetail[]>>(
            CONTROLLER + "/SendEAQReportReminder",
            body
        );
    },

    getEAQTaskDetailReportsByEAQTaskDetaiId: (params: { eaqTaskDetailId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetailReport[]>>(
            CONTROLLER + '/GetEAQTaskDetailReportsByEAQTaskDetaiId',
            { params }
        );
    },

    createEAQTaskDetailReport: (body: ITaskDetailReportRequestBody) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetailReport>>(
            CONTROLLER + '/CreateEAQTaskDetailReport', body
        );
    },

    updateEAQTaskDetailReport: (body: ITaskDetailReportRequestBody) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetailReport>>(
            CONTROLLER + '/UpdateEAQTaskDetailReport', body
        );
    },

    deleteListEAQTaskDetailReport: (body: BaseEntity[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            CONTROLLER + '/DeleteListEAQTaskDetailReport', body
        );
    },

    createPeriodicReport: (body: ICreatePeriodicReportRequestBody) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            CONTROLLER + '/CreatePeriodicReport', body
        );
    },

    deleteListEAQTaskDetailReportByTaskDetailIds: (taskDetailsIds: number[]) => {
        return axiosInstance.post(
            CONTROLLER + '/DeleteListEAQTaskDetailReportByTaskDetailIds', taskDetailsIds.map(item => ({
                id: item
            }))
        );
    },

    createListEAQTaskDetailReport: (body: ITaskDetailReportRequestBody[]) => {
        return axiosInstance.post(
            CONTROLLER + '/CreateListEAQTaskDetailReport', body
        );
    },
    importListEAQTaskDetailAnalysis: (body: IImportListEAQTaskDetailAnalysis[]) => {
        return axiosInstance.post(
            CONTROLLER + '/ImportUpdateEAQTaskDetailAnalyses', body
        );
    },

    importUpdateEAQTaskDetailAnalyses: (body: IImportUpdateEAQTaskDetailAnalyses[]) => {
        return axiosInstance.post(
            CONTROLLER + '/ImportUpdateEAQTaskDetailAnalyses', body
        );
    },

    collectEvidence: (body: CollectEvidenceViewModel) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetail[]>>(CONTROLLER + "/CollectEvidence", body)
    },

    importEAQRequirementAnalyses: (body: IRequirementAnalysisImport[]) => {
        return axiosInstance.post<CustomApiResponse<IRequirementAnalysisImport[]>>(CONTROLLER + "/ImportEAQRequirementAnalyses", body)
    },

    importEAQTaskDetailAnalyses: (body: ITaskDetailAnalysisImport[]) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetailAnalysisImport[]>>(CONTROLLER + "/ImportEAQTaskDetailAnalyses", body)
    },

    importEAQTaskDetailEvidenceAnalyses: (body: ITaskDetailEvidenceAnalysisImport[]) => {
        return axiosInstance.post<CustomApiResponse<ITaskDetailEvidenceAnalysisImport[]>>(CONTROLLER + "/ImportEAQTaskDetailEvidenceAnalyses", body)
    },

    getEAQTaskDetailEvidencesByEAQTaskDetailId: (params: { eaqTaskDetailId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetailEvidence[]>>(
            CONTROLLER + "/GetEAQTaskDetailEvidencesByEAQTaskDetailId",
            { params }
        );
    }
};

interface IGetTaskDetailEvidenceAnalysesByEAQPhaseIdParams {
    eaqPhaseId: number;
    analysisType?: number;
}
interface CollectEvidenceViewModel {
    eaqTaskDetailId?: number;
    eaqEvidenceId?: number;
    eaqTaskDetailEvidenceId?: number;
    eaqReportId?: number
}
export interface IImportUpdateEAQTaskDetailAnalyses {
    userCode?: string;
    eaqTaskDetailCode?: string;
    duration?: string;
    expectedResult?: string;
    hostUnitCode?: string;
    supportUnit?: string;
    note?: string;
}

interface IImportListEAQTaskDetailAnalysis {
    id?: number,
    code?: string,
    name?: string,
    userId?: number,
    supportUnit?: string,
    note?: string
}

interface IGetByEAQTaskDetailIdsParams {
    eaqTaskDetailIds: number[];
    pageNumber?: number;
    pageSize?: number;
}

interface IGetByEAQAnalysisIdsParams {
    eaqAnalysisIds: number[];
    pageNumber?: number;
    pageSize?: number;
}

interface IGetCriteriaFilterParams {
    eaqPhaseId?: number;
    eaqCriteriaId?: number;
    eaqLimitationId?: number;
    eaqAnalysisId?: number;
    eaqRequirementId?: number;
}

export interface ISendEAQReportReminder {
    eaqReportId?: number;
    eaqPhaseId?: number
    userId?: number;
    description?: string;
}

interface ICreatePeriodicReportRequestBody {
    startDate: string,
    endDate: string,
    frequency: number,
    reportDay: number,
    eaqTaskDetailId: number[]
}

export interface EAQTaskDetailAnalysisUpdateViewModel {
    id?: number;
    code?: string;
    name?: string;
    duration?: string;
    expectedResult?: string;
    hostUnitId?: number;
    supportUnit?: string;
    userId?: number;
    note?: string;
}

export interface IRequirementAnalysisImport {
    code?: string;
    name?: string;
    description?: string;
    question?: string;
    analysisType?: number;
    eaqRequirementCode?: string;
    eaqLimitationCode?: string;
    eaqPhaseId?: number;
}

export interface ITaskDetailAnalysisImport {
    code: string;
    name: string;
    eaqAnalysisCode?: number;
}

export interface ITaskDetailEvidenceAnalysisImport {
    code: string;
    name: string;
    eaqTaskDetailCode?: number;
}
