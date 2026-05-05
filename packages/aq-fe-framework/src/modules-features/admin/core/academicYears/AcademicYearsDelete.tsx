"use client";
import { academicYearService } from "@/APIs/academicYearService";
import { MyActionIconDelete } from "@/components";

export function AcademicYearsDelete({ values }: { values: any }) {
  return (
    <MyActionIconDelete
      contextData={values.code}
      onSubmit={() => {
        return academicYearService.delete(values.id)
      }}
    ></MyActionIconDelete>
  );
}
