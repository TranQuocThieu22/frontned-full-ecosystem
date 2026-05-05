import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICourse } from "./course"
import { ITimeCluster } from "./timeCluster"

export interface ICourseTimeClusters extends IBaseEntity {
    timeCluster?: ITimeCluster,
    course?: ICourse
    courseSectionNumberTotal?: number
}