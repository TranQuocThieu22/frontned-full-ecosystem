import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconTableExport } from "@tabler/icons-react"

export default function PrototypeExportButton() {
    return (
        <>
            <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                onClick={() => {
                    notifications.show({
                        title: "Thông báo",
                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                        color: "blue",
                        autoClose: 5000,
                    })
                }}
            >
                Export
            </Button>
        </>
    )
}