import { IEntityBase } from "./IEntityBase";

export interface IEntityGeneral extends IEntityBase {
    concurrencyStamp?: string | null,
}