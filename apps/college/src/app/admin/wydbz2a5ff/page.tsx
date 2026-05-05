import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_wydbz2a5ff_Read from "@/modules-features/admin/wydbz2a5ff/F_wydbz2a5ff_Read";

export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_wydbz2a5ff_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

