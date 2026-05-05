import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { ReactNode, useState } from "react";

interface Props {
    contextData?: string,
    handleDelete: () => void,
    handlResetSelection: Function
    customMessage?: (contextData: any) => ReactNode
}

export default function DeleteOnClientButton({ contextData, handleDelete, handlResetSelection, customMessage }: Props) {
    const disc = useDisclosure();
    const [timeoutDelete, setTimeoutDelete] = useState(false);

    return (
        <CustomButtonModal
            isActionIcon
            actionIconProps={{
                children: <IconX stroke={3} />
            }}
            modalProps={{
                title: "Xác nhận xóa"
            }}
            disclosure={disc}
        >
            {customMessage
                ? customMessage(contextData)
                : <Text>
                    Bạn sắp xóa dữ liệu <Text c="red" fw={700} span>{contextData || ""}</Text>. Bạn có chắc chắn muốn tiếp tục?
                </Text>
            }
            <Group grow>
                <CustomButton
                    actionType="delete"
                    loading={timeoutDelete}
                    onClick={() => {
                        handlResetSelection();
                        setTimeoutDelete(true);
                        handleDelete();
                        setTimeout(() => {
                            setTimeoutDelete(false);
                        }, 1000);
                        disc[1].close();
                        utils_notification_show({ crudType: "delete" });
                    }}
                />
                <CustomButton
                    actionType="cancel"
                    onClick={disc[1].close}
                />
            </Group>
        </CustomButtonModal >
    )
}