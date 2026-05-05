import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { EnumRegistrationStatus, IProposalEvaluationResultViewModel } from "./interfaces/ProposalEvaluationResultViewModel";

const mockData: IProposalEvaluationResultViewModel[] = [
  {
    id: "1",
    code: "PYB-2025-001",
    name: "Lập trình Python cơ bản",
    mainResponsible: "Nguyễn Văn A",
    scientificField: "Công nghệ thông tin",
    expectedStartTime: "01/09/2025",
    expectedEndTime: "28/02/2026",
    estimatedBudget: 50000000,
    registrationStatus: 1,
    councilCode: "HD-BGDT-001",
    councilName: "Hội đồng xét duyệt BGĐT Quý 3/2025",
    councilPresident: "TS. Nguyễn Văn A",
    councilSecretary: "PGS.TS. Trần Thị B",
    councilMembers: ["ThS Phạm Thị D", "TS Hoàng Văn E", "PGS.TS Ngô Văn F"],
    expectedMeetingDate: "15/09/2025",
    averageScore: 8.17,
    councilConclusion: "Đề xuất đạt, khuyến nghị bổ sung module về xử lý dữ liệu"
  },
  {
    id: "2",
    code: "AGILE-2025-003",
    name: "Quản lý dự án Agile cho NCKH",
    mainResponsible: "TS. Hoàng Minh F",
    scientificField: "Khoa học quản lý",
    expectedStartTime: "01/11/2025",
    expectedEndTime: "31/01/2026",
    estimatedBudget: 30000000,
    registrationStatus: 0,
    councilCode: "HD-BGDT-001",
    councilName: "Hội đồng xét duyệt BGĐT Quý 3/2025",
    councilPresident: "TS. Hoàng Minh F",
    councilSecretary: "PGS.TS. Trần Thị B",
    councilMembers: ["ThS Phạm Thị D", "TS Hoàng Văn E", "PGS.TS Ngô Văn F"],
    expectedMeetingDate: "15/09/2025",
    averageScore: 6.9,
    councilConclusion: "Đề xuất chưa đạt yêu cầu về tính mới, cần được làm rõ hơn lợi ích ứng dụng trong NCKH"
  },
  {
    id: "3",
    code: "AIH-2025-002",
    name: "Trí tuệ nhân tạo trong Y học",
    mainResponsible: "TGS.TS. Trần Thị D",
    scientificField: "Y học, Trí tuệ nhân tạo",
    expectedStartTime: "01/10/2025",
    expectedEndTime: "31/03/2026",
    estimatedBudget: 75000000,
    registrationStatus: 1,
    councilCode: "HD-BGDT-002",
    councilName: "Hội đồng Thẩm định BGĐT Chuyên ngành Y học",
    councilPresident: "GS.TS. Hoàng Kim E",
    councilSecretary: "TS. Phan Thị G",
    councilMembers: ["PGS.TS. Đỗ Văn H", "Ths. Ngô Minh I"],
    expectedMeetingDate: "20/10/2025",
    averageScore: 8.8,
    councilConclusion: "Đề xuất xuất sắc, có tiềm năng ứng dụng cao trong thực tế"
  }
];

export default function ProposalEvaluationResultTable() {
  const query = useQuery({
    queryKey: ["proposal-evaluation-result"],
    queryFn: () => {
      return mockData;
    }
  });

  const getRegistrationStatusText = (status: number) => {
    switch (status) {
      case EnumRegistrationStatus.PENDING:
        return "Chờ phê duyệt";
      case EnumRegistrationStatus.APPROVED:
        return "Đã phê duyệt";
      case EnumRegistrationStatus.REJECTED:
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
      header: "Tên bài giảng",
      accessorKey: "name",
      size: 200
    },
    {
      header: "Người phụ trách chính",
      accessorKey: "mainResponsible",
    },
    {
      header: "Lĩnh vực khoa học",
      accessorKey: "scientificField",
      size: 200
    },
    {
      header: "Thời gian bắt đầu dự kiến",
      accessorKey: "expectedStartTime",
    },
    {
      header: "Dự kiến kinh phí",
      accessorKey: "estimatedBudget",
      Cell: ({ cell }) => {
        return new Intl.NumberFormat('vi-VN').format(cell.getValue<number>()) + ' VNĐ';
      }
    },
    {
      header: "Trạng thái đăng ký (cuối cùng)",
      accessorKey: "registrationStatus",
      Cell: ({ cell }) => {
        return getRegistrationStatusText(cell.getValue<number>());
      }
    },
    {
      header: "Mã hội đồng",
      accessorKey: "councilCode",
    },
    {
      header: "Tên hội đồng",
      accessorKey: "councilName",
      size: 200
    },
    {
      header: "Chủ tịch hội đồng",
      accessorKey: "councilPresident",
    },
    {
      header: "Thư ký hội đồng",
      accessorKey: "councilSecretary",
    },
    {
      header: "Danh sách ủy viên",
      accessorKey: "councilMembers",
      Cell: ({ cell }) => {
        return cell.getValue<string[]>().join(", ");
      },
      size: 200
    },
    {
      header: "Ngày họp dự kiến",
      accessorKey: "expectedMeetingDate",
    },
    {
      header: "Điểm trung bình",
      accessorKey: "averageScore",
    },
    {
      header: "Kết luận/đề xuất của Hội đồng",
      accessorKey: "councilConclusion",
      size: 300
    },
  ], []);

  return (
    <MyFieldset
      title="Danh sách kết quả đánh giá đề xuất"
    >
      <MyDataTable
        columns={columns}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <MyButton crudType="export" />
            </>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}