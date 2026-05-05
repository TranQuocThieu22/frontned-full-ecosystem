import { ICourse } from "./course"
import { ITimeCluster } from "./timeCluster"
import { IBaseEntity } from "aq-fe-framework/interfaces"


export interface ICourseTimeClusters extends IBaseEntity {
    timeCluster?: ITimeCluster,
    course?: ICourse
    courseSectionNumberTotal?: number
}