import { EntitySimple } from "./EntitySimple";

export interface SimpleViewModel extends EntitySimple {
    id?: number,
    code?: string | null,
    name?: string | null,
    concurrencyStamp?: string | null,
    isEnabled?: boolean,
    modifiedWhen?: string | null,
    modifiedBy?: number | null,
    modifiedFullName?: string | null,
}