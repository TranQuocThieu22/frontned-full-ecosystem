import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ICouncilGroup } from "../assessmentCouncilDecision/ICouncilGroup";
import { IEvaluationPlan } from "../evaluationPlan/IEvaluationPlan";
import { IStandard } from "../standard/Standard";

export interface ITask extends BaseEntity {
  order?: number | null;
  evidenceCollectionTime?: string | null;           // "2025-07-01 - 2025-09-30"
  note?: string | null;
  startDate?: string | null,
  endDate?: string | null,
  eaqEvaluationPlanId?: number | null;
  eaqStandardId?: number | null;
  eaqCouncilGroupId?: number | null;
  eaqCouncilGroup?: ICouncilGroup | null;              // Nếu có model riêng thì thay any
  eaqStandard?: IStandard | null;                  // Nếu có model riêng thì thay any
  eaqEvaluationPlan?: IEvaluationPlan | null;            // Nếu có model riêng thì thay any
  isOld?: boolean
}
