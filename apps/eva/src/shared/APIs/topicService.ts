import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ISubject } from "./subjectService";

const CONTROLLER = "/eva/Topic"

export const topicService = {
    ...createBaseApi<ITopic>(CONTROLLER, axiosInstance),
    GetTopicBySubjectId: ({ subjectId }: { subjectId?: number }) => {
        return axiosInstance.get<CustomApiResponse<ITopic[]>>(CONTROLLER + `/GetTopicBySubjectId?subjectId=${subjectId}`)
    }
};

export interface ITopic extends IBaseEntity {

    note?: string;
    evaSubjectId?: number;
    evaSubject?: ISubject
}

