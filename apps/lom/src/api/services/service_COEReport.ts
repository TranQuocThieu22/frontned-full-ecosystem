import { Account } from "@/interfaces/shared-interfaces/Account";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEReport";

export const service_COEReport = {
    ...createBaseApi(CONTROLLER, baseAxios),
    getDashboardReport: (coecoeSemesterId: number) => {
        return baseAxios.get<CustomApiResponse<ICOEReportRes>>(CONTROLLER + `/Dashboard?coeSemesterId=${coecoeSemesterId}`);
    },


};

export interface ICOEStudentInfoRes extends Account {
    className?: string;
    coeGradeName?: string;
    coeGradeId?: number;
    coeProgramName?: string;
    coeProgramId?: number;
}

export interface ICOEReportRes {
    facultyQuantity?: number;
    programQuantity?: number;
    gradeQuantity?: number;
    studentQuantity?: number;
    studentUnPassedCLO?: number;
    studentOfSemester?: number;
    unitGrades?: IUnitGrade[];
    coeGradeInfos?: ICOEGradeInfo[];
}

export interface IUnitGrade {
    programQuantity?: number;
    programGrade?: number;
    programGradeActive?: number;
}

export interface ICOEGradeInfo {
    GradeName?: string;
    PLOQuantity?: number;
    PIQuantity?: number;
    gradeSubject?: number;
    coreGradeSubject?: number;
}
