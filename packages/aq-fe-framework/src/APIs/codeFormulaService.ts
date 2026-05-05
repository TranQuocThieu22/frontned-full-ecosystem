import { ICodeFormula } from '@/interfaces/ICodeFormula';
import { createBaseApi } from '@/shared/lib/createBaseApi';
import baseAxios from '../shared/config/baseAxios';

const CONTROLLER = '/CodeFormula';

export const codeFormulaService = {
  ...createBaseApi<ICodeFormula>(CONTROLLER, baseAxios),
};
