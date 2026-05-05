import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F6_4_1ReadResearchTopicsLookup from "@/modules-features/(6)/(4)/6-4-1/F6_4_1ReadResearchTopicsLookup";
import F6_4_1SendMailResearchTopicLookup from "@/modules-features/(6)/(4)/6-4-1/F6_4_1SendMailResearchTopicLookup";

export default function Page() {
    return (
        <MyPageContent title="Danh sách đề tài Nhóm nghiên cứu dõi báo cáo" rightTopBar={<F6_4_1SendMailResearchTopicLookup />}>
            <F6_4_1ReadResearchTopicsLookup />
        </MyPageContent>
    )
}
