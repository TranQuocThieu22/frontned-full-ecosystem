import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ITaskDetail } from "./ITaskDetail";


export interface ITaskDetailReport extends BaseEntity {
    reportDate?: string
    result?: string
    eaqTaskDetail?: ITaskDetail
    eaqTaskDetailId?: number
    order?: number
}
