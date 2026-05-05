import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { EmailTemplate } from '@aq-fe/core-ui/shared/interfaces/EmailTemplate';
import { EmailVariable } from '@aq-fe/core-ui/shared/interfaces/EmailVariable';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/EmailTemplate';

export const emailTemplateService = {
  ...createBaseApi<EmailTemplate>(`${CONTROLLER}`, axiosInstance),
  GetEmailVariables: (typeNumber?: number) => {
    return axiosInstance.get<CustomApiResponse<EmailVariable[]>>(
      CONTROLLER + `/GetEmailVariables?type=${typeNumber}`
    );
  },
};
