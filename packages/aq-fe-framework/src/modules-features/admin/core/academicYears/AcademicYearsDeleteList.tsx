import { academicYearService } from "@/APIs/academicYearService";
import { MyButtonDeleteList } from "@/components";

export function AcademicYearsDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.code).join(",")}
            onSubmit={() => {
                return academicYearService.deleteList(values)
            }}
        />
    )
}
