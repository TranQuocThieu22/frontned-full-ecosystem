import { Account } from "@aq-fe/core-ui/shared/interfaces/Account"

export interface SRMLecturer extends Account {
    jobTitle?: string
    /** là viên chức ngoài trường */
    isExternal?: boolean
    /** Vai trò tham gia hội đồng */
    srmTitleId?: number
}

export interface ILecturerViewModel extends SRMLecturer {
    /** Trình độ */
    educationLevel?: string
    /** Tên */
    firstName?: string,
    /** Họ */
    lastName?: string
    /** Đơn vị của user */
    workingUnitName?: string,
    /** Chức vụ */
    position?: string
    /** Vai trò tham gia */
    participationRole?: string


}
