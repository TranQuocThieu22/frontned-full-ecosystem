import { IEmailVariable } from '@/interfaces/IEmailVariable';
import baseAxios from '@/shared/config/baseAxios';
import { createBaseApi } from '@/shared/lib/createBaseApi';

const CONTROLLER = 'EmailVariable';

export const emailVariableService = {
  ...createBaseApi<IEmailVariable>(`${CONTROLLER}`, baseAxios),
};
