// constants/selfAssessment.ts
export const SELF_ASSESSMENT_TYPES = {
    CURRENT_SITUATION: 1,
    STRENGTHS: 2,
    WEAKNESSES: 3,
    ACTION_PLAN: 4,
    EVALUATION: 5,
} as const;

export const ASSESSMENT_NAME = "Báo cáo tự đánh giá";

export const NAVIGATION_ITEMS = [
    { id: "section-1", label: "1. Mô tả hiện trạng" },
    { id: "section-2", label: "2. Điểm mạnh" },
    { id: "section-3", label: "3. Điểm tồn tại" },
    { id: "section-4", label: "4. Kế hoạch hành động" },
    { id: "section-5", label: "5. Tự đánh giá" },
] as const;
