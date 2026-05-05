'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F3_2UpdateScientificProfileForm from "@/modules-features/(3)/3-2/F3_2UpdateResearchGroupProfile";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    
    return (
        <MyPageContent canBack title="Cập nhật hồ sơ năng lực Giảng viên - Chuyên viên">
            <F3_2UpdateScientificProfileForm scientificProfileId={Number(router.query.scientificProfileId)} />
        </MyPageContent>
    );
}
