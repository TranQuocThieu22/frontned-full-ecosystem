export interface ICourseSectionViewModel {
    id: number;
    code: string;
    name: string;
    courseId: number;
    timeClusterId: number;
    quantityStudent: number;
    quantityStudentActual: number;
    courseTimeClusterId: number;
    isScheduled: boolean;
    status: any;
    type: any;
    course: ICourse;
    timeCluster: ITimeCluster;
    roomPriority: IRoomPriority[];
    courseSectionLecturer: ICourseSectionLecturer[];
    concurrencyStamp: string;
    isEnabled: boolean;
}

// Supporting interfaces
interface ICourse {
    id: number;
    code: string;
    name: string;
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string;
    price: number;
    branchId: number;
    skillCenterId: number;
    program: IProgram;
    courseTimeClusters: ICourseTimeCluster[];
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IProgram {
    id: number;
    code: string;
    name: string;
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
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ITimeCluster {
    id: number;
    code: string;
    name: string;
    timeTypeId: number;
    timeClusterDetails: any[];
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseTimeCluster {
    id: number;
    code: string | null;
    name: string | null;
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    courseSectionNumberTotal: number;
    courseSectionNumber: number;
    timeCluster: ITimeCluster;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IRoomPriority {
    id: number;
    code: string;
    name: string;
    addressId: number;
    courseSectionId: number;
    address: IAddress;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IAddress {
    id: number;
    code: string;
    name: string;
    location: any;
    isInsiteSchool: any;
    capacity: number;
    testCapacity: number;
    block: string;
    roomTypeId: number;
    branchId: number;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseSectionLecturer {
    id: number;
    code: string;
    name: string;
    userId: number;
    courseId: number | null;
    user: IUser;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IUser {
    id: number;
    userName: string;
    code: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatarPath: string;
    fullName: string;
    isBlocked: boolean;
    roleId: number;
    facultyId: any;
    facultyName: any;
    classId: any;
    majorsId: any;
    workingUnitId: any;
    workingUnitName: any;
    gender: number;
    dateOfBirth: string;
    educationLevel: number;
    modifiedBy: number;
    modifiedWhen: string;
    roles: IRole[];
}

interface IRole {
    id: number;
    aqModuleId: number;
    code: string;
    name: string;
    createdWhen: any;
    createdBy: any;
    modifiedWhen: any;
    modifiedBy: any;
    concurrencyStamp: any;
    isEnabled: boolean;
}
