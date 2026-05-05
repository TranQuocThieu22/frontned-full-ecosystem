import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMAwardLevel extends BaseEntity {
     /** Không sử dụng */
     isDeactivate?: boolean;
     /** ghi chú */
     note?: string;
}
