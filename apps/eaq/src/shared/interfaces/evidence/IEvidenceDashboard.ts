export interface IEvidenceDashboardListItem {
  id: number;
  code: string;
  name: string;
  evidenceType?: {
    id: number;
    code: string;
    name: string;
  };
  currentVersion?: {
    versionNumberIssueDate: string;
    validDate: string;
    expiredDate: string;
    isCurrent: boolean;
  };
  departmentId?: number;
  departmentName?: string;
  updateTime?: string;
  status: "Empty" | "Expired" | "Unused" | "Valid";
}

export interface IEvidenceDashboardData {
  emptyCount: number;
  expiredCount: number;
  unusedCount: number;
  evidenceList: IEvidenceDashboardListItem[];
}

