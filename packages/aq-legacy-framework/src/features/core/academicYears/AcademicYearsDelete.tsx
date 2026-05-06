"use client";
import { academicYearService } from "@aq-fe/aq-legacy-framework/shared/APIs/academicYearService";
import { CustomActionIconSafeDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconSafeDelete";
import { AcademicYear } from "@aq-fe/aq-legacy-framework/shared/interfaces/AcademicYear";

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
