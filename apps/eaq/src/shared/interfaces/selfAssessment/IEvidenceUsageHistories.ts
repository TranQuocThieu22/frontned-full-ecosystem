import {IEvidence} from "../evidence/IEvidence";

export interface IEvidenceUsageHistories extends IEvidence {
  reportName?: string;
  eaqEvidenceId?: number;
  index?: number;
  uniqueId?: string;
}
