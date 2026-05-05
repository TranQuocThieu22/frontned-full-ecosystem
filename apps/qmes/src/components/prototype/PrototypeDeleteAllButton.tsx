import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconTableMinus } from "@tabler/icons-react"

export default function PrototypeDeleteAllButton() {
    return (
        <>
            <Button leftSection={<IconTableMinus />} color="red" size="sm" radius="sm"
                onClick={() => {
                    notifications.show({
                        title: "Thông báo",
                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                        color: "blue",
                        autoClose: 5000,
                    })
                }}
            >
                Xóa
            </Button>
        </>
    )
}