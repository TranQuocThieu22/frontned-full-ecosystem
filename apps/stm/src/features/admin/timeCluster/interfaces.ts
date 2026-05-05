/** Cụm thời gian - dùng cho timeCluster CRUD và ArrangeSchedule */
export interface ITimeCluster {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  timeTypeId?: number;
  timeType?: { id?: number; code?: string; name?: string } | null;
  maxStudent?: number;
  timeClusterDetails?: {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeClusterId?: number;
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
    classPeriodStart?: number;
    classPeriodEnd?: number;
  }[];
}
