import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { COEProgram } from "@aq-fe/core-ui/shared/interfaces/COEProgram";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEProgram"

export const service_COEProgram = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEProgram>(CONTROLLER, baseAxios),

    importDelegations: (body: COEProgramDelegationViewModel[]) => {
        return baseAxios.post<CustomApiResponse<any>>(CONTROLLER + "/ImportDelegations", body);
    },

    removeDelegations: (body: number[]) => {
        return baseAxios.post<CustomApiResponse<any>>(CONTROLLER + "/RemoveDelegations", body);
    }
}

export interface COEProgramDelegationViewModel {
    COEProgramCode?: string;
    lecturerCode?: string;
}