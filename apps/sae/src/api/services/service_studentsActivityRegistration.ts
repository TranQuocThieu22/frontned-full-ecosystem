import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { StudentEvent } from "@/interfaces/StudentEvent";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'StudentsActivityRegistration';

interface Params {
    eventId?: number
}

interface ParamGetByStudent {
    studentId?: number
    standardId?: number
}

export const service_studentsActivityRegistration = {
    ...createBaseApi<StudentEvent>(`${CONTROLLER}`, axiosInstance),

    // GetByEvent
    getByEvent: (params?: Params) => {
        return axiosInstance.get<CustomApiResponse<StudentEvent[]>>(`${CONTROLLER}/Getby?eventid=${params?.eventId}`);
    },

    // GetByStudent
    getByStudent: (params?: ParamGetByStudent) => {
        return axiosInstance.get<CustomApiResponse<StudentEvent[]>>(`${CONTROLLER}/GetByStudent`, {
            params
        });
    }
}
