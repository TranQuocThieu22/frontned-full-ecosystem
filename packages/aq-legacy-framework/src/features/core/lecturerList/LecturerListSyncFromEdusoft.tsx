import { AQDataSynchronizationService } from "@aq-fe/aq-legacy-framework/shared/APIs/AQDataSynchronizationService";
import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton";
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { Button, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function LecturerListSyncFromEdusoft() {
    const disc = useDisclosure()
    const notificationState = useState<string>('')
    const mutation = useLegacyReactMutation({
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
