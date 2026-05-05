//Schedule List interfaces
export interface ICourseSectionSchedule {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedBy?: number;
    modifiedWhen?: Date;
    modifiedFullName?: string | null;

    subjectName?: string;
    courseSectionId?: number;
    addressId?: number;
    classPeriodStart?: number;
    classPeriodEnd?: number;
    startDate?: Date;
    endDate?: Date;
    timeClusterCode?: string;
    timeClusterName?: string;
    status?: any | null;
    lecturerReview?: any | null;
    totalMinute?: number;
    attendenceNumber?: number;

    courseSection?: ICourseSection;
    address?: IAddress;
    courseSectionScheduleLecturer?: ICourseSectionScheduleLecturer[];
}

export interface ICourseSection {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;

    quantityStudent?: number;
    quantityStudentActual?: number;
    courseTimeClusterId?: number;
    isScheduled?: boolean;
    status?: number;
    type?: number;
    examId?: number | null;
    certificateReviewBatchId?: number | null;
    exam?: any | null;
    courseTimeCluster?: ICourseTimeCluster;
    certificateReviewBatch?: any | null;
    roomPriority?: any[];
    courseSectionLecturer?: any | null;
}

export interface ICourseTimeCluster {
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
    timeCluster?: ITimeCluster;
    course?: any | null;
}

export interface ITimeCluster {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;

    timeTypeId?: number;
    timeClusterDetails?: any[];
}

export interface IAddress {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;

    location?: any | null;
    isInsiteSchool?: boolean | null;
    capacity?: number;
    testCapacity?: number;
    block?: string;
    roomTypeId?: number;
    branchId?: number;
    roomType?: any | null;
    branch?: any | null;
}

export interface ICourseSectionScheduleLecturer {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;

    userId?: number;
    courseSectionScheduleId?: number;
    user?: IUser;
}

export interface IUser {
    id?: number;
    isBlocked?: boolean;
    roleId?: number;
    code?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string;
    fullName?: string;
    gender?: number;
    dateOfBirth?: Date;
    educationLevel?: number;
    courseSectionStudentPoints?: any[];
}


//Attendance interfaces

export interface IStudentByCsScheduleId {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    modifiedBy?: number;
    modifiedWhen?: Date;
    modifiedFullName?: string | null;

    courseSectionScheduleId?: number;
    userId?: number;
    lecturerReview?: any | null;
    status?: number;

    user?: {
        id?: number;
        isBlocked?: boolean;
        roleId?: number;
        userName?: string;
        code?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        avatarPath?: string;
        fullName?: string;
        facultyId?: number;
        facultyName?: string;
        classId?: number | null;
        majorsId?: number | null;
        workingUnitId?: number | null;
        workingUnitName?: string | null;
        gender?: number | null;
        dateOfBirth?: string | null;
        educationLevel?: number | null;
        modifiedBy?: number;
        modifiedWhen?: string;
        roles?: {
            aqModuleId?: number | null;
            code?: string;
            name?: string;
            id?: number;
            createdWhen?: string | null;
            createdBy?: number | null;
            modifiedWhen?: string | null;
            modifiedBy?: number | null;
            concurrencyStamp?: string | null;
            isEnabled?: boolean;
        }[];
    };
}

export interface IStudentAttendanceUpdateModel {
    courseSectionScheduleId?: number;
    userId?: number;
    lecturerReview?: string | null;
    status?: number;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
}

export interface ICsScheduleUpdateModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    subjectName?: string;
    courseSectionId?: number;
    addressId?: number;
    classPeriodStart?: number;
    classPeriodEnd?: number;
    lecturerReview?: string;
    startDate?: Date;
    endDate?: Date;
    courseSectionScheduleLecturer?: {
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        userId?: number;
        courseSectionScheduleId?: number;
        user?: {
            id?: number;
            isBlocked?: boolean;
            roleId?: number;
            code?: string;
            email?: string;
            phoneNumber?: string;
            address?: string;
            avatarPath?: string;
            fullName?: string;
            gender?: number;
            dateOfBirth?: Date;
            educationLevel?: number;
            courseSectionStudentPoints?: {
                id?: number;
                code?: string;
                name?: string;
                concurrencyStamp?: string;
                isEnabled?: boolean;
                userId?: number;
                courseSectionId?: number;
                scoreConfigId?: number;
                point?: number;
            }[];
        };
    }[] | null;
}
