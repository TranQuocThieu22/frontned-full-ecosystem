"use client"
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Box, Text } from "@mantine/core";
import { MyFlexRow, MyHtmlWrapper } from "aq-fe-framework/components";
import { ReactNode } from "react";

export interface MyQuestionContainerProps {
    questionIndex?: number
    title?: string;
    children?: ReactNode
}



export default function MyQuestionContainer({
    questionIndex,
    title,
    children
}: MyQuestionContainerProps) {
    return (
        <Box py={'md'} px={"xl"} style={{ border: "1px solid gray", borderRadius: "10px" }} bg={colorsObject.mantineBackgroundBlueLight}>
            <MyFlexRow gap={5} align={"baseline"}>
                <Text fw={'bold'} c={'blue'} style={{
                    minWidth: 80,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    Câu hỏi {questionIndex}:
                </Text>
                <MyHtmlWrapper html={title || ""} />
            </MyFlexRow>
            {children}
        </Box>
    )
}
