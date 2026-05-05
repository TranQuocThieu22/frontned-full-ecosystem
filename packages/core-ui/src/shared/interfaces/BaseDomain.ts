export interface BaseDomain {
    id?: string,
    code?: string,
    name?: string,
    description?: string
    createDate?: string,
    createByUserName?: string
    editDate?: string,
    editByUserName?: string
    concurrencyStamp?: string
    isEnabled?: boolean
}