import {
    AcademicYear,
    AcademicYearStateEnum
} from "@/shared/interfaces/AcademicYear";
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse";
import { createBaseAPI } from "@aq-fe/aq-core-framework/shared/libs/createBaseAPI";
import axiosInstance from "../configs/axiosInstance";

const CONTROLLER = "/academicYear";

/**
 * API response shape for criteria from academic year framework.
 * level=1 → Điều (parent), level=2 → tiêu chí con
 */
export interface ScoreFrameworkCriterion {
    id: string;
    code: string;
    name: string;
    level: number;
    maxScore: number;
    parentId: string | null;
    orderIndex: number;
    order?: number;
}

export const academicYearService = {
    ...createBaseAPI<AcademicYear>(CONTROLLER, axiosInstance),
    getAll: ({ tenantId, ...rest }: { tenantId?: string, state?: AcademicYearStateEnum, CodeOrName?: string, PageNumber?: number, PageSize?: number }) => {
        return axiosInstance.get<CustomAPIResponse<AcademicYear[]>>(`${CONTROLLER}/${tenantId}`, { params: rest });
    },
    activeAcademicYear: () => {
        return axiosInstance.post<CustomAPIResponse<AcademicYear[]>>(`${CONTROLLER}/active`)
    },
    getCriterias: (TenantId: string, AcademicYearId: string) => {
        return axiosInstance.get<CustomAPIResponse<ScoreFrameworkCriterion[]>>(
            `${CONTROLLER}/${TenantId}/${AcademicYearId}/criterias`
        );
    },
};
