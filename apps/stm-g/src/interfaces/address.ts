import { IBaseEntity } from "aq-fe-framework/interfaces"
import { IBranch } from "./branch"
import { IRoomType } from "./roomType"

export interface IAddress extends IBaseEntity {
    block?: string
    branch?: IBranch
    capacity?: number
    testCapacity?: number
    roomType?: IRoomType
}