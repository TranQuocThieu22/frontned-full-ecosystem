export interface IBaseEntity {
    id?: number,
    tempId?: string,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    modifiedWhen?: string,
    modifiedFullName?: string
    createdBy?: number
    createWhen?: string
}
