import { IBaseEntity } from "aq-fe-framework/interfaces"
import { IBranch } from "./branch"
import { ICourseTimeClusters } from "./courseTimeClusters"

export interface ICourse extends IBaseEntity {
    courseTimeClusters: ICourseTimeClusters
    branch?: IBranch
    studyDate?: Date
}