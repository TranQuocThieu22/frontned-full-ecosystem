
import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMConclusion"

export const conclusionService = {
    ...createBaseApi<SRMConclusionSet>(CONTROLLER, axiosInstance),
}

