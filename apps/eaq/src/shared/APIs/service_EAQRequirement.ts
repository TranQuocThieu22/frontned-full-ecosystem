import IRequirementDetail from "@/shared/interfaces/requirement/IRequirementDetail";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = "eaq/EAQRequirement";

export const service_EAQRequirement = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IRequirement>(CONTROLLER, axiosInstance),
  GetEAQRequirementByEAQStandardSetId: (EAQStandardSetId?: number) => {
    return axiosInstance.get<CustomApiResponse<IRequirement[]>>(
      CONTROLLER +
      `/GetEAQRequirementByEAQStandardSetId?EAQStandardSetId=${EAQStandardSetId}`
    );
  },
  GetEAQRequirementsByEAQPhaseId: (params: { eaqPhaseId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IRequirement[]>>(
      CONTROLLER + `/GetEAQRequirementsByEAQPhaseId`, { params }
    );
  },
  getEAQRequirementDetailsById: (params: { eaqRequirementId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IRequirementDetail>>(
      CONTROLLER + `/GetEAQRequirementDetailsById`,
      { params }
    );
  },
  TrackingSubmitRequirementReport: (data: {
    eaqRequirementId?: number;
    trackingStatus?: number;
    review?: string;
    isSendMail?: boolean;
    userId?: number;
  }) => {
    return axiosInstance.post<CustomApiResponse<{}>>(
      CONTROLLER + "/TrackingSubmitRequirementReport",
      data
    );
  },
  submitEAQRequirementReport: (data: ISubmitEAQRequirementReport) => {
    return axiosInstance.post<CustomApiResponse<IRequirementDetail>>(
      CONTROLLER + `/SubmitEAQRequirementReport`,
      data
    );
  },
  AssignUsersAndHostUnits: (data: AssignUserAndDepartmentsUpdateViewModel[]) => {
    return axiosInstance.post<CustomApiResponse<IRequirementDetail>>(
      CONTROLLER + `/AssignUsersAndHostUnits`,
      data
    );
  },
  ImportUsersAndHostUnits: (data: ImportUsersAndHostUnitsViewModel[]) => {
    return axiosInstance.post<CustomApiResponse<any>>(
      CONTROLLER + `/ImportUsersAndHostUnits`,
      data
    );
  },

};

export interface ISubmitEAQRequirementReport {
  eaqRequirementId?: number;
  requirementReport?: string;
  ReportStatus?: number;
  EAQEvidenceIds?: number[];
}
export interface AssignUserAndDepartmentsUpdateViewModel {
  id: number;
  userId?: number;
  hostUnitId?: number;
}
export interface ImportUsersAndHostUnitsViewModel {
  eaqRequirementCode?: string
  userCode?: string
  hostUnitCode?: string
}
