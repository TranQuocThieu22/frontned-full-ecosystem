import { IBaseEntity } from './IBaseEntity';

export interface IEmailVariable extends IBaseEntity {
  order: number;
  aqModuleId: number;
  type: number;
}
