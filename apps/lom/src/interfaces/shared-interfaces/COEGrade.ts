
import { COEIRM } from "@/interfaces/shared-interfaces/COEIRM"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { ActivityPlan } from "./ActivityPlan"
import { COEDegreeLevel } from "./COEDegreeLevel"
import { COEProgram } from "./COEProgram"

export interface COEGrade extends BaseEntity {
  coeSemesterStartId?: number
  coeSemesterEndId?: number
  coeTrainingLevelId?: number
  coeDegreeLevelId?: number
  coeDegreeLevel?: COEDegreeLevel
  coeProgramId?: number
  note?: string
  isActive?: boolean,
  totalSubject?: number,
  totalCredit?: number,
  coeSemesterStart?: string | null
  coeSemesterEnd?: string | null
  coeTrainingLevel?: string | null
  coeProgram?: COEProgram,
  formulaType?: number,
  isSplitPoint?: boolean
  coeirmId?: number,
  coeirm?: COEIRM
  totalPLO?: number,
  totalPI?: number,
  activityPlanStart?: ActivityPlan,
  activityPlanEnd?: ActivityPlan,
  coeDegreeLevelCode?: string,
  coeDegreeLevelName?: string
}