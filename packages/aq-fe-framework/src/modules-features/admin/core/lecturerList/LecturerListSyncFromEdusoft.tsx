import { accountService } from "@/APIs/accountService";
import { useMyReactMutation } from "@/hooks/custom-hooks/useMyReactMutation";
import { Button, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import { useState } from "react";

export default function LecturerListSyncFromEdusoft() {
    const disc = useDisclosure()
    const notificationState = useState<string>('')
    const mutation = useMyReactMutation({
        axiosFn: () => accountService.syncAQDataLecturer(),
        options: {
            onSuccess: (data) => {
                notificationState[1](data)
                disc[1].open()
            }
        }
    })
    return (
        <>
            <Button loading={mutation.isPending} color="green" leftSection={<IconRefresh />} onClick={() => mutation.mutate()}>Đồng bộ từ EduSoft.NET</Button>
            <Modal onClose={disc[1].close} opened={disc[0]} title="Thông báo đồng bộ">
                <Stack>
                    {notificationState[0]}
                    <Button
                        onClick={() => {
                            disc[1].close()
                        }}
                    >
                        Đồng ý
                    </Button>
                </Stack>
            </Modal>
        </>
    )
}
