import { IBaseEntity } from "@/interfaces";

export function utils_field_extractAQBaseField(values?: Partial<IBaseEntity>) {
    const { id, name, code, concurrencyStamp } = values || {}

    return { id, name, code, concurrencyStamp }
}