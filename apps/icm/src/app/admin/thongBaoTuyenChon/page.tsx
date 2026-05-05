"use client";

import ThongBaoTuyenChonTable from "@/modules-features/ModuleThongBaoTuyenChon/ThongBaoTuyenChonTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Thông báo kết quả tuyển chọn"
    >
      <ThongBaoTuyenChonTable />
    </MyPageContent>
  );
}