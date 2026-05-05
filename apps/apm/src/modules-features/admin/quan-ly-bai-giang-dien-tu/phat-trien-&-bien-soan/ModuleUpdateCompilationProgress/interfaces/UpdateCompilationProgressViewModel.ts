export interface IUpdateCompilationProgressTask {
  id: number;
  code: string;
  name: string;
  assignee: string;
  startDate: string;
  endDate: string;
  actualCompletionDate?: string;
  estimatedDuration: number;
  priority: number;
  completionPercentage: number;
  status: number;
  attachedDocuments?: string;
  notes?: string;
}

export interface IEditorialBoard {
  id: string;
  name: string;
  code: string;
}

export function getPriorityLabel(priority: number): string {
  switch (priority) {
    case 1:
      return "Thấp";
    case 2:
      return "Trung bình";
    case 3:
      return "Cao";
    default:
      return "Không xác định";
  }
}

export function getStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return "Chưa bắt đầu";
    case 1:
      return "Đang thực hiện";
    case 2:
      return "Hoàn thành";
    case 3:
      return "Tạm dừng";
    default:
      return "Không xác định";
  }
}
