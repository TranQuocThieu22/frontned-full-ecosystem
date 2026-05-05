import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";


export interface AddressViewModel extends BaseEntity {
    code?: string;
    name?: string;
    capacity?: number;
    isInsiteSchool?: boolean;
}
