'use client'
import MitPiMatrixTable from "@/features/admin/RemovedFeatures/MitPiMatrix/MitPiMatrixTable";
import FilterGradeSelect from "@/shared/features/FilterGradeSelect/FilterGradeSelect";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Space } from "@mantine/core";

export default function Page() {
  return (
    <CustomPageContent>
      <FilterGradeSelect />
      <Space />
      <MitPiMatrixTable />
    </CustomPageContent>
  )
}
