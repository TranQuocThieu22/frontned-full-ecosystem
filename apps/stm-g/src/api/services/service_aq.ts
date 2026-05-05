import { MyApiResponse } from "aq-fe-framework/shared";
import { IAQFileDetail } from "aq-fe-framework/utils";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/AQ"

export const service_aq = {
    getFile: (filePath: string) => {
        return baseAxios.get<MyApiResponse<IAQFileDetail>>(CONTROLLER + `/GetFile?filePath=` + filePath)
    },
}


