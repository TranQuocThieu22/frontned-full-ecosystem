import { COECLO, COECLOImport } from "@/interfaces/shared-interfaces/COECLO";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COECLO"

export const service_COECLO = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COECLO>(CONTROLLER, baseAxios),
    getCLOBygradeSubjectId: ({ gradeSubjectId }: { gradeSubjectId?: number | string }) => {
        return baseAxios.get<CustomApiResponse<COECLO[]>>(CONTROLLER + "/GetCLOBygradeSubjectId", {
            params: {
                gradeSubjectId: gradeSubjectId
            }
        })
    },
    getSource: ({ COEGradeSubjectId }: { COEGradeSubjectId?: number | string }) => {
        return baseAxios.get<CustomApiResponse<COECLO[]>>(CONTROLLER + "/GetSource", {
            params: {
                COEGradeSubjectId: COEGradeSubjectId
            }
        })
    },
    importCLOByCode: (body: COECLOImport[]) => {
        return baseAxios.post<CustomApiResponse<COECLO[]>>(CONTROLLER + "/Import", body)
    },
}

