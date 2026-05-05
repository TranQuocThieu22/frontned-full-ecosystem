import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_wdft1r324q_Read from "@/modules-features/admin/wdft1r324q/F_wdft1r324q_Read";



export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_wdft1r324q_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

