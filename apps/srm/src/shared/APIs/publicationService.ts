import { SRMPublication } from '@/shared/interfaces/SRMPublication';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = "/srm/SRMPublication";

export const publicationService = {
    ...createBaseApi<SRMPublication>(CONTROLLER, axiosInstance),
};
