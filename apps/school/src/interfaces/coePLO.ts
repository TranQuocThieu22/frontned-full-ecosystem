import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ICoePI } from "./coePI";

export interface ICoePLO extends IBaseEntity {
    coepIs?: ICoePI[]
}