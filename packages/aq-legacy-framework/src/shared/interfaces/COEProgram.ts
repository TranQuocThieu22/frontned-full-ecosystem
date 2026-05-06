import { BaseEntity } from './BaseEntity';
import { Department } from './Department';

export interface COEProgram extends BaseEntity {
    department?: Department
}
