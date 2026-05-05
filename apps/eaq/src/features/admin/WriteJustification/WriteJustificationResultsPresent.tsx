import { Box, Flex } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  forwardRef,
  lazy,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useEvidenceClickHandler } from "./hooks/useEvidenceClickHandler";
import InsertEvidenceButtonChoose from "./InsertEvidence/InsertEvidenceButtonChoose";
import "./styles.css";
import IRequirementDetail from "@/shared/interfaces/requirement/IRequirementDetail";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
// import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
const CustomRichTextEditor = lazy(() => import("@aq-fe/core-ui/shared/components/input/CustomRichTextEditor").then(module => ({ default: module.CustomRichTextEditor })));
export interface WriteJustificationResultsPresentRef {
  getRequirementReport: () => string;
  setRequirementReport: (report: string) => void;
  handleSaveReport: () => Promise<void>;
}

export interface WriteJustificationResultsPresentProps {
  data?: IRequirementDetail;
  eaqRequirementId?: number;
  viewOnly?: boolean;
  onRequirementReportChange?: (report: string) => void;
  isLoading?: boolean;
}

const WriteJustificationResultsPresent = forwardRef<
  WriteJustificationResultsPresentRef,
  WriteJustificationResultsPresentProps
>(
  (
    {
      data,
      eaqRequirementId,
      viewOnly = false,
      onRequirementReportChange,
      isLoading,
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(data?.requirementReport ?? "");
    const htmlTag = "A";
    const folderPath = "minhchung";
    const idName = "evidenceId";

    const requirementReportRef = useRef<string>(data?.requirementReport ?? "");

    const { editorRef, pathFile, discViewFile } = useEvidenceClickHandler();

    // Debounced value để giảm số lần notify parent (300ms delay)
    const [debouncedValue] = useDebouncedValue(value, 300);

    useImperativeHandle(ref, () => ({
      getRequirementReport: () => requirementReportRef.current,
      setRequirementReport: (report: string) => {
        requirementReportRef.current = report;
        setValue(report); // Cập nhật state để re-render editor
      },
      handleSaveReport,
    }));

    useEffect(() => {
      requirementReportRef.current = value;
    }, [value]);

    // Chỉ notify parent khi debouncedValue thay đổi (giảm tải cho parent)
    // Bỏ qua khi rỗng vì đã có effect notify ngay lập tức bên dưới
    useEffect(() => {
      if (debouncedValue !== "") {
        onRequirementReportChange?.(debouncedValue);
      }
    }, [debouncedValue, onRequirementReportChange]);

    // Notify ngay lập tức khi nội dung bị xóa hết để cập nhật bảng tức thời
    useEffect(() => {
      if (value === "") {
        onRequirementReportChange?.("");
      }
    }, [value, onRequirementReportChange]);

    const insertTextAtCursor = useCallback(
      (placeholder: string, link: string) => {
        const editorElement = document.querySelector(
          '.ProseMirror, [contenteditable="true"]'
        ) as HTMLElement;

        if (!editorElement) {
          setValue((prev) => (prev || "") + link);
          return;
        }

        editorElement.focus();

        // Try using execCommand first
        if (document.queryCommandSupported("insertText")) {
          const success = document.execCommand(
            "insertText",
            false,
            placeholder
          );
          if (success) {
            setTimeout(() => {
              setValue((prev) => (prev || "").replace(placeholder, link));
            }, 50);
            return;
          }
        }

        // Fallback to selection API
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const textNode = document.createTextNode(placeholder);
          range.insertNode(textNode);

          setTimeout(() => {
            setValue((prev) => (prev || "").replace(placeholder, link));
          }, 50);
          return;
        }

        // Final fallback - append to end
        setValue((prev) => (prev || "") + link);
      },
      []
    );

    const handleUse = useCallback(
      (id: number, code: string, pathFile: string) => {
        const encodedCode = encodeURIComponent(code);
        const link = `<${htmlTag} href="/${folderPath}/${pathFile}?${idName}=${id}&code=${encodedCode}">[${code}]</${htmlTag}>`;
        const placeholder = `__PLACEHOLDER_${Date.now()}__`;

        insertTextAtCursor(placeholder, link);
      },
      [insertTextAtCursor]
    );

    const handleSaveReport = async () => {
      const currentReport = value;

      // Tìm tất cả các link chứa evidenceId trong report
      const linkPattern =
        /<A[^>]*href="[^"]*evidenceId=(\d+)[^"]*"[^>]*>\[([^\]]+)\]\s*(?:\((\d+)\))?<\/A>/gi;

      const matches = Array.from(currentReport.matchAll(linkPattern));

      if (matches.length === 0) return;

      // Tạo bản đồ để đếm số lần xuất hiện của từng evidenceId
      const evidenceCount: Record<string, number> = {};

      // Thay thế từng link với thứ tự dựa trên số lần xuất hiện của evidenceId
      let updatedReport = currentReport;

      matches.forEach((match) => {
        const fullMatch = match[0];
        const evidenceId = match[1] ?? "";
        const code = match[2] ?? "";

        // Tăng số đếm cho evidenceId này
        evidenceCount[evidenceId] = (evidenceCount[evidenceId] || 0) + 1;

        // Tạo link mới với thứ tự dựa trên số lần xuất hiện của evidenceId
        const newLink = `<A href="/${folderPath}/?evidenceId=${evidenceId}&code=${encodeURIComponent(
          code
        )}">[${code}] (${evidenceCount[evidenceId]})</A>`;

        // Thay thế link cũ bằng link mới
        updatedReport = updatedReport.replace(fullMatch, newLink);
      });

      // Chỉ cập nhật nếu có thay đổi
      if (updatedReport !== currentReport) {
        // Update both the state and the ref synchronously so consumers
        // reading via getRequirementReport() see the latest content immediately
        requirementReportRef.current = updatedReport;
        setValue(updatedReport);
      }

      return Promise.resolve();
    };

    const renderViewOnlyContent = () => (
      <Box
        h={360}
        p="6"
        bdrs="xs"
        style={{ overflow: "auto", border: "1px solid #ccc" }}
      >
        <Box ref={editorRef} className="html-content">
          <CustomHtmlWrapper html={value} />
        </Box>
      </Box>
    );

    const renderEditableContent = () => (
      <>
        <Flex gap={4} justify="start" align={"center"}>
          <InsertEvidenceButtonChoose
            eaqRequirementId={eaqRequirementId}
            handleUse={handleUse}
          />
        </Flex>
        <Box ref={editorRef} className="html-content">
          <CustomRichTextEditor
            value={value}
            onChange={setValue}
            richTextEditorProps={{
              h: 400,
            }}
            scrollAreaAutosizeProps={{
              mah: 350,
            }}
          />
        </Box>
      </>
    );

    return (
      <CustomFieldset title="Nội dung báo cáo cải tiến hiện tại">
        <CustomButtonViewFileAPI
          filePath={pathFile}
          externalDisc={discViewFile}
          buttonProps={{ hidden: true }}
        />
        {viewOnly || isLoading
          ? renderViewOnlyContent()
          : renderEditableContent()}
      </CustomFieldset>
    );
  }
);

WriteJustificationResultsPresent.displayName =
  "WriteJustificationResultsPresent";

export default WriteJustificationResultsPresent;
