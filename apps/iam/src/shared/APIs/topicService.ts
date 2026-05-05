import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { ITopicReviewPreliminary, SRMTopic } from "@/shared/interfaces/SRMTopic";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = '/srm/SRMTopic';

export const topicService = {
    ...createBaseApi<SRMTopic>(CONTROLLER, axiosInstance),
    getAllByAcademicYear: (params: { AcademicYearId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMTopic[]>>(CONTROLLER + '/GetAllByAcademicYear', { params })
    },
    GetAllByAcademicYearPassPreliminary: (params: { AcademicYearId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMTopic[]>>(CONTROLLER + '/GetAllByAcademicYearPassPreliminary', { params })
    },
    GetContractedTopic: (params: { AcademicYearId: number }) => {
        return axiosInstance.post<CustomApiResponse<SRMTopic[]>>(CONTROLLER + '/GetContractedTopic', {}, { params })
    },
    ReviewSRMTopic: (body: ITopicReviewPreliminary) => {
        return axiosInstance.post<CustomApiResponse<ITopicReviewPreliminary[]>>(CONTROLLER + '/ReviewSRMTopic', body)
    },
    /** Lấy danh sách đề tài đánh giá */
    getEvaluationTopic: (params: { type: number, academicYearId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMEvaluationTopic[]>>(CONTROLLER + '/GetEvaluationTopic', { params })
    },
    createOrUpdateEvaluationTopic: (data: SRMEvaluationTopic) => {
        return axiosInstance.post<CustomApiResponse<SRMEvaluationTopic>>(CONTROLLER + '/CreateOrUpdateEvaluationTopic', data)
    },
    /** Lấy bộ kết luận từ topicId */
    getConlusion: (params: { type: number, topicId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMConclusion[]>>(CONTROLLER + '/GetConlusion', { params })
    },
    /** Lấy chi tiết đề tài */
    getTopicDetail: (params: { type: number, topicId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMEvaluationTopic>>(CONTROLLER + '/GetTopicDetail', { params })
    },
    /** Update file của đề tài */
    UpdateAttachment: (body: any) => {
        return axiosInstance.post<CustomApiResponse<SRMTopic[]>>(CONTROLLER + '/UpdateAttachment', body)
    },
}
