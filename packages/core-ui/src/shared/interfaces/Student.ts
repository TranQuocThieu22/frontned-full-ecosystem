import { Class } from "./Class";
import { User } from "./User";

export interface Student extends User {
    classCode?: string
    className?: string
    majorsCode?: string
    majorsName?: string
    facultyCode?: string
    facultyName?: string
    classId?: number
    class?: Class
}