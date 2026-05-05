import { SRMPostType } from "@/shared/interfaces/SRMPostType";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMPostType";

export const postTypeService = {
  ...createBaseApi<SRMPostType>(CONTROLLER, axiosInstance),

};
