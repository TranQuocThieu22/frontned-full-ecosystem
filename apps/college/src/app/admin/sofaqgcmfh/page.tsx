import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_sofaqgcmfh_Read from "@/modules-features/admin/sofaqgcmfh/F_sofaqgcmfh_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_sofaqgcmfh_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

