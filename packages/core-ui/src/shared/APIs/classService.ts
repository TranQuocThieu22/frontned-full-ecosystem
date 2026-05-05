import { createBaseApi } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';
import { Class } from '../interfaces/Class';

const CONTROLLER = '/Class';

export const classService = {
    ...createBaseApi<Class>(CONTROLLER, axiosInstance),
};
