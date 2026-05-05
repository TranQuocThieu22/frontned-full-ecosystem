export interface IBaseEntity {
    id?: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    modifiedWhen?: string,
    modifiedFullName?: string
}

export interface IBaseBody {
    pageSize?: number,
    pageNumber?: number
}