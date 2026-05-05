"use client";

import KiemTraHoSoDangKyTuyenChonTable from "@/modules-features/ModuleKiemTraHoSoDangKyTuyenChon/KiemTraHoSoDangKyTuyenChonTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Kiểm tra hồ sơ đăng ký tuyển chọn"
    >
      <KiemTraHoSoDangKyTuyenChonTable/>
    </MyPageContent>
  );
}