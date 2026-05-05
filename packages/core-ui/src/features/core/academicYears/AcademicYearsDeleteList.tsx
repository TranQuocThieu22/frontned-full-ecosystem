import { academicYearService } from "@aq-fe/core-ui/shared/APIs/academicYearService";
import { CustomButtonSafeDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonSafeDeleteList";

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
