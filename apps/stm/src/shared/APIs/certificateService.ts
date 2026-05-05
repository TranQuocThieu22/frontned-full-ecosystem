import { Certificate } from "@/shared/interfaces/certificate";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Certificate";

export interface GetCertificatesByStudentIdResponse {
    certificate?: string;
    decisionDate?: string;
    certificateNumber?: string;
    filePath?: string;
    fullName?: string;
}

export const certificateService = {
    ...createBaseApi<Certificate>(CONTROLLER, axiosInstance),

    getCertificatesByStudentId: ({ params = "" }: { params?: string }) =>
        axiosInstance.get<CustomApiResponse<GetCertificatesByStudentIdResponse[]>>(
            CONTROLLER + "/GetCertificatesByStudentId" + params
        ),
};
