import { createBaseApi } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import axiosInstance from '@aq-fe/aq-legacy-framework/shared/configs/axiosInstance';
import { Class } from '@aq-fe/aq-legacy-framework/shared/interfaces/Class';

const CONTROLLER = '/Class';

export const classService = {
    ...createBaseApi<Class>(CONTROLLER, axiosInstance),
};
