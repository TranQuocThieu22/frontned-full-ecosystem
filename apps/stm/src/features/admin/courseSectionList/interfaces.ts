export interface CourseSectionListItem {
  id?: number;
  code?: string;
  name?: string;
  quantityStudent?: number;
  quantityStudentActual?: number;
  courseTimeClusterId?: number | null;
  courseTimeCluster?: {
    course?: {
      name?: string;
      studyDate?: string | Date;
      courseTimeClusters?: {
        courseSectionNumberTotal?: number;
      }[];
    };
    timeCluster?: {
      name?: string;
    };
  };
}

