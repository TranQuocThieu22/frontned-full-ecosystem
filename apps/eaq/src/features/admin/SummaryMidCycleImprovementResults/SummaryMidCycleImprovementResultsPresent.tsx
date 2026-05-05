import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import ILimitationDetail from "@/shared/interfaces/limitation/ILimitationDetail";
import { Box, Flex } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, } from "react";
import InsertEvidenceButtonChoose from "./InsertEvidence/InsertEvidenceButtonChoose";
import "./styles.css";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";

export interface SummaryMidCycleImprovementResultsPresentRef {
  getLimitationReport: () => string;
  setLimitationReport: (report: string) => void;
  handleSaveReport: () => Promise<void>;
}

export interface SummaryMidCycleImprovementResultsPresentProps {
  data?: ILimitationDetail;
  eaqLimitationId?: number;
  viewOnly?: boolean;
  onLimitationReportChange?: (report: string) => void;
  isLoading?: boolean;
}

const SummaryMidCycleImprovementResultsPresent = forwardRef<
  SummaryMidCycleImprovementResultsPresentRef,
  SummaryMidCycleImprovementResultsPresentProps
>(
  (
    {
      data,
      eaqLimitationId,
      viewOnly = false,
      onLimitationReportChange,
      isLoading,
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(data?.limitationReport ?? "");
    const [pathFile, setPathFile] = useState<string>("");
    const htmlTag = "A";
    const folderPath = "minhchung";
    const idName = "evidenceId";

    const discViewFile = useDisclosure();
    const editorRef = useRef<HTMLDivElement>(null);
    const limitationReportRef = useRef<string>(data?.limitationReport ?? "");

    // Debounced value để giảm số lần notify parent (300ms delay)
    const [debouncedValue] = useDebouncedValue(value, 300);

    const mutionGetEvidenceVersion = useMutation({
      mutationFn: async (id: number): Promise<IEnvidenceVersion[]> => {
        const response =
          await service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId(
            {
              evidenceId: id,
            }
          );
        return response.data.data;
      },
      onSuccess: () => { },
    });

    useImperativeHandle(ref, () => ({
      getLimitationReport: () => limitationReportRef.current,
      setLimitationReport: (report: string) => {
        limitationReportRef.current = report;
        setValue(report); // Cập nhật state để re-render editor
      },
      handleSaveReport,
    }));

    useEffect(() => {
      limitationReportRef.current = value;
    }, [value]);

    // Chỉ notify parent khi debouncedValue thay đổi (giảm tải cho parent)
    // Bỏ qua khi rỗng vì đã có effect notify ngay lập tức bên dưới
    useEffect(() => {
      if (debouncedValue !== "") {
        onLimitationReportChange?.(debouncedValue);
      }
    }, [debouncedValue, onLimitationReportChange]);

    // Notify ngay lập tức khi nội dung bị xóa hết để cập nhật bảng tức thời
    useEffect(() => {
      if (value === "") {
        onLimitationReportChange?.("");
      }
    }, [value, onLimitationReportChange]);

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

    const parseHrefParams = useCallback((href: string) => {
      try {
        const url = new URL(href, window.location.origin);
        return {
          evidenceId: url.searchParams.get(idName),
          code: url.searchParams.get("code"),
          pathFile: href.split("?")[0]?.split(`/${folderPath}/`)[1],
        };
      } catch {
        return { evidenceId: null, code: null, pathFile: null };
      }
    }, []);

    const showEvidenceNotFound = useCallback(() => {
      notifications.show({
        message: "Không tìm thấy file minh chứng",
        color: "red",
      });
    }, []);

    const openCurrentEvidenceVersion = useCallback(
      (versions: IEnvidenceVersion[] | undefined | null) => {
        if (!versions || versions.length === 0) {
          showEvidenceNotFound();
          return;
        }

        for (const version of versions) {
          if (version.isCurrent) {
            setPathFile(version.attachFilePath ?? "");
            discViewFile[1].open();
            return;
          }
        }

        // If no current version flagged
        showEvidenceNotFound();
      },
      [discViewFile, showEvidenceNotFound]
    );

    const fetchAndOpenEvidence = useCallback(
      (evidenceId: number) => {
        mutionGetEvidenceVersion.mutate(evidenceId, {
          onSuccess: openCurrentEvidenceVersion,
          onError: showEvidenceNotFound,
        });
      },
      [mutionGetEvidenceVersion, openCurrentEvidenceVersion, showEvidenceNotFound]
    );

    const handleLinkClick = useCallback(
      (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.tagName !== htmlTag) return;

        event.preventDefault();

        const linkElement = target as HTMLAnchorElement;
        const href = linkElement.getAttribute("href");
        if (!href || !href.startsWith(`/${folderPath}/`)) return;

        const { evidenceId } = parseHrefParams(href);
        if (!evidenceId) return showEvidenceNotFound();

        fetchAndOpenEvidence(Number(evidenceId));
      },
      [parseHrefParams, fetchAndOpenEvidence, showEvidenceNotFound]
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
        const evidenceId = match[1] || "";
        const code = match[2];

        // Tăng số đếm cho evidenceId này
        evidenceCount[evidenceId] = (evidenceCount[evidenceId] || 0) + 1;

        // Tạo link mới với thứ tự dựa trên số lần xuất hiện của evidenceId
        const newLink = `<A href="/${folderPath}/?evidenceId=${evidenceId}&code=${encodeURIComponent(
          code ?? ""
        )}">[${code}] (${evidenceCount[evidenceId]})</A>`;

        // Thay thế link cũ bằng link mới
        updatedReport = updatedReport.replace(fullMatch, newLink);
      });

      // Chỉ cập nhật nếu có thay đổi
      if (updatedReport !== currentReport) {
        // Update both the state and the ref synchronously so consumers
        // reading via getLimitationReport() see the latest content immediately
        limitationReportRef.current = updatedReport;
        setValue(updatedReport);
      }

      return Promise.resolve();
    };

    useEffect(() => {
      const editorElement =
        editorRef.current || document.querySelector(".ProseMirror");

      if (!editorElement) return;

      editorElement.addEventListener("click", handleLinkClick);
      return () => editorElement.removeEventListener("click", handleLinkClick);
    }, [handleLinkClick]);

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
            eaqLimitationId={eaqLimitationId}
            handleUse={handleUse}
          />
        </Flex>
        <Box ref={editorRef} className="html-content">
          <CustomRichTextEditor
            value={value}
            onChange={setValue}
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

SummaryMidCycleImprovementResultsPresent.displayName =
  "SummaryMidCycleImprovementResultsPresent";

export default SummaryMidCycleImprovementResultsPresent;
