import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F7_1_2_1CreateResearchOrientationProposalNotice from "@/modules-features/(7)/(1)/(2)/7-1-2-1/F7_1_2_1CreateResearchOrientationProposalNotice";
import F7_1_2_1ReadProposalRegistrationNoticeList from "@/modules-features/(7)/(1)/(2)/7-1-2-1/F7_1_2_1ReadProposalRegistrationNoticeList";



export default function Page() {
    return (
        <MyPageContent title="Thông báo đăng ký đề xuất định hướng" >
            <MyFlexColumn>
                <F7_1_2_1CreateResearchOrientationProposalNotice />
                <F7_1_2_1ReadProposalRegistrationNoticeList />
            </MyFlexColumn>

        </MyPageContent>
    )
}
