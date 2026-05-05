import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { utils_date_formatToDateTimeString } from "@/utils/date"
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject"
import { Box, Paper, Text } from "@mantine/core"
import { IconCheckbox } from "@tabler/icons-react"

interface MyTitleDateStatusProps {
    title?: string
    date?: Date
    isCheck?: boolean
    isFocus?: boolean
    onClick?: () => void
}

export default function MyTitleDateStatus({
    title,
    date,
    isCheck = true,
    isFocus = false,
    onClick
}: MyTitleDateStatusProps) {
    return (
        <Paper
            onClick={onClick}
            p={'md'}
            bg={isFocus ? colorsObject.mantineBackgroundBlueLight : ""}
            style={{ cursor: "pointer" }}
        >
            <MyFlexRow justify="space-between">
                <Box>
                    <Text fw={500}>{title}</Text>
                    <Text size="sm" >{utils_date_formatToDateTimeString(date)}</Text>
                </Box>
                <IconCheckbox
                    style={{
                        width: 30,
                        height: 30
                    }}
                    stroke={1.5}
                    color="green"
                />
            </MyFlexRow>
        </Paper>
    )
}
