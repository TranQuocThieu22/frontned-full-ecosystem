"use client";
import { academicYearService } from "@aq-fe/core-ui/shared/APIs/academicYearService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export function AcademicYearsDelete({ values }: { values: any }) {
  return (
    <CustomActionIconDelete
      contextData={values.code}
      onSubmit={() => {
        return academicYearService.delete(values.id)
      }}
    ></CustomActionIconDelete>
  );
}
