import { IEmailVariable } from '@/interfaces';
import { IEmailTemplate } from '@/interfaces/IEmailTemplate';
import baseAxios from '@/shared/config/baseAxios';
import { createBaseApi, MyApiResponse } from '@/shared/lib/createBaseApi';

const CONTROLLER = '/EmailTemplate';

export const emailTemplateService = {
  ...createBaseApi<IEmailTemplate>(`${CONTROLLER}`, baseAxios),
  GetEmailVariables: (typeNumber?: number) => {
    return baseAxios.get<MyApiResponse<IEmailVariable[]>>(
      CONTROLLER + `/GetEmailVariables?type=${typeNumber}`
    );
  },
};
