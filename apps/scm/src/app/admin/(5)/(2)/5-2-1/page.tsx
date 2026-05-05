import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F5_2_1ListOfNoticesForRegistrationOfProposedOrientation from "@/modules-features/(5)/(2)/5-2-1/F5_2_1ListOfNoticesForRegistrationOfProposedOrientation";
import F5_2_1NoticeOfRegistrationOfProposedOrientation from "@/modules-features/(5)/(2)/5-2-1/F5_2_1NoticeOfRegistrationOfProposedOrientation";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <MyPageContent>
            <F5_2_1NoticeOfRegistrationOfProposedOrientation />
            <Space></Space>
            <F5_2_1ListOfNoticesForRegistrationOfProposedOrientation />
        </MyPageContent>
    )
}
