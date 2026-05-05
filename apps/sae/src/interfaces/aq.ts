import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface AQSyncDataHistory extends BaseEntity {
  planName?: string
  studentCount?: number
  isSuccess?: boolean
}