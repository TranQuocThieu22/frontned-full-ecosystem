export interface IExamSection {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    quantityStudent?: number;
    quantityStudentActual?: number;
    courseTimeClusterId?: number | null;
    isScheduled?: boolean;
    status?: any | null;
    type?: number;
    examId?: number;
    exam?: Exam | null;
    courseTimeCluster?: any | null;
    roomPriority?: IRoomPriority[];
    courseSectionLecturer?: any[];
}

export interface Exam {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    programId?: number;
    examDate?: Date;
    roomTypeId?: number;
    status?: number;
    startRegistrationDate?: Date;
    endRegistrationDate?: Date;
    maxStudent?: number;
    branchId?: number;
    skillCenterId?: number;
    courseSectionNumberTotal?: number;
    courseSectionNumber?: number;
    officialExamDate?: Date;
    classPeriod?: number;
    examCourses?: any | null;
    program?: any | null;
    branch?: any | null;
    skillCenter?: any | null;
}

export interface IRoomPriority {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    addressId?: number;
    courseSectionId?: number;
    address?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        location?: null;
        isInsiteSchool?: null;
        capacity?: number;
        testCapacity?: number;
        block?: string;
        roomTypeId?: number;
        branchId?: number;
        roomType?: any | null;
        branch?: any | null;
    };
}

export interface IAddress {
    location?: null;
    isInsiteSchool?: null;
    capacity?: number;
    testCapacity?: number;
    block?: string;
    roomTypeId?: number;
    branchId?: number;
    roomType?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        note?: string | null;
    } | null;
    branch?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        location?: string;
        note?: string;
        skillCenterId?: number | null;
        skillCenter?: any | null;
    } | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}


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
    startHour?: Date;
    minuteNumber?: number;
    isStartTest?: boolean | null;
}
