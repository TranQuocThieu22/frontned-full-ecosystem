import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    fromGradeId?: number
    toGradeIds?: number[]
    onSuccess?: () => void
}

export default function ClonePLOPIConfirmButton({ fromGradeId, toGradeIds, onSuccess }: Props) {
    const disc = useDisclosure();

    const mutation = useMutation({
        mutationFn: () => axiosInstance.post<CustomApiResponse<any[]>>("/COEGrade/CopySource", {
            fromGradeId: fromGradeId, toGradeIds: toGradeIds
        }),
        onSuccess: () => {
            notifications.show({ message: "Đã sao chép thành công", color: 'green' });
            disc[1].close();
            onSuccess && onSuccess();
        },
        onError: (error) => {
            notifications.show({ title: 'Đã xảy ra lỗi!', message: error.message, color: 'red' });
        },
    });

    function handleCLick() {
        mutation.mutate();
    }

    return <>
        <CustomButtonModal
            disclosure={disc}
            modalProps={{
                title: "Xác nhận xoá dữ liệu"
            }}
            isActionIcon
            actionIconProps={{
                children: <IconCheck />
            }}
        >
            <Group wrap="nowrap">
                <IconAlertTriangle strokeWidth={2.5} style={{ height: "7rem", width: "7rem", color: "#FFC400" }} />
                <Text fz="md">Lưu ý: Hành động này sẽ XOÁ toàn bộ PLO/PI hiện tại của khoá đích và thay thế bằng dữ liệu mới!</Text>
            </Group>
            <Group grow>
                <CustomButton
                    onClick={handleCLick}
                    loading={mutation.isPending}
                    leftSection={<IconCheck />}
                >
                    Xác nhận
                </CustomButton>
                <CustomButton
                    actionType="cancel"
                    onClick={disc[1].close}
                />
            </Group>
        </CustomButtonModal>
    </>
};
