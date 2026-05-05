import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_sviddivwkl_Read from "@/modules-features/admin/sviddivwkl/F_sviddivwkl_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_sviddivwkl_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

