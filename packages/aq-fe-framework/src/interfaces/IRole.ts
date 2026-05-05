import { IBaseEntity } from "./IBaseEntity";

export interface IRole extends IBaseEntity {
    isCreate?: boolean,
    isUpdate?: boolean,
    isDelete?: boolean,
    isRead?: boolean
    isPrint?: boolean,
    isExport?: boolean
    pageId?: number
    roleId?: number
    userQuantity?: number,
    isActive?: boolean | string
    aqModuleId?: number
    note?: string
}