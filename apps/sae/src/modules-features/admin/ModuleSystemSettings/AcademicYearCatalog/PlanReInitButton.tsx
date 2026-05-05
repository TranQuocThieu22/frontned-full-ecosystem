import { service_activityPlan } from '@/api/services/service_activityPlan'
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton'
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal'
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils'
import { Button, Group, Highlight } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
interface Props {
    activityPlanId: number
}
export default function PlanReInitButton({ activityPlanId }: Props) {
    const [opened, { open, close, toggle }] = useDisclosure(false)
    const contextData = 'Hành động khởi tạo này sẽ xóa tất cả hoạt động trong Lập kế hoạch năm mới và Triển khai kế hoạch (Bao gồm dữ liệu sinh viên đăng ký) để tạo lại. Bạn có đông ý thực hiện?'

    return (
        <CustomButtonModal
            // variant='outline'
            disclosure={[opened, { open, close, toggle }]}
            buttonProps={{
                children: 'Khởi tạo',
                color: '#00BEAC'

            }}
            modalProps={{
                title: 'Thông báo khởi tạo lại dữ liệu hoạt động học kỳ'
            }}
        >
            <Highlight highlight="xóa tất cả hoạt động"
                color="red.6"
                highlightStyles={{
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {contextData}
            </Highlight>
            <Group grow>
                <Button
                    bg={'red'}
                    onClick={() => {
                        service_activityPlan.PlanReInit(activityPlanId)
                        utils_notification_show({ crudType: 'create', message: 'Khởi tại thành công!' })
                        close()
                    }}
                >
                    Đồng ý
                </Button>
                <CustomButton
                    actionType="cancel"
                    onClick={() => close()}
                />
            </Group>
        </CustomButtonModal>
    )
}
