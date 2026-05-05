//Create Exam Interfaces
export interface IExamCreateModel {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    programId?: number | null;
    examDate?: Date;
    roomTypeId?: number | null;
    status?: number;
    startRegistrationDate?: Date;
    endRegistrationDate?: Date;
    maxStudent?: number;
    branchId?: number | null;
    skillCenterId?: number | null;
    officialExamDate?: Date | null;
    classPeriod?: number | null,
    image?: string | null,
    description?: string | null,
    examCourses?: IExamCourse[];
    fileDetail?: {
        fileName?: string | null,
        fileExtension?: string | null,
        fileBase64String?: string | null
    }
}
export interface IExamCourse {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    examId?: number;
    courseId?: number;
    quantity?: number;
    reserveQuantity?: number;
    status?: number;
}

//Select Interfaces
export interface ISkillCenter {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    note?: string;
    branch?: IBranch[];
    program?: IProgram[];
}
export interface IBranch {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    note?: string;
    branch?: IBranch[];
    program?: IProgram[];
}
export interface IProgram {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    skillCenterId?: number;
    programTypeId?: number;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    isTesting?: boolean;
    certificateId?: number;
    isCancel?: boolean;
    note?: string;
    price?: number | null;
    certificate?: any | null;
    skillCenter?: any | null;
    subjects?: any | null;
    programType?: any | null;
}


//Time cluster selection interfaces
export interface ITimeCluster {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeTypeId?: number;
    timeType?: ITimeType;
    maxStudent?: number;
    timeClusterDetails?: ITimeClusterDetail[];
}
export interface ITimeClusterDetail {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeClusterId?: number;
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
    classPeriodStart?: number;
    classPeriodEnd?: number;
}

//Time Type Interfaces
export interface ITimeType {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    classPeriodMorning?: number;
    classPeriodAfternoon?: number;
    classPeriodEvening?: number;
    timeTypeDetails?: ITimeTypeDetail[];
}

export interface ITimeTypeDetail {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeTypeId?: number;
    order?: number;
    startHour?: string;
    minuteNumber?: number;
}

// Course Interface
export interface ICourse {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    status?: number;
    programId?: number;
    startDateRegistration?: string | Date;
    endDateRegistration?: string | Date;
    testDate?: string | Date;
    studyDate?: string | Date;
    endDate?: string | Date;
    price?: number;
    branchId?: number;
    skillCenterId?: number;
    skillCenter?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        note?: string;
    };
    branch?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        location?: string;
        note?: string;
        skillCenterId?: number;
        skillCenter?: {
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            note?: string;
        };
    };
    program?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
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
        skillCenter?: {
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            note?: string;
        };
        subjects?: any | null;
        programType?: {
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
        programSubjects?: any[];
        scoreConfigs?: any | null;
    };
    courseTimeClusters?: {
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        courseId?: number;
        timeClusterId?: number;
        maxStudent?: number;
        courseSectionNumberTotal?: number;
        courseSectionNumber?: number;
        timeCluster?: {
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            timeTypeId?: number;
            timeClusterDetails?: {
                id?: number;
                code?: string | null;
                name?: string | null;
                concurrencyStamp?: string;
                isEnabled?: boolean;
                timeClusterId?: number;
                dayOfWeek?: number;
                startTime?: string;
                endTime?: string;
                classPeriodStart?: number;
                classPeriodEnd?: number;
            }[];
        };
    }[];
}


//Update Exam Interfaces
export interface IExamUpdateModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    programId?: number | null;
    examDate?: Date;
    roomTypeId?: number | null;
    status?: number;
    startRegistrationDate?: Date;
    endRegistrationDate?: Date;
    maxStudent?: number;
    branchId?: number | null;
    skillCenterId?: number | null;
    officialExamDate: Date | null;
    classPeriod?: number | null,
    image?: string | null,
    description?: string | null,
    examCourses?: IExamCourse[] | null;
    fileDetail?: {
        fileName?: string | null,
        fileExtension?: string | null,
        fileBase64String?: string | null
    }
}
