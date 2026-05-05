import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Button, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function LecturerListSyncFromEdusoft() {
    const disc = useDisclosure()
    const notificationState = useState<string>('')
    const mutation = useCustomReactMutation({
        axiosFn: () => AQDataSynchronizationService.AQDataLecturer(),
        options: {
            onSuccess: (data) => {
                notificationState[1](data)
                disc[1].open()
            }
        }
    })
    return (
        <>
            <CustomButton actionType="sync" onClick={() => mutation.mutate()}>Đồng bộ từ EduSoft.NET</CustomButton>
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
