import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { ActionIcon, Box, Button, Center, Group, Modal, Stack, Text, Textarea, Typography, } from "@mantine/core";
import { IconMessagePlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type CustomTypographyProps = {
  selfAssessmentId: number;
  htmlContent?: string;
  h?: number | string;
  selfAssessmentType: number;
};

export default function CustomTypography({
  htmlContent,
  h,
  selfAssessmentId,
  selfAssessmentType,
}: CustomTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isContentEmpty = (content?: string) => {
    if (!content) return true;
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent.length === 0;
  };

  return (
    <>
      <div style={{ position: "relative", height: h }}>
        {isContentEmpty(htmlContent) ? (
          <Center p={"md"}>
            <Text c={"gray"} fw={"600"} size="15px" fs={"italic"}>
              Không có dữ liệu!
            </Text>
          </Center>
        ) : (
          <div ref={containerRef} style={{ height: "100%", overflow: "auto" }}>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: htmlContent || "" }} />
          </div>
        )}
        <CommentModal containerRef={containerRef} selfAssessmentId={selfAssessmentId} selfAssessmentType={selfAssessmentType} />
      </div>
    </>
  );
}

type CommentModalProps = {
  containerRef?: RefObject<HTMLDivElement | null>;
  selfAssessmentId: number;
  selfAssessmentType: number;
};

function CommentModal({ containerRef, selfAssessmentId, selfAssessmentType }: CommentModalProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [commentDetail, setCommentDetail] = useState("");
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async (data: {
      content: string;
      commentDetail: string;
      eaqSelfAssessmentId: number;
      isExternal: boolean;
    }) => {
      return service_EAQComment.create(data);
    },
    onSuccess: () => {
      //NOTE: Cập nhật lại dữ liệu mới ở ShareExternalAssessmentEvaluate với selfAssessmentType
      queryClient.invalidateQueries({
        queryKey: ["CommentQuery", selfAssessmentType],
      });
      closeCommentModal();
    },
  });

  const openCommentModal = useCallback((content: string) => {
    setSelectedContent(content);
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
      <SelectionMenu onComment={(text) => openCommentModal(text)} containerRef={containerRef} />
      <Modal
        size="70%"
        opened={modalOpened}
        onClose={closeCommentModal}
        title="Thêm bình luận"
        centered
      >
        <Stack gap="md">
          <div>
            <Text size="sm" mb={5}>
              Nội dung đề cập:
            </Text>
            <Textarea
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.currentTarget.value)}
              minRows={1}
              maxRows={6}
              placeholder="Nhập nội dung đề cập"
            />
          </div>

          <div>
            <Text size="sm" mb={5}>
              Nhận xét và yêu cầu hiệu chỉnh:
            </Text>
            <Textarea
              value={commentDetail}
              onChange={(e) => setCommentDetail(e.currentTarget.value)}
              minRows={8}
              maxRows={8}
              placeholder="Nhập nhận xét và yêu cầu hiệu chỉnh"
            />
          </div>

          <Group justify="flex-end">
            <Button variant="subtle" onClick={closeCommentModal}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                createCommentMutation.mutate({
                  content: selectedContent,
                  commentDetail: commentDetail,
                  eaqSelfAssessmentId: selfAssessmentId,
                  isExternal: true,
                });
              }}
              loading={createCommentMutation.isPending}
            >
              Lưu
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

type SelectionMenuProps = {
  containerRef?: RefObject<HTMLDivElement | null>;
  onComment: (text: string) => void;
};

function SelectionMenu({ onComment, containerRef }: SelectionMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const container = containerRef?.current;
      const selection = window.getSelection();

      if (
        container &&
        selection &&
        !selection.isCollapsed &&
        containerRef?.current?.contains(selection.anchorNode)
      ) {
        const newRange = standardizationSelection(selection, containerRef?.current);
        if (!newRange) return;
        const rect = newRange.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setPos({
          x: rect.right - containerRect.left + container.scrollLeft - container.clientLeft,
          y: rect.top - containerRect.top + container.scrollTop - container.clientTop - 43,
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
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
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
        backgroundColor: "var(--mantine-color-default-hover)",
      }}
    >
      <ActionIcon
        variant="transparent"
        onClick={() => {
          const text = window.getSelection()?.toString() || "";
          onComment(text);
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
  if (
    selRange.startContainer === selRange.endContainer &&
    selRange.startOffset > selRange.endOffset
  ) {
    const tmp = selRange.startOffset;
    selRange.setStart(selRange.startContainer, selRange.endOffset);
    selRange.setEnd(selRange.endContainer, tmp);
  } else if (
    selRange.startContainer.compareDocumentPosition(selRange.endContainer) &
    Node.DOCUMENT_POSITION_PRECEDING
  ) {
    // nếu start ở sau end => đảo ngược
    const sc = selRange.startContainer,
      so = selRange.startOffset;
    const ec = selRange.endContainer,
      eo = selRange.endOffset;
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
