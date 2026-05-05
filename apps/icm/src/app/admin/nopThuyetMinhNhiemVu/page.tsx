"use client";

import NopThuyetMinhNhiemVuTable from "@/modules-features/ModuleNopThuyetMinhNhiemVu/NopThuyetMinhNhiemVuTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Nộp thuyết minh nhiệm vụ"
    >
      <NopThuyetMinhNhiemVuTable />
    </MyPageContent>
  );
}