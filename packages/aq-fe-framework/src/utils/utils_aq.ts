import { IBaseEntity } from "@/interfaces";
import { IBaseDomain } from "@/interfaces/IBaseDomain";

export function utils_aq_mapBaseEntityToDomain<T extends IBaseEntity>(entity: T): IBaseDomain {
    return {
        id: entity.id?.toString() ?? "", // đảm bảo string
        code: entity.code,
        name: entity.name,
        editDate: entity.modifiedWhen,
        editByUserName: entity.modifiedFullName,
        concurrencyStamp: entity.concurrencyStamp,
        isEnabled: entity.isEnabled,
        // Các field khác nếu có trong IBaseDomain mà không có trong IBaseEntity thì sẽ undefined
    };
}


export function utils_aq_mapDomainToEntity(domain: IBaseDomain): IBaseEntity {
    return {
        id: domain.id ? parseInt(domain.id) : undefined,
        code: domain.code,
        name: domain.name,
        concurrencyStamp: domain.concurrencyStamp,
        modifiedWhen: domain.editDate,
        modifiedFullName: domain.editByUserName,
        isEnabled: domain.isEnabled
    };
}