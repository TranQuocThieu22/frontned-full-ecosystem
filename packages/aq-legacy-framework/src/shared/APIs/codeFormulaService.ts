import { CodeFormula } from '@aq-fe/aq-legacy-framework/shared/interfaces/CodeFormula';
import { createBaseApi, CustomApiResponse } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import axiosInstance from '@aq-fe/aq-legacy-framework/shared/configs/axiosInstance';

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
