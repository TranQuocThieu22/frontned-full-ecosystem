import { SRMProposalApproval } from "@/shared/interfaces/SRMProposalApproval";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMProposalApproval";

export const proposalApprovalService = {
    ...createBaseApi<SRMProposalApproval>(CONTROLLER, axiosInstance),

    getAllByAcademicYear: (params: { academicYear?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMProposalApproval[]>>(`${CONTROLLER}/GetAllByAcademicYear`, {
            params: params
        })
    },
};
