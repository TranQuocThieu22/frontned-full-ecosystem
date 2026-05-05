import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CodeFormula } from "@/interfaces/codeFormula";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'CodeFormula'

export const service_codeFormula = {
    ...createBaseApi<CodeFormula>(`${CONTROLLER}`, axiosInstance),

    getCodeFormulaByType: (params?: { operationType?: number }) => {
        return axiosInstance.get<CustomApiResponse<string>>(`${CONTROLLER}/GetCodeFormulaByType`, { params: params });
    },
    GenerateCodeByCodeFormula: (params?: { operationType?: number }) => {
        return axiosInstance.get<CustomApiResponse<string>>(`${CONTROLLER}/GenerateCodeByCodeFormula`, { params: params });
    },
}
