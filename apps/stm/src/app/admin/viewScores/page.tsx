import F_yypinkyyey_Read from "@/features/admin/yypinkyyey/F_yypinkyyey_Read";
import F_Shared_FilterExam from "@/features/shared/FilterExam/F_Shared_FilterExam";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <CustomPageContent>
            <F_Shared_FilterExam />
            <Space />
            <F_yypinkyyey_Read />
        </CustomPageContent>
    )
}
