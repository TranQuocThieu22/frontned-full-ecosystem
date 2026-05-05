import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { IEvidenceType } from "@/shared/interfaces/evidence/IEvidenceType";

const CONTROLLER = "eaq/EvidenceType";

export const service_EAQEvidenceType = {
  ...createBaseApi<IEvidenceType>(CONTROLLER, axiosInstance),
};
