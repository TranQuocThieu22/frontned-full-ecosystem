import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { RoomType } from "./roomType";

export interface Subject extends BaseEntity {
  classPeriodNumber?: number;
  hours?: number;
  note?: string;
  roomTypeId?: number;
  roomType?: RoomType;
}
