import { IImplementationPlanningInfoViewModel } from "./ImplementationPlanningRead";
import { IPlanDetailsInfoViewModel } from "./ImplementationPlanningUpdateTab/PlanDetailsTab/PlanDetailsTabRead";

export const mockData: IImplementationPlanningInfoViewModel[] = [
  {
    maKeHoach: "KHTT2025001",
    maBanBienSoan: "BBGT2025001",
    maDeXuat: "GT2025001",
    tenGiaoTrinhDeXuat: "Giáo trình Nguyên lý Kế toán",
    ngayLapKeHoach: "2025-08-15",
    ngayBatDauDuKien: "2025-08-20",
    ngayKetThucDuKien: "2026-03-30",
    nguoiLapKeHoach: "ThS. Nguyễn Văn Á (GV12345)",
    trangThaiDuyetKeHoach: "Đang chờ duyệt",
  },
  {
    maKeHoach: "KHTT2025002",
    maBanBienSoan: "BBGT2025002",
    maDeXuat: "GT2025002",
    tenGiaoTrinhDeXuat: "Giáo trình Phân tích Dữ liệu Lớn",
    ngayLapKeHoach: "2025-08-18",
    ngayBatDauDuKien: "2025-08-25",
    ngayKetThucDuKien: "2026-04-15",
    nguoiLapKeHoach: "TS. Hoàng D (GV99887)",
    trangThaiDuyetKeHoach: "Đã duyệt",
  },
  {
    maKeHoach: "KHTT2025003",
    maBanBienSoan: "BBGT2025003",
    maDeXuat: "GT2025004",
    tenGiaoTrinhDeXuat: "Giáo trình Kinh tế Vĩ mô",
    ngayLapKeHoach: "2025-08-20",
    ngayBatDauDuKien: "2025-08-28",
    ngayKetThucDuKien: "2026-05-30",
    nguoiLapKeHoach: "PGS. Kim G (GV44556)",
    trangThaiDuyetKeHoach: "Đang chờ duyệt",
  },
];

export const selectNguoiLapKeHoach: string[] = Array.from(
  new Set(mockData.filter((item) => item.nguoiLapKeHoach !== undefined).map((item) => item.nguoiLapKeHoach as string))
);

export const selectTrangThaiDuyetKeHoach: string[] = Array.from(
  new Set(
    mockData
      .filter((item) => item.trangThaiDuyetKeHoach !== undefined)
      .map((item) => item.trangThaiDuyetKeHoach as string)
  )
);

export const mockDataPlanDetails: IPlanDetailsInfoViewModel[] = [
  {
    maKeHoach: "KHTT2025001",
    maGiaiDoan: "GD001",
    thuTu: 1,
    tenGiaiDoan: "Xây dựng Đề cương chi tiết",
    moTaGiaiDoan:
      "Hoàn thiện cấu trúc tổng thể giáo trình, phân công nhiệm vụ cụ thể và lập kế hoạch chi tiết cho từng chương.",
    ngayBatDauDuKien: "2025-08-20",
    ngayKetThucDuKien: "2025-09-05",
    nguoiChiuTrachNhiemChinh: "TVS Nguyễn Văn A (SV12345)",
    ketQuaDauRaDuKien: "Đề cương chi tiết V2.0",
    trangThaiGiaiDoan: "Chưa bắt đầu",
  },
  {
    maKeHoach: "KHTT2025001",
    maGiaiDoan: "GD002",
    thuTu: 2,
    tenGiaiDoan: "Biên soạn bản thảo Chương 1-3",
    moTaGiaiDoan: "Viết nội dung, thu thập xả liệu và tài liệu tham khảo cho ba chương đầu tiên của giáo trình.",
    ngayBatDauDuKien: "2025-09-06",
    ngayKetThucDuKien: "2025-10-30",
    nguoiChiuTrachNhiemChinh: "TS Trần Thị B (SV67890)",
    ketQuaDauRaDuKien: "Bản thảo Chương 1-3",
    trangThaiGiaiDoan: "Chưa bắt đầu",
  },
  {
    maKeHoach: "KHTT2025001",
    maGiaiDoan: "GD003",
    thuTu: 3,
    tenGiaiDoan: "Rà soát và cảnh xao nội bộ",
    moTaGiaiDoan:
      "Các thành viên Ban Biên soạn cùng nhau rà soát, góp ý và cảnh xao bản thảo theo vòng lặp cho đến khi đạt chất lượng nội bộ.",
    ngayBatDauDuKien: "2025-11-01",
    ngayKetThucDuKien: "2025-11-30",
    nguoiChiuTrachNhiemChinh: "TVS Phạm C (SV33445)",
    ketQuaDauRaDuKien: "Bản thảo nội bộ hoàn chỉnh",
    trangThaiGiaiDoan: "Chưa bắt đầu",
  },
  {
    maKeHoach: "KHTT2025001",
    maGiaiDoan: "GD004",
    thuTu: 4,
    tenGiaiDoan: "Gửi và chờ Thẩm định",
    moTaGiaiDoan: "Nộp bản thảo đã hoàn thiện lên Phòng QLKH và chờ kết quả thẩm định tại Hội đồng.",
    ngayBatDauDuKien: "2025-12-01",
    ngayKetThucDuKien: "2025-12-15",
    nguoiChiuTrachNhiemChinh: "TVS Nguyễn Văn A (SV12345)",
    ketQuaDauRaDuKien: "Báo cáo thẩm định",
    trangThaiGiaiDoan: "Chưa bắt đầu",
  },
];

export const selectNguoiChiuTrachNhiemChinh: string[] = Array.from(
  new Set(
    mockDataPlanDetails
      .filter((item) => item.nguoiChiuTrachNhiemChinh !== undefined)
      .map((item) => item.nguoiChiuTrachNhiemChinh as string)
  )
);
