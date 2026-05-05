import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { EmailVariable } from '@aq-fe/core-ui/shared/interfaces/EmailVariable';
import { createBaseApi } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = 'EmailVariable';

export const emailVariableService = {
  ...createBaseApi<EmailVariable>(`${CONTROLLER}`, axiosInstance),
};
