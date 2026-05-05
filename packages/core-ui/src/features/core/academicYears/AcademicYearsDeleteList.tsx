import { academicYearService } from "@aq-fe/core-ui/shared/APIs/academicYearService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export function AcademicYearsDeleteList({ values }: { values: any }) {
    return (
        <CustomButtonDeleteList
            contextData={values.map((item: any) => item.code).join(",")}
            onSubmit={() => {
                return academicYearService.deleteList(values)
            }}
        />
    )
}
