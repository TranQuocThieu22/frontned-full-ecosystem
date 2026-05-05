import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ITimeClusterDetails } from "./timeClusterDetails"

export interface ITimeCluster extends IBaseEntity {
    timeTypeId?: number
    timeClusterDetails?: ITimeClusterDetails[]
}
