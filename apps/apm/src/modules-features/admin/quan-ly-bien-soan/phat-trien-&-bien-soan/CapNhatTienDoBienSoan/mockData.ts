import { IF9_4_4ReadUpdateComplicationProgress } from "./F9_4_4ReadUpdateComplicationProgress";
import { IF9_4_4UpdateComplicationProgressButtonModal } from "./F9_4_4UpdateComplicationProgressButtonModal";
export const mockDataRead: IF9_4_4ReadUpdateComplicationProgress[] = [
  {
    planCode: "KHTT2025001",
    editorialBoardCode: "BBGT2025001",
    suggestionCode: "GT2025001",
    suggestionCurriculumName: "Giáo trình Nguyên lý kế toán",
    dateOfPlan: "2025-08-15",
    estimateStartDateOfPlan: "2025-08-20",
    estimateEndDateOfPlan: "2026-03-30",
    planExecutioner: "Th.S Nguyễn Văn A (GV.12345)",
    planStatus: "Đang chờ duyệt",
    fileAttachment: "Xem file",
  },
  {
    planCode: "KHTT2025002",
    editorialBoardCode: "BBGT2025002",
    suggestionCode: "GT2025002",
    suggestionCurriculumName: "Giáo trình Phân tích Dữ liệu lớn",
    dateOfPlan: "2025-08-18",
    estimateStartDateOfPlan: "2025-08-25",
    estimateEndDateOfPlan: "2026-04-15",
    planExecutioner: "TS.Hoàng D(GV.99887)",
    planStatus: "Đã phê duyệt",
    fileAttachment: "Xem file",
  },
  {
    planCode: "KHTT2025003",
    editorialBoardCode: "BBGT2025003",
    suggestionCode: "GT2025004",
    suggestionCurriculumName: "Giáo trình Kinh tế Vĩ mô",
    dateOfPlan: "2025-08-20",
    estimateStartDateOfPlan: "2025-08-28",
    estimateEndDateOfPlan: "2026-05-30",
    planExecutioner: "PGS.Kim G (GV.44556)",
    planStatus: "Đang chờ duyệt",
    fileAttachment: "Xem file",
  },
];
export const mockDataReadModal: IF9_4_4UpdateComplicationProgressButtonModal[] = [
    {
        phaseCode: "GD001",
        numberOfPhase: 1,
        phaseName: "Xây dựng Đề cương chi tiết",
        responsibleMember: "ThS.Nguyễn Văn A(GV.12345)",
        estimateStartDate: "2025-08-20",
        estimateEndDate: "2025-09-05",
        percentageOfCompletion: 100,
        progressStatus: "Hoàn thành",
        actualEndDate: "2025-09-03",
        progressNote: "Đề cương đã được Ban Biên soạn thông qua",
        fileAttachment: "Xem file",
    }
];
export const dataMockPhaseStatus = [
    { value: "Chưa bắt đầu", label: "Chưa bắt đầu" },
    { value: "Đang thực hiện", label: "Đang thực hiện" },
    { value: "Hoàn thành", label: "Hoàn thành" },
    { value: "Tạm dừng", label: "Tạm dừng" },
    { value: "Hủy bỏ", label: "Hủy bỏ" },
]
