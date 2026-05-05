import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject"
import { Box, Space, Text } from "@mantine/core"
import { MyFlexRow, MyHtmlWrapper } from "aq-fe-framework/components"
import { ReactNode } from "react"

export interface Usecase_QuestionWrapperProps {
    questionIndex?: number,
    title?: string,
    children?: ReactNode
}
export default function Usecase_QuestionWrapper({
    questionIndex,
    title,
    children
}: Usecase_QuestionWrapperProps) {
    return (
        <Box py={'md'} px={"xl"} style={{ border: "1px solid gray", borderRadius: "10px" }} bg={colorsObject.mantineBackgroundBlueLight}>
            <MyFlexRow gap={5} align={"center"}>
                <Text fw={'bold'} c={'blue'} hidden={!questionIndex} style={{
                    minWidth: 80,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    Câu hỏi {questionIndex}:
                </Text>
                <MyHtmlWrapper html={title || ""} />
            </MyFlexRow>
            <Space />
            {children}
        </Box>
    )
}
