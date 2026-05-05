'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F3_3UpdateResearchGroupProfile from "@/modules-features/(3)/3-3/F3_3UpdateResearchGroupProfile";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();

    return (
        <MyPageContent
            canBack
            title="3.3 Cập nhật Hồ sơ năng lực Nhóm nghiên cứu"
        >
            <F3_3UpdateResearchGroupProfile researchGroupProfileId={Number(router.query.scientificProfileId)} />
        </MyPageContent>
    );
}
