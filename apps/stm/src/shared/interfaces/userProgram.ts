import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Program } from "./program";

export interface UserProgram extends BaseEntity {
  userId?: number;
  programId?: number;
  program?: Program;
}
