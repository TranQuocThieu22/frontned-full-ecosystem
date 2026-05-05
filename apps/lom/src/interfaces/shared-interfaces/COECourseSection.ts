import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { COECourseSectionClass } from "./COECourseSectionClass";
import { COESubject } from "./COESubject";
import { COEGradeSubject } from "./COEGradeSubject";

export interface COECourseSection extends BaseEntity {
  coeGradeSubjectId?: number;
  coeGradeSubject?: COEGradeSubject;
  coeSubjectId?: number;
  coeSubject?: COESubject;

  pointRecordUserId?: number
  pointRecordUser?: User;

  teachingUnitId?: number;
  measureUnitId?: number;
  collectUnitId?: number;
  semesterName?: string;
  semesterCode?: string;
  subjectName?: string;
  subjectCode?: string;
  courseSectionId?: number;
  courseSectionName?: number;
  courseSectionCode?: string;
  coeCourseSectionClass?: COECourseSectionClass[];
  numberPeriod?: number;
  numberCredit?: number;
  subjectAssessmentName?: string;
  subjectAssessmentQuestiontype?: number;
  totalStudent?: number;
  pointQuantity?: number;
  pointQuantityActual?: number;
  isSplitPoint?: boolean,
  studentQuantity?: number;
  studyGroup?: string;
  coeCourseSectionStudents?: any[];

  activityPlanId?: number;
  subjectNumberPeriod?: number;
  subjectNumberCredit?: number;
  // unitTeaching: null,
  // unitMeasurement: null,
  // unitAggregate: null,

  // For Import
  classCodes?: string[];
  classCode?: string;
  lecturerCode?: string;
}