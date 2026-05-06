import { CustomApiResponse } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import { useDisclosure } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { SafeOmitType } from '@aq-fe/core-ui/shared/types/safeOmitType';
import { CustomButton, CustomButtonProps } from "../button/CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "../button/CustomButtonModal/CustomButtonModal";
export interface CustomButtonModalSyncProps<IRes> extends SafeOmitType<CustomButtonModalProps, "disclosure"> {
    axiosFn: () => Promise<AxiosResponse<CustomApiResponse<IRes>>>
    submitButtonProps?: CustomButtonProps
}

export function CustomButtonModalSync<IRes>({
    axiosFn,
    submitButtonProps,
    ...rest
}: CustomButtonModalSyncProps<IRes>) {
    const mutation = useLegacyReactMutation({
        axiosFn: () => axiosFn(),
        successNotification: "Đồng bộ thành công",
    })
    const disc = useDisclosure()

    return (
        <CustomButtonModal
            disclosure={disc}
            {...rest}
            modalProps={{
                title: "Xác nhận đồng bộ",
                ...rest.modalProps
            }}
            buttonProps={{
                actionType: "sync",
                loading: mutation.isPending,
                ...rest.buttonProps
            }}
        >
            <CustomButton
                actionType="sync"
                variant="filled"
                loading={mutation.isPending}
                onClick={() => {
                    mutation.mutate()
                    disc[1].close()
                }}
                {...submitButtonProps}
            >
                Bắt đầu đồng bộ
            </CustomButton>
        </CustomButtonModal>
    )
}
