export interface ICertificateDecision {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    certificateId?: number;
    signatureUserId?: number | null;
    date?: Date | null;
    note?: string | null;
    path?: string | null;
    signatureUser?: any | null;
    certificate?: any | null;
    modifiedWhen?: Date | null;
    modifiedBy?: number | null;
    modifiedFullName?: string | null;
}

export interface ICertificateInfoViewModel {
    id?: number;
    code?: string;
    name?: string;
    type?: number;
    link?: string;
    note?: string;
    skillCenterId: number;
    skillCenter: any | null;
    concurrencyStamp: string;
    isEnabled: boolean;
    modifiedWhen: string;
    modifiedBy: number;
    modifiedFullName: string;
}

export interface ICertificateDecisionViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    certificateId?: number | null;
    signatureUserId?: number | null;
    date?: Date | null;
    note?: string | null;
    path?: string | null;
    fileDetail?: {
        fileBase64String: string | null;
        fileExtension: string | null;
        fileName: string | null;
    };
    certificateResultIdList?: number[];
    signatureUser?: any | null;
    certificate?: any | null;
}

export interface ICertificateDecisionViewModelWithFile extends ICertificateDecisionViewModel {
    fileInput?: File | null;
}

export interface CertificateResultViewModel {
    userId?: number;
    examId?: number;
    isPass?: boolean;
    point?: number | null;
    certificateDecisionId?: number | null;
    user?: {
        id?: number;
        code?: string;
        fullName?: string;
        gender?: number;
        dateOfBirth?: string;
        [key: string]: any;
    };
    exam?: {
        id?: number;
        code?: string;
        name?: string;
        officialExamDate?: string;
        certificateReviewBatch?: {
            id?: number;
            name?: string;
            [key: string]: any;
        };
        [key: string]: any;
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}
