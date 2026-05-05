import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_ulfmjizfvr_Read from "@/modules-features/admin/ulfmjizfvr/F_ulfmjizfvr_Read";



export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_ulfmjizfvr_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

