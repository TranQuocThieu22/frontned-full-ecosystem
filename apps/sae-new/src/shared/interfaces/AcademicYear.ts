import { BaseEntity } from "./BaseEntity";
import { ScoreFrameworkVersion } from "./ScoreFrameworkVersion";
import { Semester } from "./Semester";

/**
 * Criterion — Tiêu chí ĐRL
 * Endpoint: GET /api/academicyear/{tenantId}/{id}/criterias
 */
export interface Criterion {
    id?: string;
    code?: string | null;
    name?: string | null;
    maxScore?: number | null;
    orderIndex?: number | null;
    order?: number | null;
    parentId?: string | null;
}

export interface AcademicYear extends BaseEntity {
    state?: AcademicYearStateEnum;
    scoreFrameworkVersionId?: string;
    scoreFrameworkVersion?: ScoreFrameworkVersion;
    semesters?: Semester[];
    semesterCount?: number;
    criterias?: Criterion[];
}

export enum AcademicYearStateEnum {
    Draft = 1,
    Active = 2,
    Inactive = 3,
    Archived = 4,
}

export const AcademicYearStateLabel: Record<AcademicYearStateEnum, string> = {
    [AcademicYearStateEnum.Draft]: "Nháp",
    [AcademicYearStateEnum.Active]: "Đang hiện hành",
    [AcademicYearStateEnum.Inactive]: "Ngừng hoạt động",
    [AcademicYearStateEnum.Archived]: "Đã lưu trữ",
};



export const AcademicYearStateColor: Record<AcademicYearStateEnum, string> = {
    [AcademicYearStateEnum.Draft]: "orange",
    [AcademicYearStateEnum.Active]: "teal",
    [AcademicYearStateEnum.Inactive]: "red",
    [AcademicYearStateEnum.Archived]: "gray",
};
