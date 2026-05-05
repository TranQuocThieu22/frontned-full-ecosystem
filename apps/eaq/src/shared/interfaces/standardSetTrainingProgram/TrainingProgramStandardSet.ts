import { Cycle } from "@/shared/interfaces/cycle/Cycle";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface StandardSetTrainingProgram extends BaseEntity {
  eaqTrainingProgramId?: number
  eaqTrainingProgram?: ITrainingProgram
  eaqStandardSetId?: number
  eaqStandardSet?: IStandardSet
  note?: string
  eaqCycles?: Cycle[]
}
