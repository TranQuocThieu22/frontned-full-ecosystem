import { academicYearService } from "@aq-fe/aq-legacy-framework/shared/APIs/academicYearService";
import { CustomButtonSafeDeleteList } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonSafeDeleteList";

export function AcademicYearsDeleteList({ values }: { values: any }) {
    return (
        <CustomButtonSafeDeleteList
            count={values.length}
            onSubmit={() => {
                return academicYearService.safeDeleteList(values)
            }}
        />
    )
}
