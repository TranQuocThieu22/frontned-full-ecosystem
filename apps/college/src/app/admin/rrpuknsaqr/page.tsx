import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_rrpuknsaqr_Read from "@/modules-features/admin/rrpuknsaqr/F_rrpuknsaqr_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_rrpuknsaqr_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

