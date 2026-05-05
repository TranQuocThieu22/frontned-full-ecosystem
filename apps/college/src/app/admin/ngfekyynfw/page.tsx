import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_ngfekyynfw_Read from "@/modules-features/admin/ngfekyynfw/F_ngfekyynfw_Read";



export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_ngfekyynfw_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

