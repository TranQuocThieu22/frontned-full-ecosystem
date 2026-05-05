import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IPhase } from "../Phase/IPhase";
import { ITrainingProgram } from "../trainingProgram/ITrainingProgram";

export interface ICertification extends BaseEntity {
    /** Ngày cấp GCN */
    issuedDate?: string,
    /** Đơn vị cấp GCN (tên hiển thị) */
    issuedUnit?: string,
    /** Thời gian thực hiện báo cáo tự đánh giá */
    selfAssessmentTime?: string,
    /** Thời gian thực hiện đánh giá ngoài */
    externalAssessmentTime?: string,
    /** Đường dẫn File đính kèm GCN */
    certificationFilePath?: string,
    /** chú thích */
    note?: string,
    /** id giai đoạn kiểm định */
    eaqPhaseId?: number,
    /** Chi tiết giai đoạn kiểm định */
    eaqPhase?: IPhase,
    /** Id chương trình đào tạo */
    eaqTrainingProgramId?: number,
    /** Chi tiết chương trình đào tạo */
    eaqTrainingProgram?: ITrainingProgram
    /** File đính kèm GCN */
    certificationFileDetail?: AQFileDetail
}
