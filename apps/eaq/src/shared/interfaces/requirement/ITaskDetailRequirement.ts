import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ITaskDetail } from "../task/ITaskDetail";

export interface ITaskDetailRequirement extends BaseEntity {
  description?: string; // Yêu cầu
  collectionQuestion?: string; // Các câu hỏi đặt ra (Mốc chuẩn tham chiếu)
  collectionNeed?: string; // Cần thu thập
  collectionWhere?: string; // Nơi thu thập
  collectionMethod?: string; // Phương pháp thu thập
  eaqTaskDetail?: ITaskDetail;
  eaqRequirement?: IRequirement;
}
