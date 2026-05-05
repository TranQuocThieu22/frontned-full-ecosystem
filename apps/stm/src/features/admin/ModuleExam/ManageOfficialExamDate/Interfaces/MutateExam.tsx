export interface IExamUpdateModel {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    programId?: number;
    examDate?: string;
    roomTypeId?: number;
    status?: number;
    startRegistrationDate?: string;
    endRegistrationDate?: string;
    maxStudent?: number;
    branchId?: number;
    skillCenterId?: number;
    officialExamDate?: string;
    classPeriod?: number;
    examCourses?: IExamCourseModel[];
}

interface IExamCourseModel {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    examId?: number;
    courseId?: number;
    quantity?: number;
    reserveQuantity?: number;
    status?: number;
}