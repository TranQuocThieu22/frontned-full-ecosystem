import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";

import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

// Ví dụ tạo service
const CONTROLLER = "eaq/EvidenceType";

export const service_EvidenceType = {
  // Đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<BaseEntity>(CONTROLLER, axiosInstance),
  GetEvidenceTypeByDepartment: () => {
    return axiosInstance.get<CustomApiResponse<IEvidence[]>>(
      CONTROLLER + "/GetEvidenceTypeByDepartment");
  },
};
