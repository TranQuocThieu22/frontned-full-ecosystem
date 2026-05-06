import { BaseEntity } from './BaseEntity';

export interface EmailVariable extends BaseEntity {
  order: number;
  aqModuleId: number;
  type: number;
}
