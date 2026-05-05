import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation"
import { Button, Center, Flex, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export default function AccountManagement_SyncUserFormEdusoftnet() {
    const disc = useDisclosure()
    const discConfirm = useDisclosure()
    const mutation = useCustomReactMutation({
        axiosFn: () => {
            return AQDataSynchronizationService.AQDataManager()
        },
        options: {
            onSuccess: () => {
                disc[1].open()
            }
        }
    })
    return (
        <>
            <CustomButton actionType="sync" onClick={() => { discConfirm[1].open() }}>Đồng bộ từ Edusoft.Net</CustomButton>
            <Modal title="Xác nhận đồng bộ" opened={discConfirm[0]} onClose={discConfirm[1].close}>
                <Flex gap={'md'}>
                    <CustomButton actionType="cancel" onClick={discConfirm[1].close} fullWidth />
                    <CustomButton actionType="sync" onClick={() => {
                        discConfirm[1].close()
                        mutation.mutate()
                    }} fullWidth>Bắt đầu đồng bộ</CustomButton>
                </Flex>
            </Modal>
            <Modal title="Thông báo đồng bộ" onClose={disc[1].close} opened={disc[0]}>
                <Text>
                    {`Đã đồng bộ tài khoản người dùng từ hệ thống Edusoft.NET với trạng thái "Đang hoạt động". Bạn vui lòng kiểm tra lại`}
                </Text>
                <Center>
                    <Button onClick={disc[1].close}>Đồng ý</Button>
                </Center>
            </Modal>
        </>
    )
}
