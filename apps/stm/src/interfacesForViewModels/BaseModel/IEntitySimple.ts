import { IEntityGeneral } from "./IEntityGeneral";

export interface IEntitySimple extends IEntityGeneral {
    code?: string | null,
    name?: string | null,
}