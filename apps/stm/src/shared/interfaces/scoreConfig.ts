import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface ScoreConfig extends BaseEntity {
  programId?: number;
  scoreType?: number;
  percentScore?: number;
  scoreMax?: number;
  scoreMin?: number;
}
