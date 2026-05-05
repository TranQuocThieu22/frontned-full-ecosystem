import { IRule } from '@/shared/interfaces/rule/IRule';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = 'eaq/EAQRule';

// https://drive.google.com/file/d/1k9OvN4PHvoaRg6N_hri5MXikx-j4mBd1/view?usp=drive_link
export const service_EAQRule = {
  ...createBaseApi<IRule>(CONTROLLER, axiosInstance),
};
