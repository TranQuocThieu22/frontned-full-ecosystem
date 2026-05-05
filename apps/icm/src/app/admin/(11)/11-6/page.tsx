import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F11_6CreateMissionCategory from "@/modules-features/(11)/11-6/F11_6CreateMissionCategory";
import F11_6ReadMissionCategory from "@/modules-features/(11)/11-6/F11_6ReadMissionCategory";

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F11_6CreateMissionCategory />}>
            <F11_6ReadMissionCategory />
        </MyPageContent>
    )
}
