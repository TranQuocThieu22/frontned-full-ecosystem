import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F5_5_1ReadListOfResearchTopics from "@/modules-features/(5)/(5)/5-5-1/F5_5_1ReadListOfResearchTopics";
import F5_5_1ReadNotificationList from "@/modules-features/(5)/(5)/5-5-1/F5_5_1ReadNotificationList";

export default function Page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F5_5_1ReadListOfResearchTopics />
                <F5_5_1ReadNotificationList />
            </MyFlexColumn>
        </MyPageContent>
    )
}

