import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { CertificateReviewBatch } from "@/shared/interfaces/certificateReviewBatch";

const CONTROLLER = "/CertificateReviewBatch";

export const certificateReviewBatchService = {
  ...createBaseApi<CertificateReviewBatch>(CONTROLLER, axiosInstance),
};

