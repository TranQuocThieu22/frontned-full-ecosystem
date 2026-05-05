import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface I_TickerDistribution extends BaseEntity {
  studentCode: string;
  studentName: string;
  recordedAt: Date;
  performer: string;
  className: string;
  rewardType: string;
  ticketAmount: number;
  reason: string;
}

