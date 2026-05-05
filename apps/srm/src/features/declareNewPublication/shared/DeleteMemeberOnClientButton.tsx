import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

interface Props {
    code?: string,
    handleDelete: () => void,
    resetRowSelection: Function
}

export default function DeleteMemeberOnClientButton({ code, handleDelete, resetRowSelection }: Props) {
    const disc = useDisclosure();
    const [timeoutDelete, setTimeoutDelete] = useState(false);

    return (
        <CustomButtonModal
            disclosure={disc}
            isActionIcon
            actionIconProps={{
                actionType: "delete",
                title: "Xác nhận xóa"
            }}
        >
            <Highlight
                highlight={code || []}
                color="red.6"
                highlightStyles={{
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {`Bạn sắp xóa dữ liệu ${code || ""}. Bạn có chắc chắn muốn tiếp tục?`}
            </Highlight>

            <Group grow>
                <CustomButton
                    actionType="delete"
                    loading={timeoutDelete}
                    onClick={() => {
                        resetRowSelection();
                        setTimeoutDelete(true);
                        handleDelete();
                        setTimeout(() => {
                            setTimeoutDelete(false);
                        }, 1000);
                        disc[1].close();
                        notifications.show({
                            message: "Xóa thành công!",
                            color: "green",
                        });
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