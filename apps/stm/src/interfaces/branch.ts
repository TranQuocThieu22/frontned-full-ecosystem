import { ISkillCenter } from "@/modules-features/admin/ModuleExam/CRUDExam/Interfaces/MutateExam"
import { IBaseEntity } from "aq-fe-framework/interfaces"

export interface IBranch extends IBaseEntity {
    note?: string
    location?: string
    skillCenterId?: number,
    skillCenter?: ISkillCenter
}