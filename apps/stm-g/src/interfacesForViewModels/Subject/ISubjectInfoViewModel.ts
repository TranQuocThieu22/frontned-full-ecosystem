import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { IRoomTypeViewModel } from "../RoomType/IRoomTypeViewModel";

export interface ISubjectInfoViewModel extends ISimpleViewModel {
    classPeriodNumber?: number | null;
    hours?: number | null;
    note?: string | null;
    roomTypeId?: number;
    roomType?: IRoomTypeViewModel | null;
}