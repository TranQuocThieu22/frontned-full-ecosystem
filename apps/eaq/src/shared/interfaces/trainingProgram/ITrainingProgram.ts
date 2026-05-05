import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import { IPhase } from '../Phase/IPhase';

export interface ITrainingProgram extends BaseEntity {
  order?: number | null;
  duration?: string | null;
  trainingLevel?: string | null; // trình độ đào tạo
  educationMode?: string | null; // loại hình đào tạo
  admissionStartYear?: number | null; // bắt đầu tuyển sinh
  firstGraduationYear?: number | null; // năm đào tạo đầu tiên
  eaqStandardSetId?: number | null; // id bộ tiêu chuẩn
  eaqStandardSet?: any | null; // bộ tiêu chuẩn
  departmentId?: number | null;
  department?: Department | null;
  note?: string | null;
  standardSetId?: number | null;
  phases?: IPhase[] | null;
  departmentCode?: string | null;
}
