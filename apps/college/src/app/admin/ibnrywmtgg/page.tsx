import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_ibnrywmtgg_Read from "@/modules-features/admin/ibnrywmtgg/F_ibnrywmtgg_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_ibnrywmtgg_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

