export interface IBaseEntity {
    id?: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    modifiedWhen?: Date,
    modifiedBy?: number
}
