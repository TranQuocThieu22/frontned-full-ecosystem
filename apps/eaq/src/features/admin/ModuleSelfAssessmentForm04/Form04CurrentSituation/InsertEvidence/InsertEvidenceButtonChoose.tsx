import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDescription } from "@tabler/icons-react";
import { useMemo } from "react";
import EvidenceTable from "./EvidenceTable";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface InsertEvidenceButtonChooseProps {
  handleUse: (id: number, code: string, pathFile: string) => void;
  selfAssessmentList?: ISelfAssessment[];
}

export default function InsertEvidenceButtonChoose({
  handleUse,
  selfAssessmentList,
}: InsertEvidenceButtonChooseProps) {
  const disc = useDisclosure();

  const handleUseTemp = (id: number, code: string, pathFile: string) => {
    handleUse(id, code, pathFile);
    disc[1].close();
  };

  const evidenceQuery = useCustomReactQuery({
    queryKey: ["Evidence_List"],
    axiosFn: () => service_EAQEvidence.GetAllEvidences(),
  });

  const evidenceHistory = useMemo(() => {
    const allEvidenceHistories =
      selfAssessmentList?.flatMap(
        (selfAssessment) => selfAssessment.eaqEvidenceUsageHistories
      ) ?? [];

    // Lọc bỏ những evidence có eaqEvidenceId = null
    const filteredEvidenceHistories = allEvidenceHistories.filter(
      (evidence) => evidence?.eaqEvidenceId !== null
    );

    // Lọc trùng theo eaqEvidenceId
    const uniqueEvidenceHistories = filteredEvidenceHistories.filter(
      (evidence, index, array) =>
        array.findIndex((e) => e?.eaqEvidenceId === evidence?.eaqEvidenceId) ===
        index
    );

    return uniqueEvidenceHistories;
  }, [selfAssessmentList]);

  return (
    <CustomButtonModal
      disclosure={disc}
      buttonProps={{
        children: "Chèn minh chứng",
        leftSection: <IconFileDescription />,
        mt: 4,
        mb: 4,
      }}
      modalProps={{
        size: "100%",
        title: "Chèn minh chứng",
      }}
    >
      <CustomTabs
        tabs={[
          {
            label: "Danh sách minh chứng liên quan",
            children: (
              <EvidenceTable
                handleUse={handleUseTemp}
                data={evidenceHistory.filter(
                  (evidence) => evidence !== undefined
                )}
                isUsed={true}
              />
            ),
          },
          {
            label: "Danh mục minh chứng",
            children: (
              <EvidenceTable
                handleUse={handleUseTemp}
                data={evidenceQuery.data ?? []}
                isUsed={false}
              />
            ),
          },
        ]}
      />
    </CustomButtonModal>
  );
}
