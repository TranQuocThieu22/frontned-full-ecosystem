import { IBaseEntity } from "aq-fe-framework/interfaces"
import { IAddress } from "./address"
export interface IExamAddress extends IBaseEntity {
    address?: IAddress | null
    addressId?: string
}