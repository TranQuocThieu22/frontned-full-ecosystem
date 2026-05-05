import { IBaseEntity } from "aq-fe-framework/interfaces"

export interface ICoePI extends IBaseEntity {
    order: number
    description: string
    densityPI: number
    coeploId: number
}