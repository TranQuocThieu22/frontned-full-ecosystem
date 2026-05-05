'use client'
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group, NumberFormatter } from "@mantine/core";
import { useMemo } from "react";
import { discountService } from "@/shared/APIs/discountService";

interface CourseDiscount {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountId: number;
  courseId: number;
}

interface BranchDiscount {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountId: number;
  branchId: number;
}

interface DiscountDetail {
  id: number;
  code: string;
  mode?: number;
  note?: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountType: number;
  price: number;
  percent: number;
  maxCount: number;
  status: number;
  startDate: string;
  endDate: string;
  isCancel: boolean;
  isAllCourse: boolean;
  isAllBranch: boolean;
  courseDiscounts: CourseDiscount[];
  branchDiscounts: BranchDiscount[];
}

const DISCOUNT_TYPE = 2;

function getStatusLabel(status: number) {
  switch (status) {
    case 1: return "Chưa đến hạn";
    case 2: return "Đang áp dụng";
    case 3: return "Hết hạn";
    case 4: return "Đã sử dụng đủ";
    case 5: return "Bị hủy";
    default: return "Không xác định";
  }
}

function getModeLabel(mode?: number) {
  switch (mode) {
    case 1: return "Giới thiệu";
    case 2: return "Nhân viên";
    case 3: return "Quản lý";
    case 4: return "Voucher";
    case 5: return "Khác";
    default: return "";
  }
}

export default function DiscountCodeListTable() {
  const query = useCustomReactQuery<DiscountDetail[], unknown, DiscountDetail[]>({
    queryKey: ["discountCodeList"],
    axiosFn: () => discountService.getDetail<DiscountDetail>(DISCOUNT_TYPE),
  });

  const columns = useMemo<CustomColumnDef<DiscountDetail>[]>(() => [
    { header: "Mã giảm giá", accessorKey: "code" },
    {
      header: "Số tiền giảm",
      accessorKey: "price",
      accessorFn: (row) => row.price,
      Cell: ({ row }) => (
        <NumberFormatter suffix=" VND" value={row.original.price} thousandSeparator />
      ),
    },
    {
      header: "Phần trăm giảm",
      accessorKey: "percent",
      accessorFn: (row) => row.percent,
      Cell: ({ row }) => (
        <NumberFormatter suffix=" %" value={row.original.percent} />
      ),
    },
    {
      header: "Số lần sử dụng tối đa",
      accessorKey: "maxCount",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
      accessorFn: (row) => getStatusLabel(row.status),
    },
    {
      header: "Loại mã giảm giá",
      accessorKey: "mode",
      accessorFn: (row) => getModeLabel(row.mode),
    },
    {
      header: "Ngày bắt đầu",
      accessorKey: "startDate",
      accessorFn: (row) => dateUtils.toDDMMYYYY(row.startDate),
    },
    {
      header: "Ngày kết thúc",
      accessorKey: "endDate",
      accessorFn: (row) => dateUtils.toDDMMYYYY(row.endDate),
    },
    {
      header: "Khóa học",
      accessorFn: (row) =>
        row.courseDiscounts?.map((item) => item.name).join(", ") || "",
      Cell: ({ row }) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.original.courseDiscounts?.map((item) => item.name).join("\n")}
        </div>
      ),
    },
    {
      header: "Chi nhánh",
      accessorFn: (row) =>
        row.branchDiscounts?.map((item) => item.name).join(", ") || "",
      Cell: ({ row }) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.original.branchDiscounts?.map((item) => item.name).join("\n")}
        </div>
      ),
    },
  ], []);

  return (
    <CustomDataTableAPI
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={query}
      exportProps={{ fileName: "ma-giam-gia" }}
      renderTopToolbarCustomActions={() => (
        <Group>
          {/* TODO: thêm tạo/cập nhật khi cần, dùng CustomButtonCreateUpdate */}
        </Group>
      )}
    />
  );
}

