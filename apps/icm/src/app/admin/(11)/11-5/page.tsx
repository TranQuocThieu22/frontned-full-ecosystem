import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F11_5CreateDomainCategory from "@/modules-features/(11)/11-5/F11_5CreateDomainCategory";
import F11_5ReadDomainCategory from "@/modules-features/(11)/11-5/F11_5ReadDomainCategory";

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F11_5CreateDomainCategory />}>
            <F11_5ReadDomainCategory />
        </MyPageContent>
    )
}
