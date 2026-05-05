import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F2_3Create from '@/modules-features/(2)/2-3/F2_3Create'
import F2_3Read from '@/modules-features/(2)/2-3/F2_3Read'

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F2_3Create />}>
            <F2_3Read />
        </MyPageContent>
    )
}
