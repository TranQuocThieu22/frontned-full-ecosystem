import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

interface Props {
    values: any,
    handleDeleteList: Function,
    handlResetSelection: Function,
    formatContextData?: (item: any) => string,
    customMessage?: (contextData: any) => ReactNode
}

export default function DeleteListOnClientButton({ values, handleDeleteList, handlResetSelection, formatContextData, customMessage }: Props) {
    const disc = useDisclosure();
    const contextData = values.map((item: any) => formatContextData ? formatContextData(item) : item.code).join(", ");

    return (
        <CustomButtonModal
            disclosure={disc}
            buttonProps={{
                actionType: "delete",
                leftSection: <IconX stroke={3} />,
                disabled: contextData == undefined || values?.length === 0
            }}
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
                    onClick={() => {
                        disc[1].close();
                        handlResetSelection();
                        handleDeleteList(values);
                        utils_notification_show({ crudType: "delete" });
                    }}
                />
                <CustomButton
                    actionType="cancel"
                    onClick={disc[1].close}
                />
            </Group>
        </CustomButtonModal>
    )
}