import { ActivityPlan } from "./ActivityPlan";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export interface StudentActivityPlan extends BaseEntity {
    user?: User
    userId?: number
    activityPlanId?: number
    activityPlan?: ActivityPlan
    status?: studentActivityPlanStatusEnum
}



export enum studentActivityPlanStatusEnum {
    DANG_HOC = 0,
    TAM_DUNG = 1,
    NGHI_LUON = 2,
    TOT_NGHIEP = 3,
    // TAM = 4
}

/** 1=Nam, 2=Nữ */
export const studentActivityPlanStatusLabel: Record<studentActivityPlanStatusEnum, string> = {
    [studentActivityPlanStatusEnum.DANG_HOC]: "Đang học",
    [studentActivityPlanStatusEnum.TAM_DUNG]: "Tạm dừng",
    [studentActivityPlanStatusEnum.NGHI_LUON]: "Nghỉ học",
    [studentActivityPlanStatusEnum.TOT_NGHIEP]: "Tốt nghiệp",
    // [studentActivityPlanStatusEnum.TAM]: "Tạm"
};