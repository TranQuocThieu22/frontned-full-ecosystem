import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";

;

const CONTROLLER = 'CourseTimeCluster'

export const service_courseTimeCluster = {
    ...createBaseApi(`${CONTROLLER}`, axiosInstance),
}
