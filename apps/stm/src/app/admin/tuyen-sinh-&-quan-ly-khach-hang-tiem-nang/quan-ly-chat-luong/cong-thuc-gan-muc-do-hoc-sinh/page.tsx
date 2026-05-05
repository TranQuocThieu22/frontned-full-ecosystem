'use client'

import StudentLevelFormulaTable from "@/features/admin/ModuleStudentLevelFormula/StudentLevelFormulaTable"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function page() {
  return (
    <CustomPageContent>
      <StudentLevelFormulaTable />
    </CustomPageContent>
  )
}
