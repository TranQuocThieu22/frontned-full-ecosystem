import { BaseEntity } from './BaseEntity';
import { COEGrade } from './COEGrade';
import { Major } from './Majors';

export interface Class extends BaseEntity {
    majors?: Major
    coeGrade?: COEGrade
}
