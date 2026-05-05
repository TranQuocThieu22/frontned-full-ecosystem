import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Box, Flex } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, } from "react";
import { useEvidenceClickHandler } from "./hooks/useEvidenceClickHandler";
import InsertEvidenceButtonChoose from "./InsertEvidence/InsertEvidenceButtonChoose";
import "./style.css";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { GetClosestAnchor, MoveCaretAfter, ParseHtmlToNode } from "@/features/admin/ModuleSelfAssessmentForm04/Utils/EditorUtils";

export interface Form04CurrentSituationInputRef {
  getDescription: () => string;
  setDescription: (description: string) => void;
  setOnChangeCallback: (callback: () => void) => void;
  deleteEvidence: (uniqueId: string) => void;
}

export interface Form04CurrentSituationInputProps {
  data?: ISelfAssessment;
  onDescriptionChange?: (description: string) => void;
  onEvidenceAdded?: () => void;
  selfAssessmentList?: ISelfAssessment[];
  isEditMode?: boolean;
}

const Form04CurrentSituationInput = forwardRef<
  Form04CurrentSituationInputRef,
  Form04CurrentSituationInputProps
>(
  (
    {
      data,
      onDescriptionChange,
      onEvidenceAdded,
      selfAssessmentList,
      isEditMode,
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(data?.description || "");
    const htmlTag = "a";
    const folderPath = "minhchung";
    const idName = "evidenceId";
    const { editorRef, pathFile, discViewFile } = useEvidenceClickHandler();

    const descriptionRef = useRef<string>(data?.description ?? "");
    const onChangeCallbackRef = useRef<(() => void) | null>(null);

    // Cập nhật value khi menuData thay đổi
    useEffect(() => {
      if (data?.description !== undefined) {
        setValue(data.description);
        descriptionRef.current = data.description;
      }
    }, [data?.description]);

    // Debounced value để giảm số lần notify parent (300ms delay)
    const [debouncedValue] = useDebouncedValue(value, 300);

    // Chỉ gọi callback với debouncedValue để tránh gọi quá nhiều lần
    useEffect(() => {
      onDescriptionChange?.(debouncedValue);
    }, [debouncedValue, onDescriptionChange]);

    // Callback riêng cho việc thêm minh chứng - không bị debounce
    const handleImmediateChange = useCallback(
      (newValue: string) => {
        onDescriptionChange?.(newValue);
      },
      [onDescriptionChange]
    );

    // Cập nhật descriptionRef khi value thay đổi
    useEffect(() => {
      descriptionRef.current = value;
    }, [value]);

    const insertTextAtCursor = useCallback(
      (link: string) => {
        const editor = document.querySelector('.ProseMirror, [contenteditable="true"]') as HTMLElement;

        // Helper: Cập nhật state nhanh
        const update = (content: string) => {
          setValue(content);
          handleImmediateChange(content);
        };

        // Guard 1: Không có editor hoặc không có vùng chọn hợp lệ -> Chèn cuối
        const selection = window.getSelection();
        if (!editor || !selection?.rangeCount || !editor.contains(selection.anchorNode)) {
          update((value || "") + link);
          return;
        }

        editor.focus();
        let range = selection.getRangeAt(0);

        // Bước 1: Nếu đang ở trong thẻ <a>, nhảy ra ngoài trước khi chèn
        const anchor = GetClosestAnchor(range, editor);
        if (anchor) {
          range = MoveCaretAfter(anchor, selection);
        }

        // Bước 2: Chèn nội dung
        range.deleteContents();
        const nodeToInsert = ParseHtmlToNode(link);

        if (!nodeToInsert) return; // Guard 3: Link không hợp lệ

        range.insertNode(nodeToInsert);

        // Bước 3: Hoàn tất - Đưa con trỏ ra sau node vừa chèn và đồng bộ state
        MoveCaretAfter(nodeToInsert, selection);
        update(editor.innerHTML);
      },
      [value, handleImmediateChange, setValue]
    );
    // Function để tạo unique reportName
    const generateUniqueReportName = useCallback((baseCode: string): string => {
      const currentContent = descriptionRef.current || "";

      // Tìm tất cả các reportName đã sử dụng - match cả chữ hoa và chữ thường
      const linkPattern = new RegExp(
        `<[Aa][^>]*href="[^"]*"[^>]*>(?:[\\s\\S]*?)\\[([^\\]]+)\\]\\s*(?:\\((\\d+)\\))?(?:[\\s\\S]*?)<\\/[Aa]>`,
        "gi"
      );

      const matches = Array.from(currentContent.matchAll(linkPattern));
      const usedReportNames = new Set<string>();

      matches.forEach((match) => {
        const reportName = match[1];
        usedReportNames.add(reportName || '');
      });

      // Kiểm tra baseCode có bị trùng không
      if (!usedReportNames.has(baseCode)) {
        return baseCode;
      }

      // Tìm số tiếp theo
      let counter = 1;
      let newReportName = `${baseCode} (${counter})`;

      while (usedReportNames.has(newReportName)) {
        counter++;
        newReportName = `${baseCode} (${counter})`;
      }

      return newReportName;
    }, []);

    const handleUse = useCallback(
      (id: number, code: string, pathFile: string) => {
        const uniqueReportName = generateUniqueReportName(code);
        const encodedCode = encodeURIComponent(code);

        // Tạo uniqueId cho minh chứng này
        const uniqueId = `${id}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        const link = `<${htmlTag} href="/${folderPath}/${pathFile}?${idName}=${id}&code=${encodedCode}&uniqueId=${uniqueId}">[${uniqueReportName}] </${htmlTag}>`;

        insertTextAtCursor(link);

        // Gọi callback để thông báo có minh chứng mới được thêm
        onEvidenceAdded?.();

        // Gọi callback để thông báo có thay đổi
        if (onChangeCallbackRef.current) {
          onChangeCallbackRef.current();
        }
      },
      [insertTextAtCursor, generateUniqueReportName, onEvidenceAdded]
    );

    const deleteEvidence = useCallback(
      (uniqueId: string) => {
        const currentContent = descriptionRef.current || "";
        if (!currentContent) return;

        // 1. Chuẩn bị Regex (Sử dụng Guard Clause để kiểm tra sự tồn tại của link)
        const escapedUniqueId = uniqueId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const linkPattern = new RegExp(
          `<[Aa]\\s+[^>]*href="[^"]*uniqueId=${escapedUniqueId}[^"]*"[^>]*>\\[.*?\\]\\s*<\\/[Aa]>`,
          "gi"
        );

        // 2. Thay thế nội dung (Sử dụng .replace trực tiếp với regex /g)
        // Không cần dùng vòng lặp for, string.replace(regex, "") sẽ xóa tất cả các match
        const updatedContent = currentContent.replace(linkPattern, "");

        // 3. Guard: Nếu nội dung không thay đổi (không tìm thấy match) thì dừng lại
        if (updatedContent === currentContent) return;

        // 4. Cập nhật dữ liệu đồng bộ
        descriptionRef.current = updatedContent;
        setValue(updatedContent);
        handleImmediateChange(updatedContent);

        // 5. Thông báo thay đổi (Không cần setTimeout)
        if (onChangeCallbackRef.current) {
          onChangeCallbackRef.current();
        }
      },
      [handleImmediateChange, setValue] // Nhớ thêm setValue vào dependency nếu cần
    );
    useImperativeHandle(
      ref,
      () => ({
        getDescription: () => descriptionRef.current,
        setDescription: (description: string) => {
          descriptionRef.current = description;
          setValue(description); // Cập nhật state để re-render editor
          handleImmediateChange(description); // Cập nhật table ngay lập tức
        },
        setOnChangeCallback: (callback: () => void) => {
          onChangeCallbackRef.current = callback;
        },
        deleteEvidence: (uniqueId: string) => {
          deleteEvidence(uniqueId);
        },
      }),
      [deleteEvidence, handleImmediateChange]
    );

    return (
      <>
        <Flex gap={4} justify="start" align={"center"}>
          {isEditMode && (
            <InsertEvidenceButtonChoose
              handleUse={handleUse}
              selfAssessmentList={selfAssessmentList}
            />
          )}
          <CustomButtonViewFileAPI
            filePath={pathFile}
            externalDisc={discViewFile}
            buttonProps={{ hidden: true }}
          />
        </Flex>
        <Box ref={editorRef} className="html-content">
          {isEditMode ? (
            <CustomRichTextEditor
              value={value}
              onChange={setValue}
              richTextEditorProps={{
                h: 380,
              }}
              scrollAreaAutosizeProps={{
                mah: 320,
              }}
            />
          ) : (
            <Box
              h={360}
              p="6"
              bdrs={"xs"}
              style={{ overflow: "auto", border: "1px solid #ccc" }}
            >
              <CustomHtmlWrapper html={value} />
            </Box>
          )}
        </Box>
      </>
    );
  }
);

Form04CurrentSituationInput.displayName = "Form04CurrentSituationInput";

export default Form04CurrentSituationInput;
