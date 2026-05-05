import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMPublicationType";

export const publicationTypeService = {
    ...createBaseApi<SRMPublicationType>(CONTROLLER, axiosInstance),

    getSRMPublicationTypeBySRMPublicationId: (params: { SRMPublicationId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMPublicationType[]>>(`${CONTROLLER}/GetSRMPublicationTypeBySRMPublicationId`, {
            params: params
        })
    },

    getAllIsActive: () => {
        return axiosInstance.get<CustomApiResponse<SRMPublicationType[]>>(CONTROLLER + '/GetAllIsActive')

    }
};
