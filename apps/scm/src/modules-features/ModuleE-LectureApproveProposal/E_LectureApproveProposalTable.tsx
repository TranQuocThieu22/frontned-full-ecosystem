import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import E_LectureApproveProposalActionBtn from "./E_LectureApproveProposalActionBtn";
import { EnumApprovalDecision, EnumRegistrationStatus, IProposalEvaluationResultViewModel } from "./interfaces/E_LectureApproveProposalViewModel";
import { U0DateToDDMMYYYString } from "@/utils/date";

export default function E_LectureApproveProposalTable() {

  const query = useQuery({
    queryKey: ['proposal-evaluation-result'],
    queryFn: () => { return mockData; },
  });

  const getRegistrationStatusText = (status: number) => {
    switch (status) {
      case EnumRegistrationStatus.PENDING:
        return "Chờ phê duyệt";
      case EnumRegistrationStatus.APPROVED_WAITING_COUNCIL:
        return "Đã phê duyệt - Chờ hội đồng";
      case EnumRegistrationStatus.PROCESSING:
        return "Đang xử lý";
      default:
        return "Không xác định";
    }
  };

  const getApprovalDecisionText = (decision: number) => {
    switch (decision) {
      case EnumApprovalDecision.PENDING:
        return "Chờ QĐ";
      case EnumApprovalDecision.APPROVED:
        return "Phê duyệt";
      case EnumApprovalDecision.REJECTED:
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const columns = useMemo<MRT_ColumnDef<IProposalEvaluationResultViewModel>[]>(() => [
    {
      header: "Mã bài giảng",
      accessorKey: "code",
    },
    {
      header: "Tên Bài giảng",
      accessorKey: "name",
      size: 200
    },
    {
      header: "Người phụ trách chính",
      accessorKey: "mainResponsible",
    },
    {
      header: "Điểm trung bình (Hệ thống tính)",
      accessorKey: "averageScore",
    },
    {
      header: "Kết luận/ Đề xuất của Hội đồng",
      accessorKey: "councilConclusion",
      size: 300
    },
    {
      header: "Trạng thái Đăng ký (Hiện tại)",
      accessorKey: "registrationStatus",
      Cell: ({ cell }) => {
        return getRegistrationStatusText(cell.getValue<number>());
      }
    },
    {
      header: "Quyết định Phê duyệt",
      accessorKey: "approvalDecision",
      Cell: ({ cell }) => {
        return getApprovalDecisionText(cell.getValue<number>());
      }
    },
    {
      header: "Lý do/ Nhận xét của Ban lãnh đạo",
      accessorKey: "leadershipComments",
      size: 200
    },
    {
      header: "Ngày phê duyệt/ Từ chối",
      accessorKey: "approvalDate",
      Cell: ({ cell }) => {
        return cell.getValue<Date>() ? U0DateToDDMMYYYString(cell.getValue<Date>()) : "";
      }
    },
    {
      header: "Số Quyết định",
      accessorKey: "decisionNumber",
    },
    {
      header: "Người ký duyệt/ Ban hành quyết định",
      accessorKey: "approver",
      size: 200
    },
  ], []);

  return (
    <MyFieldset
      title="Danh sách kết quả đánh giá đề xuất"
    >
      <MyDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={() => {
          return (
            <>
              <MyButton crudType="export" />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <E_LectureApproveProposalActionBtn values={row.original} />
            </MyCenterFull>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}

const mockData: IProposalEvaluationResultViewModel[] = [
  {
    id: "1",
    code: "PYB-2025-001",
    name: "Lập trình Python cơ bản",
    mainResponsible: "Nguyễn Văn A",
    averageScore: 8.17,
    councilConclusion: "Đề xuất đạt, khuyến nghị bổ sung module về xử lý dữ liệu",
    registrationStatus: 1,
    approvalDecision: 1,
    leadershipComments: "",
    approvalDate: new Date("2025-09-20"),
    decisionNumber: "QĐ-BGĐT-2025-001",
    approver: "PGS.TS. Giám đốc Học viện XYZ"
  },
  {
    id: "2",
    code: "AGILE-2025-003",
    name: "Quản lý dự án Agile cho NCKH",
    mainResponsible: "TS. Hoàng Minh F",
    averageScore: 6.9,
    councilConclusion: "Đề xuất chưa đạt yêu cầu về tính mới, cần được làm rõ hơn lợi ích ứng dụng trong NCKH",
    registrationStatus: 1,
    approvalDecision: 1,
    leadershipComments: "Nhận xét chỉ phù hợp làm bài học khác chứ không thể làm trọn vẹn",
    approvalDate: new Date("2025-10-26"),
    decisionNumber: "QĐ-BGĐT-2025-002",
    approver: "PGS.TS. Giám đốc Học viện XYZ"
  },
  {
    id: "3",
    code: "AIH-2025-002",
    name: "Trí tuệ nhân tạo trong Y học",
    mainResponsible: "PGS.TS. Trần Thị D",
    averageScore: 8.8,
    councilConclusion: "Đề xuất xuất sắc, có tiềm năng ứng dụng cao trong thực tế",
    registrationStatus: 2,
    approvalDecision: 0,
    leadershipComments: "",
    approvalDate: new Date(""),
    decisionNumber: "",
    approver: ""
  },
  {
    id: "4",
    code: "VLIT-2025-006",
    name: "Lập trình Học tập Việt Nam",
    mainResponsible: "TS. Nguyễn Văn K",
    averageScore: 7.3,
    councilConclusion: "Chưa có",
    registrationStatus: 2,
    approvalDecision: 0,
    leadershipComments: "",
    approvalDate: new Date(""),
    decisionNumber: "",
    approver: ""
  }
];