export interface ICourseSectionViewModel {
  id: number;
  code: string;
  name: string;
  courseId: number;
  timeClusterId: number;
  quantityStudent: number;
  quantityStudentActual: number;
  courseTimeClusterId: number;
  isScheduled: boolean;
  status: number;
  type: number;
  courseSectionLecturer?: {
    user?: {
      code?: string;
      fullName?: string;
    };
  }[];
  courseTimeCluster?: {
    course?: {
      program?: {
        name?: string;
      };
    };
  };
  concurrencyStamp: string;
  isEnabled: boolean;
}

