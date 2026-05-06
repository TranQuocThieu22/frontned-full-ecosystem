import { BaseEntity } from './BaseEntity';

export interface EmailTemplate extends BaseEntity {
  order?: number;
  body?: string;
  type?: number;
  aqModuleId?: number;
}
