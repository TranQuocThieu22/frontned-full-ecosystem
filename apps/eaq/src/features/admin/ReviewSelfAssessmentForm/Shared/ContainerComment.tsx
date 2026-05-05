import { IComment } from "@/shared/interfaces/comment/IComment";
import {
    ActionIcon,
    Box,
    Group,
    Indicator,
    LoadingOverlay,
    Paper,
    ScrollArea,
    ScrollAreaProps,
    Stack,
    StackProps,
    Text
} from "@mantine/core";
import { IconCancel, IconChevronLeft, IconChevronRight, IconMessage, IconTrash, IconX } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
    comments?: IComment[]
    h?: number | string
    onDelete?: (id?: number, value?: any) => void
    scrollAreaProps?: ScrollAreaProps
    containerProps?: StackProps
    chevronIconPosition?: "left" | "right"
    widthOnOpen?: number | string
    widthOnClose?: number | string
}

const HIGHLIGHT_COLOR = '#f3e8ff';

export default function ContainerComment({ comments, h, onDelete, containerProps, scrollAreaProps, chevronIconPosition = "left", widthOnOpen = 250, widthOnClose = 25 }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Stack
            gap={0}
            style={{
                width: isCollapsed ? widthOnClose : widthOnOpen,
                transition: "width 0.3s ease",
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
                <Group gap={1}>
                    {/* {(isCollapsed && chevronIconPosition === "left") && (<IconChevronLeft size={16} />)} */}
                    {(!isCollapsed && chevronIconPosition === "left") && (<IconChevronRight size={16} />)}
                    {(isCollapsed && chevronIconPosition === "right") && (<IconChevronRight size={16} />)}
                    {(!isCollapsed && chevronIconPosition === "right") && (<IconChevronLeft size={16} />)}
                    {isCollapsed
                        ? <Indicator inline label={comments?.length || 0} size={16}>
                            <IconMessage />
                        </Indicator>
                        : `Bình luận (${comments?.length || 0})`
                    }
                </Group>
            </Box>
            <ScrollArea hidden={isCollapsed} h={h || 400} {...scrollAreaProps}>
                <Stack gap="sm" px="sm">
                    {comments?.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
                    ))}
                    {comments?.length === 0 || !comments && (
                        <Text size="sm" c="dimmed" ta="center">
                            Chưa có bình luận nào
                        </Text>
                    )}
                </Stack>
            </ScrollArea>
        </Stack>
    )
};

type CommentItemProps = {
    comment?: any
    onDelete?: (id?: number, value?: any) => void
}

function CommentItem({ onDelete, comment }: CommentItemProps) {
    const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    return (
        <Paper
            shadow="sm"
            p="sm"
            style={{
                borderLeft: `4px solid ${HIGHLIGHT_COLOR}`,
                backgroundColor: HIGHLIGHT_COLOR,
            }}
            pos="relative"
        >
            {idToDelete === comment.id
                ? <LoadingOverlay
                    visible={true}
                    loaderProps={{
                        children: <Group>
                            <ActionIcon
                                variant="light"
                                size="lg"
                                radius="xl"
                                color="red"
                                loading={loading}
                                onClick={async () => {
                                    try {
                                        setLoading(true);
                                        onDelete && await onDelete(comment.id, comment);
                                    } finally {
                                        setIdToDelete(undefined);
                                        setLoading(false);
                                    }
                                }}
                            >
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={2.5} />
                            </ActionIcon>
                            <ActionIcon
                                variant="light"
                                size="lg"
                                radius="xl"
                                color="gray"
                                disabled={loading}
                                onClick={() => {
                                    setIdToDelete(undefined);
                                }}
                            >
                                <IconCancel style={{ width: '70%', height: '70%' }} stroke={2.5} />
                            </ActionIcon>
                        </Group>
                    }}
                />
                : <></>
            }

            <Group justify="space-between" align="flex-start" mb="xs" wrap="nowrap">
                <Text size="xs" c="dimmed">
                    ID: {comment.id}
                </Text>
                <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="red"
                    onClick={async () => {
                        setIdToDelete(comment.id);
                    }}
                >
                    <IconX size={12} />
                </ActionIcon>
            </Group>

            <Text size="xs" c="dimmed" mb="xs" style={{ fontStyle: 'italic' }}>
                &quot;{comment.content}&quot;
            </Text>

            <Text size="sm">
                {comment.commentDetail}
            </Text>
        </Paper>
    )
}
