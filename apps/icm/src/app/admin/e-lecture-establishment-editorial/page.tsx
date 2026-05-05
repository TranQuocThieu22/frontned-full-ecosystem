'use client'

import E_LectureEstablishmentEditorialTable from "@/modules-features/ModuleE-LectureEstablishmentEditorial/E_LectureEstablishmentEditorialTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Thành lập Ban Biên soạn"
    >
      <E_LectureEstablishmentEditorialTable />
    </MyPageContent>
  );
}