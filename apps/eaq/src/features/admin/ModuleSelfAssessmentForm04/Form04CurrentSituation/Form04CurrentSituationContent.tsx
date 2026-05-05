import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from "react";
import Form04CurrentSituationInput, { Form04CurrentSituationInputRef, } from "./Form04CurrentSituationInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import Form04CurrentSituationEvidenceTable from "@/features/admin/ModuleSelfAssessmentForm04/Form04CurrentSituation/Form04CurrentSituationEvidenceTable";
import { updateReportNamesInDescription } from "@/features/admin/ModuleSelfAssessmentForm04/Utils/EvidenceReportNameUpdater";
import { BuildSelfAssessment } from "@/features/admin/ModuleSelfAssessmentForm04/Utils/SelfAssessmentBuilder";
import { ValidateUniqueReportNames } from "@/features/admin/ModuleSelfAssessmentForm04/Utils/EvidenceReportNameValidator";
import { ParseEvidenceFromInput } from "@/features/admin/ModuleSelfAssessmentForm04/Utils/EvidenceParser";
import { useReportNameChanges } from "@/features/admin/ModuleSelfAssessmentForm04/Hooks/useReportNameChanges";
import { useEvidenceExtraction } from "@/features/admin/ModuleSelfAssessmentForm04/Hooks/useEvidenceExtraction";
import { useEvidenceColumns } from "@/features/admin/ModuleSelfAssessmentForm04/Hooks/useEvidenceColumns";
interface Form04CurrentSituationContentProps {
  setCurrentSituation: (value: ISelfAssessment) => void;
  editMode?: boolean;
  value?: ISelfAssessment;
  selfAssessmentList?: ISelfAssessment[];
}
export type Form04CurrentSituationContentRef = {
  save: () => ISelfAssessment | undefined;
};
function Form04CurrentSituationContent(
  {
    setCurrentSituation,
    editMode,
    value: defaultValue,
    selfAssessmentList,
  }: Form04CurrentSituationContentProps,
  ref: React.Ref<Form04CurrentSituationContentRef>
) {
  const [description, setDescription] = useState<string>(
    defaultValue?.description ?? ""
  );

  const inputRef = useRef<Form04CurrentSituationInputRef>(null);

  // Custom hooks
  const evidenceIds = useEvidenceExtraction(description, editMode);
  const {
    reportNameChanges,
    updateReportName,
    clearReportNameChanges,
    removeDuplicates,
  } = useReportNameChanges();

  // Sync description from props
  useEffect(() => {
    setDescription(defaultValue?.description ?? "");
  }, [defaultValue?.description]);

  // Query
  const evideneAllQuery = useCustomReactQuery({
    queryKey: ["Q_Evidence_content"],
    axiosFn: async () => service_EAQEvidence.GetAllEvidences(),
  });

  // Parse evidence from HTML
  const parsedEvidence = useMemo(() => {
    if (!editMode) return [];
    return ParseEvidenceFromInput(
      description,
      evidenceIds,
      evideneAllQuery.data ?? []
    );
  }, [editMode, description, evidenceIds, evideneAllQuery.data]);

  // Filtered data based on mode
  const filteredEvidenceData = useMemo(() => {
    return editMode
      ? parsedEvidence
      : defaultValue?.eaqEvidenceUsageHistories ?? [];
  }, [editMode, parsedEvidence, defaultValue?.eaqEvidenceUsageHistories]);

  // Callbacks
  const handleDescriptionChange = useCallback((newDescription: string) => {
    setDescription(newDescription);
  }, []);

  const handleEvidenceAdded = useCallback(() => {
    const currentContent = inputRef.current?.getDescription() || "";
    if (!currentContent) return;

    const extractedIds = Array.from(
      currentContent.matchAll(/evidenceId=(\d+)/g)
    ).map((match) => Number(match[1]));

    setDescription(currentContent);
  }, []);

  const handleDeleteEvidence = useCallback(
    (uniqueId: string) => {
      inputRef.current?.deleteEvidence(uniqueId);

      updateReportName(uniqueId, ""); // Or use a dedicated remove method
    },
    [updateReportName]
  );

  const checkDuplicate = useCallback(
    (rowKey: string, currentReportName: string) => {
      const allChangedNames = Array.from(reportNameChanges.values());
      const duplicateCount = allChangedNames.filter(
        (name) => name === currentReportName
      ).length;
      return duplicateCount > 1;
    },
    [reportNameChanges]
  );

  // Columns
  const columns = useEvidenceColumns(
    editMode,
    reportNameChanges,
    updateReportName,
    checkDuplicate
  );

  // Save handler
  const handleSave = useCallback(() => {
    const { isValid, duplicatedIds } = ValidateUniqueReportNames(
      filteredEvidenceData,
      reportNameChanges
    );

    if (!isValid) {
      notifications.show({
        message: "Mã minh chứng báo cáo bị trùng. Vui lòng nhập tên khác.",
        color: "red",
      });
      removeDuplicates(duplicatedIds);
      return;
    }

    const currentDescription = inputRef.current?.getDescription() || "";
    const updatedDescription = updateReportNamesInDescription(
      currentDescription,
      filteredEvidenceData,
      reportNameChanges
    );

    if (updatedDescription !== currentDescription) {
      inputRef.current?.setDescription(updatedDescription);
      setDescription(updatedDescription);
      clearReportNameChanges();
      notifications.show({
        message: "Đã cập nhật mã minh chứng báo cáo",
        color: "green",
      });
    }

    const latest = BuildSelfAssessment(
      defaultValue,
      updatedDescription,
      filteredEvidenceData
    );

    return latest;
  }, [
    filteredEvidenceData,
    reportNameChanges,
    defaultValue,
    removeDuplicates,
    clearReportNameChanges,
  ]);

  useImperativeHandle(ref, () => ({ save: handleSave }), [handleSave]);

  // Sync to parent - debounced to avoid excessive updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentSituation({
        ...defaultValue,
        description,
        eaqEvidenceUsages: filteredEvidenceData.map((item) => ({
          eaqEvidenceId: item.id,
          reportName: item.reportName,
        })),
        eaqEvidenceUsageHistories: filteredEvidenceData,
      });
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [description, filteredEvidenceData, setCurrentSituation, defaultValue]);

  return (
    <>
      <Form04CurrentSituationInput
        ref={inputRef}

        data={defaultValue}
        onDescriptionChange={handleDescriptionChange}
        onEvidenceAdded={handleEvidenceAdded}
        selfAssessmentList={selfAssessmentList}
        isEditMode={editMode}
      />
      <Form04CurrentSituationEvidenceTable
        editMode={editMode}
        columns={columns}
        filteredEvidenceData={filteredEvidenceData}
        handleSave={handleSave}
        handleDeleteEvidence={handleDeleteEvidence}
      />
    </>
  );
}

export default forwardRef(Form04CurrentSituationContent);
