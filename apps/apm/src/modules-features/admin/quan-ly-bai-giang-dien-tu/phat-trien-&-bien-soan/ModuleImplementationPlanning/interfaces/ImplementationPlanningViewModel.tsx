export interface IImplementationPlanningTask {
  id: number;
  code: string;
  name: string;
  assignee: string;
  startDate: string;
  endDate: string;
  estimatedDuration: number;
  priority: number;
  status: number;
  order: number;
}

export interface IEditorialBoard {
  id: string;
  name: string;
  code: string;
}

export interface IImplementationPlan {
  id: string;
  name: string;
  lectureCode: string;
  editorialBoardId: string;
  tasks: IImplementationPlanningTask[];
  resources: string;
  notes: string;
  status: number;
}

export const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 1: return 'Thấp';
    case 2: return 'Trung bình';
    case 3: return 'Cao';
    default: return 'Không xác định';
  }
};

export const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0: return 'Chưa bắt đầu';
    case 1: return 'Đang thực hiện';
    case 2: return 'Hoàn thành';
    case 3: return 'Tạm dừng';
    default: return 'Không xác định';
  }
};

export const getPlanStatusLabel = (status: number): string => {
  switch (status) {
    case 0: return 'Lưu nháp';
    case 1: return 'Yêu cầu chỉnh sửa';
    case 2: return 'Đã phê duyệt';
    default: return 'Không xác định';
  }
};
