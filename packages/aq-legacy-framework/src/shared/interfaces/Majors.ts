import { BaseEntity } from "./BaseEntity";
import { Faculty } from "./Faculty";

export interface Major extends BaseEntity {
    faculty?: Faculty
}