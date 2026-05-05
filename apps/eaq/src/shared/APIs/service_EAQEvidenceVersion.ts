import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


// Ví dụ tạo service
const CONTROLLER = "EAQ/EAQEvidenceVersion"

export const service_EAQEvidenceVersion = {
    ...createBaseApi<IEnvidenceVersion>(CONTROLLER, axiosInstance),
    getEAQEvidenceVersionByEAQEvidenceId: (params: {
        evidenceId?: number;
        cols?: string[];
    }) => axiosInstance.get<CustomApiResponse<IEnvidenceVersion[]>>(`${CONTROLLER}/getEAQEvidenceVersionByEAQEvidenceId`, { params }),
}

