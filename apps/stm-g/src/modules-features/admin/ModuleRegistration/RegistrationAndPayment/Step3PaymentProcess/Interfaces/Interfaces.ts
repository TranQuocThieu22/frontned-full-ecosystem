export interface IDiscountViewModel {
    discountType?: number;
    price?: number;
    percent?: number;
    maxCount?: number;
    status?: number;
    startDate?: string;
    endDate?: string;
    isCancel?: boolean;
    isAllCourse?: boolean | null;
    isAllBranch?: boolean | null;
    mode?: number;
    note?: string;
    inUsed?: number | null;
    courseDiscounts?: any[];
    branchDiscounts?: any[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}

export interface ICourseRegistration {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    userId?: number;
    courseTimeClusterId?: number;
    courseSectionId?: number | null;
    receiptType?: number;
    receiptCode?: string;
    receiptPrice?: number;
    receiptLink?: string;
    receiptNote?: string;
    note?: string | null;
    isCheck?: boolean;
    totalPoint?: number | null;
    isPass?: boolean;
    paymentHistoryId?: number;
}

export interface IExamRegistration {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    userId?: number;
    examId?: number;
    courseSectionId?: number | null;
    receiptType?: number;
    receiptCode?: string;
    receiptPrice?: number;
    receiptLink?: string;
    receiptNote?: string;
    note?: string | null;
    isCheck?: boolean;
    totalPoint?: number | null;
    isPass?: boolean;
    paymentHistoryId?: number;
}

export interface IRegisterAndPaymentViewModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    userId?: number;
    discountId?: number | null;
    discountAmount?: number | null;
    paymentCode?: string | null;
    paymentDate?: Date | null;
    totalAmount?: number | null;
    paymentAmount?: number | null;
    description?: string | null;
    paymentType?: number | null;
    status?: number | null;
    receiptFilePath?: string | null;
    fileDetail?: {
        fileName?: string | null;
        fileExtension?: string | null;
        fileBase64String?: string | null;
    };
    courseRegistrations?: ICourseRegistration[] | null;
    examRegistrations?: IExamRegistration[] | null;
}