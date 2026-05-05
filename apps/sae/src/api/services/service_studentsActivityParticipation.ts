import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { StudentpaticipanThroughQRParams } from "@/interfaces/studentsActivityParticipation";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'StudentsActivityParticipation';


export const service_studentsActivityParticipation = {
    ...createBaseApi<StudentEvent>(`${CONTROLLER}`, axiosInstance),

    // GetBy
    getBy: (params?: string) => {
        return axiosInstance.get<CustomApiResponse<StudentEvent[]>>(`${CONTROLLER}/Getby${params}`);
    },

    // StudentpaticipationThroughQR
    getStudentpaticipanThroughQR: (params: StudentpaticipanThroughQRParams) => {
        return axiosInstance.post<CustomApiResponse<any>>(
            `${CONTROLLER}/StudentpaticipationThroughQR?eventId=${params.eventId}&qrTime=${params.qrTime}`
        );
    },

    getByLeturer: (params: GetByLeturerParams) => {
        return axiosInstance.get<CustomApiResponse<StudentEvent[]>>(`${CONTROLLER}/GetByLeturer`, {
            params: {
                ...params,
                cols: 'Class'
            }
        });
    },

    getBySubLeturer: (params: GetByLeturerParams) => {
        return axiosInstance.get<CustomApiResponse<StudentEvent[]>>(`${CONTROLLER}/getBySubLeturer`, {
            params: {
                ...params,
                cols: 'Class'
            }
        });
    },
    AQScoreTransform: (params: AQScoreTransformViewModel) => {
        return axiosInstance.post<CustomApiResponse<StudentEvent[]>>(
            `${CONTROLLER}/AQScoreTransform`,
            null,  // Empty body
            { params }  // Query parameters
        );
    },
}

interface GetByLeturerParams {
    eventId: number;
    classId?: number;
}

interface AQScoreTransformViewModel {
    activityplanCode?: string
    faculyAQIds?: string[]
}
