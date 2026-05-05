import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IAQFileDetail } from "aq-fe-framework/utils";

const CONTROLLER = "/AQ";

export const aqService = {
    getFile: (filePath: string) =>
        axiosInstance.get<CustomApiResponse<IAQFileDetail>>(
            CONTROLLER + `/GetFile?filePath=` + filePath
        ),
};
