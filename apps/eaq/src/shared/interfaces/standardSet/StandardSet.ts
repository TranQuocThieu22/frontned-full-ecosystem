import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ITrainingProgram } from '../trainingProgram/ITrainingProgram';

export interface IStandardSet extends BaseEntity {
  description?: string;
  version?: string;
  accreditationType?: number;
  imagePath?: string | null;
  // imageDetail?: string | null;
  issuedDate?: string;
  trainingPrograms?: ITrainingProgram[];
  image?: File,
  /** Chi tiết hình ảnh bộ tiêu chuẩn */
  imageDetail?: {
    fileName?: string | null;
    fileExtension?: string | null;
    fileBase64String?: string | null;
  };
}
