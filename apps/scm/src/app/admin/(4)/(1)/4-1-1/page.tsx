import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F4_1_1ReadRegisterForArticleAssignments from "@/modules-features/(4)/(1)/4-1-1/F4_1_1ReadRegisterForArticleAssignments";
import F4_1_1ReadRegisterForTopicAssignment from "@/modules-features/(4)/(1)/4-1-1/F4_1_1ReadRegisterForTopicAssignment";
import F4_1_1ReadRegisterForWorkshopAssignments from "@/modules-features/(4)/(1)/4-1-1/F4_1_1ReadRegisterForWorkshopAssignments";
import F4_1_1ReadUserInfo from "@/modules-features/(4)/(1)/4-1-1/F4_1_1ReadUserInfo";

export default function Page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F4_1_1ReadUserInfo />
                <F4_1_1ReadRegisterForTopicAssignment />
                <F4_1_1ReadRegisterForArticleAssignments />
                <F4_1_1ReadRegisterForWorkshopAssignments />
            </MyFlexColumn>
        </MyPageContent>
    )
}
