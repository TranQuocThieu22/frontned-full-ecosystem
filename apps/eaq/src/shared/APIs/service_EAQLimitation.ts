import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import ILimitationDetail from "@/shared/interfaces/limitation/ILimitationDetail";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "eaq/EAQLimitation";

export const service_EAQLimitation = {
    ...createBaseApi<ILimitation>(CONTROLLER, axiosInstance),

    GetEAQCriteriasByEAQPhaseId: (params: { eaqPhaseId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(
            CONTROLLER + `/GetEAQCriteriasByEAQPhaseId`, { params }
        );
    },

    getLimitationsByEAQPhaseId: (params: { limitationType?: number, eaqPhaseId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ILimitation[]>>(
            CONTROLLER + `/GetLimitationsByEAQPhaseId`, { params }
        );
    },

    getEAQLimitationDetailsById: (params: { eaqLimitationId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ILimitationDetail>>(
            CONTROLLER + `/GetEAQLimitationDetailsById`, { params }
        );
    },
    trackingSubmitLimitationReport: (data: {
        eaqLimitationId?: number,
        trackingStatus?: number,
        review?: string,
        isSendMail?: boolean,
        userId?: number
    }) => {
        return axiosInstance.post<CustomApiResponse<{}>>(
            CONTROLLER + '/TrackingSubmitLimitationReport', data)
    },

    submitEAQLimitationReport: (data: ISubmitEAQLimitationReport) => {
        return axiosInstance.post<CustomApiResponse<ILimitationDetail>>(
            CONTROLLER + `/SubmitEAQLimitationReport`,
            data
        );
    },

    assignUsersAndHostUnits: (data: IAssignUsersAndHostUnits[]) => {
        return axiosInstance.post<CustomApiResponse<ILimitation[]>>(
            CONTROLLER + '/AssignUsersAndHostUnits', data
        );
    },

    importHostUnitsAndUsers: (data: IImportHostUnitsAndUsers[]) => {
        return axiosInstance.post<CustomApiResponse<IImportHostUnitsAndUsers[]>>(
            CONTROLLER + '/ImportHostUnitsAndUsers', data
        );
    }
};

export interface IAssignUsersAndHostUnits {
    id?: number;
    hostUnitId?: number;
    userId?: number;
}

export interface IImportHostUnitsAndUsers {
    eaqLimitationCode?: string;
    hostUnitCode?: string;
    userCode?: string;
}

export interface ISubmitEAQLimitationReport {
    eaqLimitationId?: number;
    limitationReport?: string;
    ReportStatus?: number;
    EAQEvidenceIds?: number[];
}
