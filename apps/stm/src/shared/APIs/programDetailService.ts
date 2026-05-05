import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { ScoreConfigs } from "@/shared/interfaces/scoreConfigs";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface ProgramDetailResponse extends BaseEntity {
  scoreConfigs?: ScoreConfigs[];
}

const CONTROLLER = "/Program";

export const programDetailService = {
  getDetail: ({ params = "" }: { params?: string }) =>
    axiosInstance.get<CustomApiResponse<ProgramDetailResponse>>(
      CONTROLLER + "/ProgramDetail" + params,
    ),
};

