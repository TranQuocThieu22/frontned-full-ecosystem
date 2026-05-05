import { IRoadmap } from "@/shared/interfaces/roadmap/Roadmap";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

// Ví dụ tạo service
const CONTROLLER = "eaq/EAQRoadmap";

export const service_EAQRoadmap = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<BaseEntity>(CONTROLLER, axiosInstance),

  GetEAQRoadmapsByEAQPhaseId: ({ eaqPhaseId, cols }: { eaqPhaseId?: number; cols?: string[] }) => {
    if (!cols)
      return axiosInstance.get<CustomApiResponse<IRoadmap[]>>(
        CONTROLLER + `/GetEAQRoadmapsByEAQPhaseId?EAQPhaseId=${eaqPhaseId}`
      );
    return axiosInstance.get<CustomApiResponse<IRoadmap[]>>(
      CONTROLLER + `/GetEAQRoadmapsByEAQPhaseId?EAQPhaseId=${eaqPhaseId}&cols=${cols?.join(",")}`
    );
  },
};
