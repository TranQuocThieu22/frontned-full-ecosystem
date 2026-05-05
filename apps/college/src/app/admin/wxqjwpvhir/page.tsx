import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_wxqjwpvhir_Read from "@/modules-features/admin/wxqjwpvhir/F_wxqjwpvhir_Read";

export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_wxqjwpvhir_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

