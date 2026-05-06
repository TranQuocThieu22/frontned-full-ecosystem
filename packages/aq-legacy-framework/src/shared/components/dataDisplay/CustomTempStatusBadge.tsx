import { Badge, BadgeProps } from "@mantine/core"
import { TempStatus } from "@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity"

interface CustomTempStatusBadgeProps extends BadgeProps {
    tempStatus?: TempStatus
}

export default function CustomTempStatusBadge({ tempStatus, ...rest }: CustomTempStatusBadgeProps) {
    if (tempStatus == "created") {
        return <Badge fullWidth color="blue" {...rest}>Thêm mới</Badge>
    }
    if (tempStatus == "deleted") {
        return <Badge fullWidth color="red"{...rest}>Xóa</Badge>
    }
    if (tempStatus == "updated") {
        return <Badge fullWidth color="yellow"{...rest}>Cập nhật</Badge>
    }
}
