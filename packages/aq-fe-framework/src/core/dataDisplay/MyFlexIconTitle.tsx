import { Flex, Text, TextProps } from "@mantine/core"
import { ReactNode } from "react"

interface MyFlexIconTitleProps {
    icon?: ReactNode,
    children?: ReactNode
    textProps?: TextProps
}

export function MyFlexIconTitle(props: MyFlexIconTitleProps) {
    return (
        <Flex direction={"row"} align={"center"} gap={'xs'} {...props}>
            {props.icon}
            <Text size="lg" fw={700} {...props.textProps}>{props?.children}</Text>
        </Flex>
    )
}
