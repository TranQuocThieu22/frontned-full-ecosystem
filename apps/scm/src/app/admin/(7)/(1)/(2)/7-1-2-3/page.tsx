import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F7_1_2_2CreateProposal from "@/modules-features/(7)/(1)/(2)/7-1-2-2/F7_1_2_2CreateProposal";
import F7_1_2_3ReadRegisteredProposal from "@/modules-features/(7)/(1)/(2)/7-1-2-3/F7_1_2_3ReadRegisteredProposal";
import { U0DateToDDMMYYYString } from "@/utils/date";

export default function Page() {
    return (
        <MyPageContent >
            <F7_1_2_3ReadRegisteredProposal />
        </MyPageContent>
    )
}
