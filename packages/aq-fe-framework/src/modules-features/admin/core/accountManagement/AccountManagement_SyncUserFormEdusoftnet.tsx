import { accountService } from "@/APIs/accountService"
import { MyButton } from "@/core"
import { useMyReactMutation } from "@/hooks"
import { Button, Center, Flex, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconRefresh } from "@tabler/icons-react"

export default function AccountManagement_SyncUserFormEdusoftnet() {
    const disc = useDisclosure()
    const discConfirm = useDisclosure()
    const mutation = useMyReactMutation({
        axiosFn: () => {
            return accountService.syncAQDataManager()
        },
        options: {
            onSuccess: () => {
                disc[1].open()
            }
        }
    })
    return (
        <>
            <Button color='green' loading={mutation.isPending} leftSection={<IconRefresh />} onClick={() => { discConfirm[1].open() }}>Đồng bộ từ Edusoft.Net</Button>
            <Modal title="Xác nhận đồng bộ" opened={discConfirm[0]} onClose={discConfirm[1].close}>
                <Flex gap={'md'}>
                    <MyButton actionType="cancel" onClick={discConfirm[1].close} fullWidth />
                    <MyButton actionType="sync" onClick={() => {
                        discConfirm[1].close()
                        mutation.mutate()
                    }} fullWidth>Bắt đầu đồng bộ</MyButton>
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
