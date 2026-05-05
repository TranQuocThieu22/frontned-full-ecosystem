'use client'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F_w9e9qi813x_Read from '@/modules-features/admin/w9e9qi813x/F_w9e9qi813x_Read'
import F_w9e9qi813x_SelectProgram from '@/modules-features/admin/w9e9qi813x/F_w9e9qi813x_SelectProgram'
import useS_w9e9qi813x from '@/modules-features/admin/w9e9qi813x/useS_w9e9qi813x'

export default function Page() {
    const store = useS_w9e9qi813x()
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_w9e9qi813x_SelectProgram />
                {store.state.examId != 0 &&
                    <F_w9e9qi813x_Read />
                }
            </MyFlexColumn>
        </MyPageContent>
    )
}
