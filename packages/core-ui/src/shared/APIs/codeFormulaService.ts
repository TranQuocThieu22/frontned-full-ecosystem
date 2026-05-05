import { CodeFormula } from '@aq-fe/core-ui/shared/interfaces/CodeFormula';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/CodeFormula';

export const codeFormulaService = {
  ...createBaseApi<CodeFormula>(CONTROLLER, axiosInstance),
  GenerateCodeByCodeFormula: (params: { operationType: number }) => {
    return axiosInstance.get<CustomApiResponse<string>>(
      CONTROLLER + `/GenerateCodeByCodeFormula`,
      { params }
    )
  }
};
