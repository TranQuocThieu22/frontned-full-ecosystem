import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_vahqbeopau_Read from "@/modules-features/admin/vahqbeopau/F_vahqbeopau_Read";




export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_vahqbeopau_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

