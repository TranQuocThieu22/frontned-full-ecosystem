import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IEnvidenceVersion } from "./IEnvidenceVersion";

export interface IEvidence extends BaseEntity {
  isExpired?: boolean;
  referenceEvidenceId?: number;
  referenceEvidence?: IEvidence;
  eaqEvidenceCurrentVersion?: IEnvidenceVersion
  eaqCriteriaId?: number;
  note?: string;
  evidenceTypeId?: number;
  evidenceType?: {
    id: number;
    code: string;
    name: string;
  };

  /* Dùng để lấy id thực sự, khi id chính bị thay đổi */
  eaqEvidenceId?: number;
}
