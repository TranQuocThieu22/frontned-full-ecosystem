import { CertificateResult } from "@/shared/interfaces/certificateResult";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/CertificateResult";

export const certificateResultService = {
  ...createBaseApi<CertificateResult>(CONTROLLER, axiosInstance),

  getCertificateResultDecision: () =>
    axiosInstance.get<CustomApiResponse<CertificateResult[]>>(
      CONTROLLER + "/GetCertificateResultDecision?cols=User%2CExam",
    ),
};


