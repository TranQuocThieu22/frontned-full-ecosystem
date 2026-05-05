import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface UpdateEventFormData extends BaseEntity {
  proofPath?: string;
  note?: string;

  quantity?: number; // SLSV dự kiến
  minPoint?: number; // Điểm trừ
  maxPoint?: number; // Điểm tối đa

  isEnabled?: boolean;
  isTemplate?: boolean;
  isCompleted?: boolean;
  isRequired?: boolean;
  isNoted?: boolean;

  startDate?: Date;
  endDate?: Date;

  facultyId?: number;
  standardId?: number;
  eventGroupId?: number;
  host?: number;
  reviewedBy?: number;
  completedBy?: number;
  parentEventId?: number;
  session?: number;
  futurePlanId?: number;

}
