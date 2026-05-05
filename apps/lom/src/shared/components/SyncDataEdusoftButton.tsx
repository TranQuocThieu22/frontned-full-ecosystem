
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { useDisclosure } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import { AxiosResponse } from "axios";

export default function SyncDataEdusoftButton({
    syncService: axiosService,
    disabled
}: {
    syncService: () => Promise<AxiosResponse<CustomApiResponse<null>, any>>,
    disabled?: boolean
}) {
    const disc = useDisclosure()
    const syncMutation = useCustomReactMutation({
        axiosFn: () => axiosService(),
        mutationType: "sync",
        options: {
            onSuccess: () => {
                disc[1].close()
            }
        }
    })
    return (
        <CustomButtonModal
            buttonProps={{
                actionType: "sync",
                disabled: disabled
            }}
            modalProps={{
                title: "Xác nhận đồng bộ"
            }}
            disclosure={disc}>
            <CustomButton
                loading={syncMutation.isPending}
                color="green"
                leftSection={<IconRefresh />}
                onClick={() => syncMutation.mutate()}
            >
                Bắt đầu đồng bộ
            </CustomButton>
        </CustomButtonModal>
    )
}
