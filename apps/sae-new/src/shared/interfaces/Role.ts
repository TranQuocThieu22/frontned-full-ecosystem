import { BaseEntity } from "@aq-fe/aq-core-framework/shared/interfaces/BaseEntity";

export interface Role extends BaseEntity {
    description?: string
    isGlobal?: boolean
    category?: string
    tenantId?: string
}


