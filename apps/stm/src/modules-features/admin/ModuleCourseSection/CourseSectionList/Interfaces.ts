export interface ICourseRegistrationViewModel {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    userId?: number;
    courseTimeClusterId?: number;
    courseSectionId?: number;
    receiptType?: number | null;
    receiptCode?: string | null;
    receiptPrice?: number | null;
    receiptLink?: string | null;
    receiptNote?: string | null;
    note?: string | null;
    isCheck?: boolean | null;
    totalPoint?: number | null
    isPass?: boolean | null;
}

export interface ICourseRegistrationInfoViewModel {
    userId?: number;
    courseTimeClusterId?: number;
    courseSectionId?: number | null;
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
        gender?: number;
        dateOfBirth?: string | null;
        educationLevel?: string | null;
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
    courseTimeCluster?: {
        courseId?: number;
        timeClusterId?: number;
        maxStudent?: number;
        timeCluster?: {
            timeTypeId?: number;
            timeClusterDetails?: any[];
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    courseSection?: any | null;
    receiptType?: 0,
    receiptCode?: string,
    receiptPrice?: 0,
    receiptLink?: string,
    receiptNote?: string,
    note?: string,
    isCheck?: true,
    totalPoint?: 0,
    isPass?: true,
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
}