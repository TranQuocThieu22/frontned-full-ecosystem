import { IComment } from "@/shared/interfaces/comment/IComment";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = "/eaq/EAQComment"

export interface getCommentsByTaskDetailIdBody {
    eaqTaskDetailIds: number[];
    isExternal?: boolean;
}

export const service_EAQComment = {
    ...createBaseApi<IComment>(CONTROLLER, axiosInstance),
    findbySelfAssessmentId: (eaqSelfAssessmentId?: number) => {
        return axiosInstance.get<CustomApiResponse<IComment[]>>(
            CONTROLLER + '/FindbySelfAssessmentId',
            {
                params: {
                    eaqSelfAssessmentId: eaqSelfAssessmentId
                }
            }
        );
    },

    GetCommentsByEAQTaskDetailIds: ({ eaqTaskDetailIds, isExternal }: { eaqTaskDetailIds?: string[], isExternal?: boolean }) => {
        return axiosInstance.post<CustomApiResponse<IComment[]>>(
            CONTROLLER + '/GetCommentsByEAQTaskDetailIds',
            {
                eaqTaskDetailIds: eaqTaskDetailIds,
                isExternal: isExternal
            }
        );
    },
    getCommentsByTaskDetailIds: (body: getCommentsByTaskDetailIdBody) => {
        return axiosInstance.post<CustomApiResponse<IComment[]>>(
            CONTROLLER + '/GetCommentsByEAQTaskDetailIds',
            {
                eaqTaskDetailIds: body.eaqTaskDetailIds,
                isExternal: body.isExternal
            }
        );
    }
}
