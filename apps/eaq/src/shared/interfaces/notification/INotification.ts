import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ITaskDetail } from "../task/ITaskDetail";

export interface INotification extends BaseEntity {
    notificationDate?: string;
    sendBy?: string;
    receiver: string;
    notificationMessage: string;
    eaqTaskDetailId?: number;
    eaqTaskDetail?: ITaskDetail;
}
