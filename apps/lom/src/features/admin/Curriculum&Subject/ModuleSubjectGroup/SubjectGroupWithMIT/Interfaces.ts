export interface ISubjectGroupInfoViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    coemitScaleId?: number | null;
    coemitScale?: {
        id?: number;
        code?: string | null;
        name?: string | null;
        knowledge?: string | null;
        skill?: string | null;
        autonomy?: string | null;
        description?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}

export interface ISubjectGroupViewModel {
    id?: number | null;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    coemitScaleId?: number | null;
    coeSubjectGroupId?: number | null;
    note?: string | null;
}

export interface IMITScaleViewInfoModel {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    knowledge?: string;
    skill?: string;
    autonomy?: string;
    description?: string;
}