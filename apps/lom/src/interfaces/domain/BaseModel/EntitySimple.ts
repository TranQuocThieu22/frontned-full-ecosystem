import { EntityGeneral } from "./EntityGeneral";

export interface EntitySimple extends EntityGeneral {
    code?: string | null,
    name?: string | null,
}