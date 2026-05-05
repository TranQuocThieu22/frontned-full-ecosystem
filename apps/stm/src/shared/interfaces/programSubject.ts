import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Subject } from "./subject";

export interface ProgramSubject extends BaseEntity {
  programId?: number;
  subjectId?: number;
  subject?: Subject;
}
