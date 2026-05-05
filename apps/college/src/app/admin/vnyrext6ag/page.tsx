import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_vnyrext6ag_Read from "@/modules-features/admin/vnyrext6ag/F_vnyrext6ag_Read";


export default function Page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_vnyrext6ag_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}