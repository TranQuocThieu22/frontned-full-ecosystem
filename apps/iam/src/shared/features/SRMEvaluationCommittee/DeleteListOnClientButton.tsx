import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";


interface Props {
    values: any,
    handleDeleteList: Function,
    resetRowSelection: Function,
    tranformContextData?: (item: any) => string
}

export default function DeleteListOnClientButton({ values, handleDeleteList, resetRowSelection, tranformContextData }: Props) {
    const disc = useDisclosure();
    const contextData = values.map((item: any) => tranformContextData ? tranformContextData(item) : item.code).join(", ");

    return (
        <CustomButtonModal
            disclosure={disc}
            buttonProps={{
                actionType: "delete",
                leftSection: <IconX stroke={3} />,
                disabled: contextData == undefined || contextData.length == 0
            }}
        >
            <Highlight
                highlight={contextData || []}
                color="red.6"
                highlightStyles={{
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {`Bạn sắp xóa dữ liệu ${contextData || ""}. Bạn có chắc chắn muốn tiếp tục?`}
            </Highlight>
            <Group grow>
                <CustomButton
                    actionType="delete"
                    onClick={() => {
                        disc[1].close();
                        resetRowSelection();
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