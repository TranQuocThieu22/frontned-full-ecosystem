import { AQDataSynchronizationService } from "@aq-fe/aq-legacy-framework/shared/APIs/AQDataSynchronizationService";
import { BaseEntity } from "./BaseEntity";

export interface SyncBatchHistory extends BaseEntity {
    updateCount?: number
    createCount?: number
    tableType?: syncBatchHistoryTableTypeEnum

    isMissing?: boolean // Frontend tự handle
}

export enum syncBatchHistoryTableTypeEnum {
    EduDegreeLevelTemp = 1,
    EducationLevelTemp = 2,
    EducationSystemTemp = 3,
    EduRegulationTemp = 4,
    EduUnitTemp = 5,
    EduMajorTemp = 6,
    EduFieldOfStudyTemp = 7,
    EduSubjectTemp = 8,
    EduActivityPlanTemp = 9,
    EduTraningProgramTemp = 10,
    EduClassTemp = 11,
    EduStudentTemp = 12,
    EduLecturerTemp = 13,
    EduManagerTemp = 14,
    EduScoreTransformTemp = 15,
    EduCourseSectionTemp = 16,
    EduEnrollmentTemp = 17,
    EduClassSemesterTemp = 18,
    EduStudentFullTemp = 19,
    EduProgramSubject = 20
}

export const syncBatchHistoryTableTypeLabel: Partial<Record<syncBatchHistoryTableTypeEnum, string>> = {
    [syncBatchHistoryTableTypeEnum.EduDegreeLevelTemp]: "Danh mục bậc hệ",
    [syncBatchHistoryTableTypeEnum.EducationLevelTemp]: "Danh mục bậc đào tạo",
    [syncBatchHistoryTableTypeEnum.EducationSystemTemp]: "Danh mục hệ đào tạo",
    [syncBatchHistoryTableTypeEnum.EduRegulationTemp]: "Danh mục quy chế",
    [syncBatchHistoryTableTypeEnum.EduMajorTemp]: "Danh mục chương trình",
    [syncBatchHistoryTableTypeEnum.EduFieldOfStudyTemp]: "Danh mục khóa",
    [syncBatchHistoryTableTypeEnum.EduSubjectTemp]: "Danh mục môn học",
    [syncBatchHistoryTableTypeEnum.EduClassTemp]: "Danh mục lớp",
    [syncBatchHistoryTableTypeEnum.EduUnitTemp]: "Danh mục đơn vị (khoa)",
    [syncBatchHistoryTableTypeEnum.EduLecturerTemp]: "Danh mục nhân sự",
    [syncBatchHistoryTableTypeEnum.EduStudentFullTemp]: "Danh mục sinh viên",
};


export const syncBatchHistoryTableTypeApi: Partial<Record<syncBatchHistoryTableTypeEnum, () => Promise<any>>> = {
    [syncBatchHistoryTableTypeEnum.EduDegreeLevelTemp]: () => AQDataSynchronizationService.AQDataDegreeLevel(),
    [syncBatchHistoryTableTypeEnum.EducationLevelTemp]: () => AQDataSynchronizationService.AQDataEducationLevel(),
    [syncBatchHistoryTableTypeEnum.EducationSystemTemp]: () => AQDataSynchronizationService.AQDataSystem(),
    [syncBatchHistoryTableTypeEnum.EduRegulationTemp]: () => AQDataSynchronizationService.AQDataRegulation(),
    [syncBatchHistoryTableTypeEnum.EduMajorTemp]: () => AQDataSynchronizationService.AQDataMajor(),
    [syncBatchHistoryTableTypeEnum.EduFieldOfStudyTemp]: () => AQDataSynchronizationService.AQDataFieldOfStudy(),
    [syncBatchHistoryTableTypeEnum.EduSubjectTemp]: () => AQDataSynchronizationService.AQDataSubject(),
    [syncBatchHistoryTableTypeEnum.EduClassTemp]: () => AQDataSynchronizationService.AQDataClass(),
    [syncBatchHistoryTableTypeEnum.EduUnitTemp]: () => AQDataSynchronizationService.AQDataAQDataUnit(),
    [syncBatchHistoryTableTypeEnum.EduLecturerTemp]: () => AQDataSynchronizationService.AQDataLecturer(),
    [syncBatchHistoryTableTypeEnum.EduStudentFullTemp]: () => AQDataSynchronizationService.AQDataStudentFull(),
};

