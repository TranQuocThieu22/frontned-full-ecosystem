import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Address extends BaseEntity {
    location?: string;
    isInsiteSchool?: boolean;
    capacity?: number;
    testCapacity?: number;
    block?: string;
    roomTypeId?: number;
    branchId?: number;
    roomType?: string;
    branch?: string;
}