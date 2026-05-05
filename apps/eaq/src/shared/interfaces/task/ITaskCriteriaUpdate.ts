import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ITaskDetail } from "./ITaskDetail";

export interface ITaskCriteriaUpdate extends BaseEntity {
    startDate?: string | null,
    endDate?: string | null,
    note?: string | null,
    eaqTaskDetails?: ITaskDetail[]
}
