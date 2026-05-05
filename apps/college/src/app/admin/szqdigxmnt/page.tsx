import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_szqdigxmnt_Read from "@/modules-features/admin/szqdigxmnt/F_szqdigxmnt_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_szqdigxmnt_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

