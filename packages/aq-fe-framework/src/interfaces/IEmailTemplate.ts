import { IBaseEntity } from './IBaseEntity';

export interface IEmailTemplate extends IBaseEntity {
  order?: number;
  body?: string;
  type?: number;
  aqModuleId?: number;
}
