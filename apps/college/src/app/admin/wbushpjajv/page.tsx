import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_wbushpjajv_Read from "@/modules-features/admin/wbushpjajv/F_wbushpjajv_Read";



export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_wbushpjajv_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

