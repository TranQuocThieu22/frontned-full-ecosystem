import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export interface IAnalysisSummary extends BaseEntity {
  standardCode: string // Mã tiêu chuẩn
  criterionCode: string // Mã tiêu chí
  criterionName: string // Tên tiêu chí
  limitationCode: string // Mã hạn chế
  limitationName: string // Tên hạn chế

  analysisCode: string // Mã phân tích
  analysisContent: string // Nội dung phân tích
  analysisQuestions: string[] // Câu hỏi phân tích

  workCode: string // Mã công việc
  workName: string // Tên công việc

  evidenceCode: string // Mã minh chứng dự kiến
  evidenceName: string // Tên minh chứng dự kiến
}
