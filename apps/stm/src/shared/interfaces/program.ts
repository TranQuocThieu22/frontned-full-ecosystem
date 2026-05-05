import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Certificate } from "./certificate";
import { ProgramSubject } from "./programSubject";
import { ProgramType } from "./programType";
import { ScoreConfig } from "./scoreConfig";
import { SkillCenter } from "./skillCenter";
import { Subject } from "./subject";

export interface Program extends BaseEntity {
  skillCenterId?: number;
  programTypeId?: number;
  totalClassPeriodNumber?: number;
  totalHours?: number;
  isTesting?: boolean;
  certificateId?: number;
  isCancel?: boolean;
  note?: string;
  price?: number;
  scoreSystem?: number;
  scoreFormula?: number;
  scorePass?: number;
  testScoreSystem?: number;
  testScoreFormula?: number;
  testScorePass?: number;

  certificate?: Certificate;
  skillCenter?: SkillCenter;
  subjects?: Subject[];
  programType?: ProgramType;
  programSubjects?: ProgramSubject[];
  scoreConfigs?: ScoreConfig[];
}
