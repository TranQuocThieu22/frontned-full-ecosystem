import { service_activityPlan } from '@/api/services/service_activityPlan'
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton'
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal'
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils'
import { Button, Group, Highlight } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
interface Props {
    activityPlanId: number
}
export default function PlanSyncEventRequiredButton({ activityPlanId }: Props) {
    const [opened, { open, close, toggle }] = useDisclosure(false)
    const contextData = 'Hành động này sẽ bổ sung các hoạt động chưa được tạo từ hoạt động bắt buộc vào Kế hoạch năm mới và Triển khai kế hoạch. Bạn có đồng ý thực hiện.'

    return (
        <CustomButtonModal
            buttonProps={{
                variant: 'outline',
                children: 'Bổ sung',
                color: "#81C6D5"
            }}
            modalProps={{
                title: 'Thông báo khởi tạo lại dữ liệu hoạt động học kỳ'
            }}
            disclosure={[opened, { open, close, toggle }]}
        >
            <Highlight highlight="bổ sung các hoạt động chưa được tạo"
                color="green.6"
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

                    bg={'green'}
                    onClick={() => {
                        service_activityPlan.PlanSyncEventRequired(activityPlanId)
                        utils_notification_show({ crudType: 'create', message: 'Bổ sung thành công!' })
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
