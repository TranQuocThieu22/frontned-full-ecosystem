export enum SyncLogStepEnum {
    /** Đang lấy dữ liệu từ Edusoft */
    GetDataEduSoft = 1,
    /** Kiểm tra các dữ liệu từ Edusoft */
    VerifyEdusoftData = 2,
    /** Kiểm tra các dữ liệu phụ thuộc */
    VerifyNecsessaryData = 3,
    /** Đồng bộ dữ liệu */
    SyncData = 4,
}

/** 1=Đang xử lý, 2=Thành công, 3=Thất bại */
export const SyncLogStepLabel: Record<SyncLogStepEnum, string> = {
    [SyncLogStepEnum.GetDataEduSoft]: "Đọc và tải dữ liệu từ hệ thống EduSoft",
    [SyncLogStepEnum.VerifyEdusoftData]: "Kiểm tra dữ liệu nhận được từ hệ thống EduSoft",
    [SyncLogStepEnum.VerifyNecsessaryData]: "Kiểm tra các dữ liệu phụ thuộc trước khi đồng bộ",
    [SyncLogStepEnum.SyncData]: "Thực hiện đồng bộ và ghi dữ liệu vào hệ thống",
};