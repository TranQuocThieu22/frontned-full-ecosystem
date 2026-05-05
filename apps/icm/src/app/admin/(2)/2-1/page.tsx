import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F2_1Create from '@/modules-features/(2)/2-1/F2_1Create'
import F2_1Read from '@/modules-features/(2)/2-1/F2_1Read'

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F2_1Create />}>
            <F2_1Read />
        </MyPageContent>
    )
}
