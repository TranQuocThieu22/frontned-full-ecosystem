import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IReminder extends BaseEntity {
    description?: string
    from?: string
    sendDate?: string
    to?: string
}
