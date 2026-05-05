export enum SyncBatchLogStatusEnum {
    /** Chuẩn bị */
    Pending = 1,
    /** Đang xử lý */
    Processing = 2,
    /** Thành công */
    Succeeded = 3,
    /** Thất bại */
    Failed = 4
}

/** 1=Đang xử lý, 2=Thành công, 3=Thất bại */
export const SyncBatchLogStatusLabel: Record<SyncBatchLogStatusEnum, string> = {
    [SyncBatchLogStatusEnum.Pending]: "Đang được xếp vào hàng chờ",
    [SyncBatchLogStatusEnum.Processing]: "Đang xử lý",
    [SyncBatchLogStatusEnum.Succeeded]: "Thành công",
    [SyncBatchLogStatusEnum.Failed]: "Thất bại",
};