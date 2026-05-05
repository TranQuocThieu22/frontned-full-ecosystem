import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconTablePlus } from "@tabler/icons-react"

export default function PrototypeImportButton() {
    return (
        <>
            <Button leftSection={<IconTablePlus />} color="green" size="sm" radius="sm"
                onClick={() => {
                    notifications.show({
                        title: "Thông báo",
                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                        color: "blue",
                        autoClose: 5000,
                    })
                }
                }
            >
                Import
            </Button>
        </>
    )
}