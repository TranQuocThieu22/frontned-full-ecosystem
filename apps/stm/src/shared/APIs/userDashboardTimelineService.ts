import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

export interface UserDashboardTimelineEvent {
  eventDate?: string;
  eventType?: number;
  eventDescription?: string;
}

const CONTROLLER = "/UserDashboard";

export const userDashboardTimelineService = {
  getUserTimeline: ({ params = "" }: { params?: string }) =>
    axiosInstance.get<CustomApiResponse<UserDashboardTimelineEvent[]>>(
      CONTROLLER + "/GetUserTimeline" + params,
    ),
};

