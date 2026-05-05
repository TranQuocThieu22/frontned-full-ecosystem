'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F3_3CreateScientificResearchGroup from "@/modules-features/(3)/3-3/F3_3CreateResearchGroupProfile";

export default function Page() {
    return (
        <MyPageContent
            canBack
            title="Tạo hồ sơ năng lực nhóm nghiên cứu"
        >
            <F3_3CreateScientificResearchGroup />
        </MyPageContent>
    );
}
