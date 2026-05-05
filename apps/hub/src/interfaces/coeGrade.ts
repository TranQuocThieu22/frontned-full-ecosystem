import { ICoeProgram } from "./coeProgram"

export interface ICoeGrade extends IBaseEntity {
  coeSemesterStartId?: number
  coeSemesterEndId?: number
  coeTrainingLevelId?: number
  coeDegreeLevelId?: number
  coeProgramId?: number
  note?: string
  isActive?: boolean,
  totalSubject?: number,
  totalCredit?: number,
  coeSemesterStart?: string | null
  coeSemesterEnd?: string | null
  coeTrainingLevel?: string | null
  coeProgram?: ICoeProgram,
  formulaType?: number,
  isSplitPoint?: boolean
}