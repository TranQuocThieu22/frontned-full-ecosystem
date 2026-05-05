import { CommonNotification } from "@/interfaces/commonNotification"
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/CommonNotification"

export const service_commonNotification = {
  ...createBaseApi<CommonNotification>(CONTROLLLER, axiosInstance),

  //CommonNotificationGetList
  commonNotificationGetList: async () => {
    return axiosInstance.get<CustomApiResponse<CommonNotification[]>>(`${CONTROLLLER}/CommonNotificationGetList`)
  },
  // SendMailNotification
  sendMailNotification: async (commonNotificationId: number) => {
    return axiosInstance.post<CustomApiResponse<CommonNotification>>(`${CONTROLLLER}/SendMailNotification?CommonNotificationId=${commonNotificationId}`)
  }

}
