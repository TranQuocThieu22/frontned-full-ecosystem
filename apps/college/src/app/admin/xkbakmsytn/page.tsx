import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_xkbakmsytn_Read from "@/modules-features/admin/xkbakmsytn/F_xkbakmsytn_Read";


export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_xkbakmsytn_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

