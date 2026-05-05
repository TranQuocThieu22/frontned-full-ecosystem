import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { Class } from "./Class";

export interface COEStudent extends User {
    coeClassId?: number
    coeClass?: Class
}