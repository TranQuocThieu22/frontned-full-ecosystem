import { RoomType } from "@/shared/interfaces/roomType";

export interface IExamCourse {
    examId: number;
    courseId: number;
    courseName: string;
    courseCode: string;
    courseTestDate: string;
    courseStatus: number;
    programName: string;
    quantity: number;
    reserveQuantity: number;
    status: number;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface IExam {
    programId?: number;
    examDate?: string;
    roomTypeId?: number | null;
    status?: number;
    startRegistrationDate?: string | Date;
    endRegistrationDate?: string | Date;
    maxStudent?: number;
    branchId?: number;
    skillCenterId?: number;
    courseSectionNumberTotal?: number; //số lượng học viên đăng ký
    courseSectionNumber?: number; //số lượng học viên chia theo lớp
    officialExamDate?: Date | null;
    classPeriod?: number | null;
    image?: string | null,
    description?: string | null,
    examCourses?: IExamCourse[] | null;
    certificateReviewBatchId?: number | null;
    program?: {
        skillCenterId?: number;
        programTypeId?: number;
        totalClassPeriodNumber?: number;
        totalHours?: number;
        isTesting?: boolean;
        certificateId?: number;
        isCancel?: boolean;
        note?: string;
        price?: number;
        scoreSystem?: number;
        scoreFormula?: number;
        scorePass?: number;
        testScoreSystem?: number | null;
        testScoreFormula?: number | null;
        testScorePass?: number | null;
        certificate?: any | null;
        skillCenter?: any | null;
        subjects?: any | null;
        programType?: any | null;
        programSubjects?: any[] | null;
        scoreConfigs?: any[] | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    branch?: any | null;
    roomType?: RoomType | null;
    skillCenter?: any | null;
    certificateReviewBatch?: any | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}