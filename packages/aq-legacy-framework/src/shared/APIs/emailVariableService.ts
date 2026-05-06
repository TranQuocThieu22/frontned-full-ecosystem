import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { EmailVariable } from '@aq-fe/aq-legacy-framework/shared/interfaces/EmailVariable';
import { createBaseApi } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';

const CONTROLLER = 'EmailVariable';

export const emailVariableService = {
  ...createBaseApi<EmailVariable>(`${CONTROLLER}`, axiosInstance),
};
