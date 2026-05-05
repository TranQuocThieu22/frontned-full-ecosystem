export interface BaseEntity {
    id?: string;
    code?: string;
    name?: string;
    tempId?: string
    tempStatus?: TempStatus
    createdAt?: string
    updatedAt?: string
}

export type TempStatus = "created" | "updated" | "deleted"