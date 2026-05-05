import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F4_4Read from "@/modules-features/(4)/4-4/F4_4Read";
import F5_4Read from "@/modules-features/(5)/5-4/F5_4Read";
import React from "react";

interface I {
  id?: number;
  ngayChungTu?: Date;
  soChungTu?: Date;
  ghiChu?: string;
}
export default function Page() {
  return (
    <MyPageContent>
      <F5_4Read />
    </MyPageContent>
  );
}
