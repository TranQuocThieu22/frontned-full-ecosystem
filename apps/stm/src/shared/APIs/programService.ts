import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { Program } from "@/shared/interfaces/program";

const CONTROLLER = "/Program";

/** Body gửi lên API ProgramScoreConfig (cấu hình điểm chương trình) */
export interface ProgramScoreConfigBody {
  programId: number;
  scoreSystem: number;
  scoreFormula: number;
  scorePass: number;
  testScoreSystem?: number | null;
  testScoreFormula?: number | null;
  testScorePass?: number | null;
  scoreConfigs: Array<{
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    programId?: number;
    scoreType?: number;
    percentScore?: number;
    scoreMax?: number;
    scoreMin?: number;
  }>;
}

export const programService = {
  ...createBaseApi<Program>(CONTROLLER, axiosInstance),
  saveProgramScoreConfig: (body: ProgramScoreConfigBody) =>
    axiosInstance.post<CustomApiResponse<Program>>(CONTROLLER + "/ProgramScoreConfig", body),
};

