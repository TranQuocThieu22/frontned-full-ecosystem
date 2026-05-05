'use client'
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useMemo } from "react";

interface EmailTemplateRow {
  id?: number;
  announceTitle?: string;
  action?: string;
  nguoiCapNhat?: string;
  ngayCapNhat?: Date;
}

const mockData: EmailTemplateRow[] = [
  {
    id: 1,
    announceTitle: "Thông báo đăng kí thành công",
    action: "1",
    nguoiCapNhat: "Người cập nhật 1",
    ngayCapNhat: new Date("2024-12-19"),
  },
];

enum ActionList {
  "Đăng kí thành công" = 1,
  "Phục hồi mật khẩu" = 2,
}

export default function EmailTemplatesTable() {
  const columns = useMemo<CustomColumnDef<EmailTemplateRow>[]>(() => [
    { header: "Tiêu đề thông báo", accessorKey: "announceTitle" },
    {
      header: "Loại hành động",
      accessorKey: "action",
      accessorFn: (row) =>
        row.action ? ActionList[row.action as unknown as keyof typeof ActionList] : "",
    },
    {
      header: "Ngày cập nhật",
      accessorKey: "ngayCapNhat",
      accessorFn: (row) =>
        row.ngayCapNhat ? dateUtils.toDDMMYYYY(row.ngayCapNhat.toISOString()) : "",
    },
    { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
  ], []);

  return (
    <CustomFieldset title="Danh sách mẫu mail thông báo">
      <CustomDataTable
        enableRowNumbers
        columns={columns}
        data={mockData}
      />
    </CustomFieldset>
  );
}

