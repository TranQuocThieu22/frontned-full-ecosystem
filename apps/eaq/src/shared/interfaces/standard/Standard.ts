import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IStandardSet } from '../standardSet/StandardSet';

export interface IStandard extends BaseEntity {
  nameEg?: string | null;
  note?: string | null;
  eaqStandardSetId?: number;
  eaqStandardSet?: IStandardSet; // Replace `any` with a specific type if known
}
