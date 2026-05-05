import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_vzyvakcrbp_Read from "@/modules-features/admin/vzyvakcrbp/F_vzyvakcrbp_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_vzyvakcrbp_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

