import {Box, Stack, StackProps} from "@mantine/core";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import {ReactNode, useState} from "react";

type Props = {
    containerProps?: StackProps
    chevronIconPosition?: "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
    children?: ReactNode,
    widthOnOpen?: number | string
    widthOnClose?: number | string
}

export default function CollapsedContainer({ containerProps, chevronIconPosition, children, widthOnOpen = 250, widthOnClose = 23 }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Stack
            gap={0}
            style={{
                width: isCollapsed ? widthOnClose : widthOnOpen,
                transition: "width 0.3s ease",
                position: "sticky",
                top: 50,
                height: "100%",
                zIndex: 2,
            }}
            {...containerProps}
        >
            <Box
                onClick={() => setIsCollapsed((prev) => !prev)}
                style={{
                    cursor: "pointer",
                    padding: "6px 0px",
                    textAlign: chevronIconPosition,
                    fontSize: 12,
                    fontWeight: 500,
                }}
            >
                {isCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
            </Box>
            {children}
        </Stack>
    )
};
