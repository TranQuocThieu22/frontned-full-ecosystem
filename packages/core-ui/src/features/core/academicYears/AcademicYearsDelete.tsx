"use client";
import { academicYearService } from "@aq-fe/core-ui/shared/APIs/academicYearService";
import { CustomActionIconSafeDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconSafeDelete";
import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";

export function AcademicYearsDelete({ value }: { value: AcademicYear }) {
  return (
    <CustomActionIconSafeDelete
      contextData={value.code}
      onSubmit={() => {
        return academicYearService.safeDelete(value)
      }}
    />
  );
}
