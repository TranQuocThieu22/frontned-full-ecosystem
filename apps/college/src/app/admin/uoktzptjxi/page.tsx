import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_uoktzptjxi_Read from "@/modules-features/admin/uoktzptjxi/F_uoktzptjxi_Read";



export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_uoktzptjxi_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

