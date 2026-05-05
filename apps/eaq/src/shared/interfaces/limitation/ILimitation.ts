import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { IAnalysis } from "../analysis/IAnalysis";
import { ICriteria } from "../criteria/Criteria";
import { IPhase } from "../Phase/IPhase";
import { ITaskDetail } from "../task/ITaskDetail";
import { ITrainingProgram } from "../trainingProgram/ITrainingProgram";

export default interface ILimitation extends BaseEntity {
  /** Nhóm hạn chế */
  limitationType?: number;
  /** Id Phân công tiêu chí  */
  eaqTaskDetailId?: number;
  /** Id Tiêu chí  */
  eaqCriteriaId?: number;
  /** Tiêu chí  */
  eaqCriteria?: ICriteria;
  /** Phân công tiêu chí  */
  eaqTaskDetail?: ITaskDetail;
  /** Chương trình đào tạo */
  eaqTrainingProgram?: ITrainingProgram;
  /** Mô tả hạn chế */
  description?: string;

  // For print
  /** Mã Tiêu chí  */
  eaqCriteriaCode?: string;
  /** Danh sách phân tích */
  eaqAnalysises?: IAnalysis[];

  userId?: number | null;
  user?: User;
  hostUnit?: Department;
  hostUnitId?: number;
  eaqPhaseId?: number
  eaqPhase?: IPhase;

  /** Trạng thái báo cáo */
  reportStatus?: number;

  /** Trạng thái kiểm tra */
  trackingStatus?: number;
}


