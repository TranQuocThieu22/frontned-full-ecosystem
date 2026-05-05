import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IRoadmap extends BaseEntity {
  startDate?: string | null;
  endDate?: string | null;
  note?: string;
  order?: number;
  eaqPhaseId?: number;

  // For Excel import file
  startDateValue?: string | null;
  endDateValue?: string | null;
}

