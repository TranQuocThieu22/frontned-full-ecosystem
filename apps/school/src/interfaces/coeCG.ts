import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface ICoeCG  extends IBaseEntity{
   order?:number,
   description?:string,
   coecgpi?:[any],
   coeclOs?:[any]
}