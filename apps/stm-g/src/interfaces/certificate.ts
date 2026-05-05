import { IBaseEntity } from "aq-fe-framework/interfaces"
import { IImageDetail } from "./imageDetail"
import { ISkillCenter } from "./skillCenter"

export interface ICertificate extends IBaseEntity {
    type?: number,
    link?: string,
    note?: string,
    imagePath?: string,
    skillCenterId?: number,
    imageDetail?: IImageDetail
    skillCenter?: ISkillCenter
}