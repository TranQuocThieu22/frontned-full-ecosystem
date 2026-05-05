
export interface IExam {
    programId?: number;
    examDate?: Date;
    roomTypeId?: number | null;
    status?: number;
    startRegistrationDate?: string;
    endRegistrationDate?: string;
    maxStudent?: number;
    branchId?: number;
    skillCenterId?: number;
    courseSectionNumberTotal?: number;
    courseSectionNumber?: number;
    officialExamDate?: Date;
    classPeriod?: number | null;
    examCourses?: any[];
    program?: {
        skillCenterId: number;
        programTypeId: number;
        totalClassPeriodNumber: number;
        totalHours: number;
        isTesting: boolean;
        certificateId: number;
        isCancel: boolean;
        note: string;
        price: number;
        scoreSystem: number;
        scoreFormula: number;
        scorePass: number;
        testScoreSystem: number | null;
        testScoreFormula: number | null;
        testScorePass: number | null;
        certificate: any | null;
        skillCenter: any | null;
        subjects: any | null;
        programType: any | null;
        programSubjects: any[];
        scoreConfigs: any | null;
        id: number;
        code: string;
        name: string;
        concurrencyStamp: string;
        isEnabled: boolean;
    };
    branch?: any | null;
    skillCenter?: any | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface IHoliday {
    id?: number;
    note?: string;
    date?: Date;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}