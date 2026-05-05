export interface IPreliminaryCheckOfRawDeliverables {
    id: number;
    lessonCode: string;
    lessonName: string;
    chiefCompiler: string;
    rawProductSubmittedFile: string;
    actualSubmissionDate: string;
    lessonStatusBeforeCheck: string;
    preliminaryApprovalStatus: string;
    approvalComments: string;
    hasNotificationSent: boolean;
    preliminaryCheckDate: string;
    checkerStaffName: string;
    isNull: boolean;
}