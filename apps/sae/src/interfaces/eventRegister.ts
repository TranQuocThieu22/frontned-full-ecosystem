import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import { Class } from "./class"
import { Faculty } from "./faculty"
import { Majors } from "./majors"


export interface EventRegister extends BaseEntity {
    classes?: Class[]
    eventId?: number
    falcuties?: Faculty[]
    isEnabled?: boolean
    majors?: Majors[]
    registerType?: number
    students?: []
}