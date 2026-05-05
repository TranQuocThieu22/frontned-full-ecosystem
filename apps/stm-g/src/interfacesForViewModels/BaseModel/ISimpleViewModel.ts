import { IEntitySimple } from "./IEntitySimple";

export interface ISimpleViewModel extends IEntitySimple {
    id?: number,
    code?: string | null,
    name?: string | null,
    concurrencyStamp?: string | null,
    isEnabled?: boolean,
    modifiedWhen?: Date | null,
    modifiedBy?: number | null,
    modifiedFullName?: string | null,
}