export interface I_TestResult {
  testResultCode?: string;
  testScheduleCode?: string;
  studentCode?: string;
  program?: string;
  testDate?: Date;
  overallScore?: number;
  detailedScores?: string;
  teacherComment?: string;
  suggestedLevel?: string;
  evaluator?: string;
  status?: number;
}
