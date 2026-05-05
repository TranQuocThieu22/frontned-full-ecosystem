import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface I_Class extends BaseEntity {
  homeroomTeacherName: string;
  schedule: string;
  room: string;
  currentCapacity: number;
  maxCapacity: number;
  status: number;
}

// Temporatory interface
export interface I_StudentRewardDetail extends BaseEntity {
  parentPhone: string;
  status: number; // EnumStudentStatus

  T07_2025: number;
  T08_2025: number;
  T09_2025: number;
  T10_2025: number;
  T11_2025: number;
  T12_2025: number;
  T01_2026: number;
  T02_2026: number;
  T03_2026: number;
  T04_2026: number;
  T05_2026: number;

  totalTicker: number;
  quarterlyReward: number;
  redeemedTicker: number;
  remainingTicker: number;
}

