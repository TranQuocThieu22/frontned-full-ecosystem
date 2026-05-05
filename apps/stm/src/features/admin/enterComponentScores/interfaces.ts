export interface IClassScoreEntry {
    id?: number;
    code?: string;
    courseTimeCluster: ICourseTimeCluster;
    courseSectionLecturer?: CourseSectionLecturer[];
}

export interface CourseSectionLecturer {
    userId: number;
    courseId: number | null;
    user: any | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICourse {
    status: number;
    programId: number;
    id: number;
    code: string;
    name: string;
    isEnabled: boolean;
}

export interface ITimeCluster {
    timeTypeId?: number;
    timeClusterDetails?: any[];
    id: number;
    code: string;
    name: string;
    isEnabled: boolean;
}

export interface ICourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    timeCluster: ITimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled: boolean;
    course: ICourse;
}

export interface IScoreConfig {
    programId: number;
    scoreType: number;
    percentScore: number;
    scoreMax: number;
    scoreMin: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface IProgram {
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
    scoreConfigs: IScoreConfig[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
