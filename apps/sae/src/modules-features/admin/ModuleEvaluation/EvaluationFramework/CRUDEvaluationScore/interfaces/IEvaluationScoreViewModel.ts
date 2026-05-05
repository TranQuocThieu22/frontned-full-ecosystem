export interface IEvaluationScoreViewModel {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  minPoint: number;
  maxPoint: number;
  note?: string;
  orderBy?: number | null;
  events?: any[];
}
