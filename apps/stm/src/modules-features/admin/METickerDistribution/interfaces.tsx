import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface I_TickerDistribution extends IBaseEntity {
  studentCode: string;
  studentName: string;
  recordedAt: Date;
  performer: string;
  className: string;
  rewardType: string;
  ticketAmount: number;
  reason: string;
}

