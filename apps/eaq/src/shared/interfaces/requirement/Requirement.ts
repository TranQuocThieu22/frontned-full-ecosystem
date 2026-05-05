import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import { User } from '@aq-fe/core-ui/shared/interfaces/User';
import { IAnalysis } from '../analysis/IAnalysis';
import { ICriteria } from '../criteria/Criteria';
import { IStandard } from '../standard/Standard';

export interface IRequirement extends BaseEntity {
  description?: string;
  note?: string | null;
  eaqCriteriaId?: number;
  eaqCriteria?: ICriteria;
  eaqCriteriaCode?: string;
  eaqStandardId?: number;
  eaqStandard?: IStandard;
  eaqStandardCode?: string;
  hostUnit?: Department;
  hostUnitId?: number;
  userId?: number | null;
  user?: User;
  eaqAnalysises?: IAnalysis[];
  reportStatus?: number;
  trackingStatus?: number;
}
