import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Branch } from "./branch";
import { RoomType } from "./roomType";

export interface Address extends BaseEntity {
    block?: string;
    branch?: Branch;
    branchId?: number;
    capacity?: number;
    testCapacity?: number;
    roomType?: RoomType;
    roomTypeId?: number;
    note?: string;
}
