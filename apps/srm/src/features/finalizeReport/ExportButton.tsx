import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";
import { SRMTopic } from "../../shared/interfaces/SRMTopic";
import { SRMTopicMember } from "../../shared/interfaces/SRMTopicMember";
import { statusList } from "./finalizeReportTable";

/**
 * Props for {@link FinalizeReportExportButton}
 */
interface Props {
  /** Mantine React Table instance containing table state and methods */
  table: MRT_TableInstance<SRMTopic>;
  /** Full dataset of proposal approvals */
  data: SRMTopic[];
}

/**
 * Nút export dữ liệu báo cáo hoàn thiện thuyết minh.
 *
 * Cho phép export dữ liệu từ bảng Mantine React Table sang file Excel/CSV
 * với cấu hình định nghĩa các cột, tiêu đề và format hiển thị.
 *
 * - Nếu toàn bộ các dòng trong trang được chọn → export toàn bộ `menuData`.
 * - Nếu chỉ một số dòng được chọn → export các dòng đó.
 *
 * @param props.table - Instance bảng chứa dữ liệu và trạng thái
 * @param props.menuData - Toàn bộ dữ liệu đề tài (dùng khi export toàn bộ)
 * @returns JSX element hiển thị nút export
 */
export default function FinalizeReportExportButton({ table, data }: Props) {
  /**
   * Tìm label tương ứng với một giá trị trong danh sách (type/status/workType/isPass).
   *
   * @param list - Mảng các đối tượng { value, label }
   * @param value - Giá trị cần tìm label
   * @returns Nhãn tương ứng hoặc chuỗi rỗng nếu không tìm thấy
   */
  const getLabel = (
    list: { value: string; label: string }[],
    value: string | undefined
  ) => list.find((item) => item.value === value)?.label || "";

  /** Cấu hình các trường dữ liệu sẽ export, gồm tên trường, tiêu đề, và hàm format */
  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã đăng ký" },
      { fieldName: "registerName", header: "Tên đề tài" },
      { fieldName: "duration", header: "Thời gian thực hiện" },
      {
        fieldName: "fromDate",
        header: "Từ tháng/năm",
        formatFunction: (value: any) => dateUtils.toMMYYYY(value || "")
      },
      {
        fieldName: "toDate",
        header: "Đến tháng/năm",
        formatFunction: (value: any) => dateUtils.toMMYYYY(value || "")
      },
      {
        fieldName: "hostOrganization",
        header: "Đơn vị chủ trì",
      },
      {
        fieldName: "managingOrganization",
        header: "Đơn vị quản lý",
      },
      {
        fieldName: "totalCost",
        header: "Tổng kinh phí thực hiện",
        formatFunction: (value: number) => currencyUtils.formatWithSuffix(value || 0)
      },
      {
        fieldName: "srmType",
        header: "Loại hình thực hiện",
        formatFunction: (value: any) => {
          if (!value) return
          return value.name
        }
      },
      {
        fieldName: "srmArea",
        header: "Lĩnh vực",
        formatFunction: (value: any) => {
          if (!value) return
          return value.name

        }
      },
      {
        fieldName: "srmTopicMembers",
        header: "Chủ nhiệm đề tài",
        formatFunction: (value: any) => value
          ?.filter((member: SRMTopicMember) => member.srmTitle?.isLeader === true)
          .map((member: SRMTopicMember) => member.user?.fullName).join(', ')
      },
      {
        fieldName: "status",
        header: "Tình trạng của đề tài",
        formatFunction: (value: any) => getLabel(statusList, String(value || 0))
      },
      {
        fieldName: "proposalStatus",
        header: "Trạng thái duyệt",

      },
      { fieldName: "proposalReview", header: "Nhận xét" },
      {
        fieldName: "proposalIsSentMail",
        header: "Đã gửi thông báo",
        formatFunction: (value: any) => value === true ? 'có' : 'không'
        // formatFunction: (values: any) => true: 'có'?'chưa '
      },
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh sách export hoàn thiện thuyết minh"
      data={
        table.getIsAllPageRowsSelected()
          ? data
          : table.getSelectedRowModel().rows.map((item) => item.original)
      }
      exportConfig={exportConfig}
    />
  );
}
