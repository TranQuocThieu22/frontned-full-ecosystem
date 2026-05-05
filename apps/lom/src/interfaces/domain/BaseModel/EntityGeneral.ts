import { EntityBase } from "./EntityBase";

export interface EntityGeneral extends EntityBase {
    concurrencyStamp?: string | null,
}