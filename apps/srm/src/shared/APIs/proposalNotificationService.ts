import { SRMProposalNotification } from '@/shared/interfaces/SRMProposalNotification';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/srm/SRMProposalNotification';

export const proposalNotificationService = {
  ...createBaseApi<SRMProposalNotification>(CONTROLLER, axiosInstance),
  getAllByAcademicYearAndType: (params: {
    academicYearId: number,
    Type: number,
  }) => {
    return axiosInstance.get<CustomApiResponse<SRMProposalNotification[]>>(CONTROLLER + '/GetAllByAcademicYearAndType', { params })
  },
  sendMailProposalNotification: (params: { SRMProposalNotificationId: number }) => {
    return axiosInstance.post(CONTROLLER + '/SendMailProposalNotification', {}, { params })
  }
};
