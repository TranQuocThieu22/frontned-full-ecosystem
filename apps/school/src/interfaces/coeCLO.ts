import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ICoeCLOPI } from "./coeCLOPi";

export interface ICoeCLO extends IBaseEntity {
    order?: number,
    description?: string,
    coecgId?: number,
    densityCLO?: number,
    coeclopi?: [ICoeCLOPI]
}

