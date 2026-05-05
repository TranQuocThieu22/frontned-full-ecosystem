import { Button, Center, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconRefresh } from '@tabler/icons-react'

export default function ActivityPlanSyncButton({
    disclosure,
    onStartSync,
    isLoading,
    title
}: {
    disclosure: ReturnType<typeof useDisclosure>,
    onStartSync: () => void,
    isLoading: boolean,
    title?: string
}) {
    return (
        <>
            <Button color='green' loading={isLoading} leftSection={<IconRefresh />} onClick={onStartSync}>Đồng bộ từ Edusoft.Net</Button>
            <Modal title="Thông báo đồng bộ" onClose={disclosure[1].close} opened={disclosure[0]}>
                <Text>
                    {title}. Bạn vui lòng kiểm tra lại
                    {/* {`Đã đồng bộ năm học học kỳ từ hệ thống Edusoft.NET. Bạn vui lòng kiểm tra lại`} */}
                </Text>
                <Center>
                    <Button onClick={disclosure[1].close}>Đồng ý</Button>
                </Center>
            </Modal>
        </>
    )
}
