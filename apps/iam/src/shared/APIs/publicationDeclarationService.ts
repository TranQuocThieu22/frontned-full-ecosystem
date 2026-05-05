import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { SRMReviewPublicationRequestBody } from "@/shared/interfaces/SRMReviewPublicationRequestBody";
import { SRMScientificPublicationHours } from "@/shared/interfaces/SRMScientificPublicationHours";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMPublicationDeclaration";

export const publicationDeclarationService = {
    ...createBaseApi<SRMPublicationDeclaration>(CONTROLLER, axiosInstance),

    getScientificPublicationHours: (params: { AcademicYearId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMScientificPublicationHours[]>>(`${CONTROLLER}/GetScientificPublicationHours`, {
            params: params
        })
    },

    getAllByAcademicYear: (params: { AcademicYearId?: number, status?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMPublicationDeclaration[]>>(`${CONTROLLER}/GetAllByAcademicYear`, {
            params: params
        })
    },
    createPublicationDeclarations: (body: SRMPublicationDeclaration[]) => {
        return axiosInstance.post<CustomApiResponse<SRMPublicationDeclaration[]>>(CONTROLLER + '/CreatePublicationDeclarations', body)

    },

    scientificPublicationEvaluation(body: { academicYearId: number, srmDeclarationMembers: SRMDeclarationMember[] }) {
        return axiosInstance.post(`${CONTROLLER}/ScientificPublicationEvaluation`, body)
    },

    blockScientificPublicationHours(body: { academicYearId: number, srmDeclarationMembers: SRMDeclarationMember[] }) {
        return axiosInstance.post(`${CONTROLLER}/BlockScientificPublicationHours`, body)
    },

    unblockScientificPublicationHours(body: { academicYearId: number, srmDeclarationMembers: SRMDeclarationMember[] }) {
        return axiosInstance.post(`${CONTROLLER}/UnblockScientificPublicationHours`, body)
    },


    getSRMPublicationDeclarationById: (params: { SRMPublicationDeclarationId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMPublicationDeclaration>>(`${CONTROLLER}/getSRMPublicationDeclarationById`, {
            params: params
        })
    },

    reviewSRMPublicationDeclaration(body: SRMReviewPublicationRequestBody) {
        return axiosInstance.post(`${CONTROLLER}/ReviewSRMPublicationDeclaration`, body)
    },

};
