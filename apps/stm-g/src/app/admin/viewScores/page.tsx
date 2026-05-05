import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_yypinkyyey_Read from "@/modules-features/admin/yypinkyyey/F_yypinkyyey_Read";
import F_Shared_FilterExam from "@/modules-features/shared/FilterExam/F_Shared_FilterExam";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <MyPageContent>
            <F_Shared_FilterExam />
            <Space />
            <F_yypinkyyey_Read />
        </MyPageContent>
    )
}
