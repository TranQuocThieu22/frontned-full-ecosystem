import {ActionIcon, Box, BoxProps, Button, Group, Modal, Stack, Text, Textarea, Typography} from '@mantine/core';
import {useForm} from '@mantine/form';
import {IconMessagePlus} from '@tabler/icons-react';
import {RefObject, useCallback, useEffect, useRef, useState} from 'react';

type CutomTypographyProps = {
    htmlContent?: string,
    onSubmit?: (value: { content: string, commentDetail: string }) => void;
    containerProps?: BoxProps
}

export default function HtmlWraperComment({ htmlContent, onSubmit, containerProps }: CutomTypographyProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (<>
        <Box style={{ position: "relative", overflowY: "auto" }} {...containerProps}>
            {!htmlContent || htmlContent.trim() === ""
                ? <Text size="sm" c="dimmed" ta="center">
                    Chưa có nội dung
                </Text>
                : <></>
            }
            <div ref={containerRef}>
                <Typography
                    component="div"
                    dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
                />
            </div>
            <CommentModal containerRef={containerRef} onSubmit={onSubmit} />
        </Box>
    </>);
}

type CommentModalProps = {
    containerRef?: RefObject<HTMLDivElement | null>
    onSubmit?: (value: any) => void;
}

function CommentModal({ containerRef, onSubmit }: CommentModalProps) {
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedContent, setSelectedContent] = useState("");
    const [commentDetail, setCommentDetail] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<any>({
        mode: "uncontrolled",
        initialValues: {
            commentDetail: "",
            content: selectedContent
        },
        validate: {
            content: (value) => (value && value.trim() ? null : "Vui lòng nhập nội dung đề cập"),
            commentDetail: (value) => value && value.trim() ? null : "Vui lòng nhập nhận xét",
        }
    });

    const openCommentModal = useCallback((content: string) => {
        setSelectedContent(content);
        form.setFieldValue("content", content)
        setCommentDetail("");
        setModalOpened(true);
    }, []);

    const closeCommentModal = useCallback(() => {
        setModalOpened(false);
        setSelectedContent("");
        setCommentDetail("");
    }, []);

    return (
        <>
            <SelectionMenu
                onCommentButtonClick={(text) => openCommentModal(text)}
                containerRef={containerRef}
            />
            <Modal
                size="70%"
                opened={modalOpened}
                onClose={() => {
                    closeCommentModal();
                    form.reset();
                }}
                title="Thêm bình luận"
                centered
            >
                <Stack gap="md">
                    <Textarea
                        label="Nội dung đề cập"
                        value={selectedContent}
                        onChange={(e) => {
                            setSelectedContent(e.currentTarget.value);
                            form.setFieldValue("content", e.currentTarget.value)
                        }}
                        minRows={1}
                        maxRows={6}
                        placeholder="Nhập nội dung đề cập"
                        error={form.errors.content}
                    />

                    <Textarea
                        label="Nhận xét và yêu cầu hiệu chỉnh"
                        value={commentDetail}
                        onChange={(e) => {
                            setCommentDetail(e.currentTarget.value)
                            form.setFieldValue("commentDetail", e.currentTarget.value)
                        }}
                        minRows={8}
                        maxRows={8}
                        placeholder="Nhập nhận xét và yêu cầu hiệu chỉnh"
                        error={form.errors.commentDetail}
                    />

                    <Group justify="flex-end">
                        <Button variant="subtle" onClick={closeCommentModal}>
                            Hủy
                        </Button>
                        <Button
                            loading={loading}
                            onClick={async () => {
                                const result = form.validate();
                                if (result.hasErrors) return;
                                try {
                                    setLoading(true);
                                    onSubmit && await onSubmit(form.getValues());
                                } finally {
                                    setModalOpened(false);
                                    setLoading(false);
                                }
                            }}
                        >
                            Lưu
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}

type SelectionMenuProps = {
    containerRef?: RefObject<HTMLDivElement | null>
    onCommentButtonClick: (text: string) => void
}

function SelectionMenu({ onCommentButtonClick, containerRef }: SelectionMenuProps) {
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleMouseUp = () => {
            const container = containerRef?.current;
            const selection = window.getSelection();

            if (container && selection && containerRef?.current?.contains(selection.anchorNode)) {
                const newRange = standardizationSelection(selection, containerRef?.current);
                if (!newRange) return;
                const rect = newRange.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const x = rect.right - containerRect.left + container.scrollLeft - container.clientLeft - 15;
                const y = rect.top - containerRect.top + container.scrollTop - container.clientTop - 35;
                setPos({
                    x: x,
                    y: y < 0 ? 10 : y,
                });
            } else {
                setPos(null);
            }
        };

        const handleSelectionChange = () => {
            const selection = window.getSelection();
            const selectedText = selection?.toString();

            if (!selectedText || !selectedText.trim()) {
                setPos(null);
                return;
            }
        }

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener('selectionchange', handleSelectionChange);
        }
    }, [containerRef]);

    if (!pos) return null;

    return (
        <Box
            p={1}
            style={{
                borderRadius: 10,
                position: "absolute",
                top: pos.y,
                left: pos.x,
                transform: "translateX(-50%)",
                zIndex: 2,
                border: "gray 1px solid",
                backgroundColor: "var(--mantine-color-default-hover)"
            }}
        >
            <ActionIcon
                variant="transparent"
                onClick={() => {
                    const selection = window.getSelection();
                    onCommentButtonClick(selection?.toString() || "");
                    selection?.removeAllRanges();
                    setPos(null);
                }}
            >
                <IconMessagePlus style={{ width: 20, height: 20 }} strokeWidth={2} />
            </ActionIcon>
        </Box>
    );
}


function standardizationSelection(sel: Selection | null, allowed?: HTMLDivElement | null) {
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;

    if (!allowed?.contains(sel.anchorNode) && !allowed?.contains(sel.focusNode)) return;

    const selRange = sel.getRangeAt(0).cloneRange();
    const allowedRange = document.createRange();
    allowedRange.selectNodeContents(allowed);

    // --- CHUẨN HÓA range (start < end) ---
    if (selRange.startContainer === selRange.endContainer &&
        selRange.startOffset > selRange.endOffset) {
        const tmp = selRange.startOffset;
        selRange.setStart(selRange.startContainer, selRange.endOffset);
        selRange.setEnd(selRange.endContainer, tmp);
    } else if (selRange.startContainer.compareDocumentPosition(selRange.endContainer) & Node.DOCUMENT_POSITION_PRECEDING) {
        // nếu start ở sau end => đảo ngược
        const sc = selRange.startContainer, so = selRange.startOffset;
        const ec = selRange.endContainer, eo = selRange.endOffset;
        selRange.setStart(ec, eo);
        selRange.setEnd(sc, so);
    }

    // --- clamp selection vào trong allowed ---
    const newRange = document.createRange();

    // start = max(sel.start, allowed.start)
    if (selRange.compareBoundaryPoints(Range.START_TO_START, allowedRange) < 0) {
        newRange.setStart(allowedRange.startContainer, allowedRange.startOffset);
    } else {
        newRange.setStart(selRange.startContainer, selRange.startOffset);
    }

    // end = min(sel.end, allowed.end)
    if (selRange.compareBoundaryPoints(Range.END_TO_END, allowedRange) > 0) {
        newRange.setEnd(allowedRange.endContainer, allowedRange.endOffset);
    } else {
        newRange.setEnd(selRange.endContainer, selRange.endOffset);
    }

    sel.removeAllRanges();
    sel.addRange(newRange);
    return newRange;
}
