import { IPhase } from "@/shared/interfaces/Phase/IPhase";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


// Ví dụ tạo service
const CONTROLLER = "eaq/EAQPhase";

export const service_EAQPhase = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IPhase>(CONTROLLER, axiosInstance),

  getAllByEAQStandardSetId: ({
    EAQStandardSetId,
    cols,
  }: {
    EAQStandardSetId?: number;
    cols?: string[];
  }) => {
    return axiosInstance.get<CustomApiResponse<IPhase[]>>(
      CONTROLLER +
      `/GetAllByEAQStandardSetId?EAQStandardSetId=${EAQStandardSetId}&cols=${cols?.join(",")}`
    );
  },
  getAllByEAQTrainingProgramId: (eaqTrainingProgramId?: number) => {
    return axiosInstance.get<CustomApiResponse<IPhase[]>>(`${CONTROLLER}/GetAllByEAQTrainingProgramId`, {
      params: {
        eaqTrainingProgramId: eaqTrainingProgramId,
      },
    });
  },
  getPhasesInTrainingProgram: (eaqTrainingProgramId?: number) => {
    return axiosInstance.get<CustomApiResponse<IPhase[]>>(`${CONTROLLER}/GetPhasesInTrainingProgram`, {
      params: {
        eaqTrainingProgramId: eaqTrainingProgramId,
      },
    });
  },
  getAllByEAQStandardSetTrainingprogramId: (params: {
    eaqStandardSetTrainingProgramId?: number;
  }) => {
    return axiosInstance.get<CustomApiResponse<IPhase[]>>(
      `${CONTROLLER}/GetAllByEAQStandardSetTrainingprogramId`,
      {
        params: params,
      }
    );
  },
  importEAQPhases: (data: Partial<IImportEAQPhases>[]) => {
    return axiosInstance.post<CustomApiResponse<IImportEAQPhases[]>>(
      `${CONTROLLER}/ImportEAQPhases`,
      data
    );
  },
};

export interface IImportEAQPhases {
  code?: string;
  name?: string;
  note?: string;
  startDate?: string;
  endDate?: string;
  phaseStatus?: number;
  isCurrent?: boolean;
  eaqStandardSetTrainingProgramCode?: string;
  eaqStandardSetCode?: string;
}