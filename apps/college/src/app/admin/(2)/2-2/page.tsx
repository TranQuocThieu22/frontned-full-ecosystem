import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F2_2Create from '@/modules-features/(2)/2-2/F2_2Create'
import F2_2Read from '@/modules-features/(2)/2-2/F2_2Read'

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F2_2Create />}>
            <F2_2Read />
        </MyPageContent>
    )
}
