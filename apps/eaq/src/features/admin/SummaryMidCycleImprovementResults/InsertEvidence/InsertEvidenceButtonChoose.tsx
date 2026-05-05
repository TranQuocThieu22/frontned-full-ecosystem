import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDescription } from "@tabler/icons-react";
import { useMemo } from "react";
import EvidenceTable from "./EvidenceTable";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface InsertEvidenceButtonChooseProps {
  handleUse: (id: number, code: string, pathFile: string) => void;
  eaqLimitationId?: number;
}

export default function InsertEvidenceButtonChoose({
  handleUse,
  eaqLimitationId,
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

  const limitationsDetailQuery = useCustomReactQuery({
    queryKey: ["limitationsDetailQuery", eaqLimitationId],
    axiosFn: () =>
      service_EAQLimitation.getEAQLimitationDetailsById({
        eaqLimitationId: eaqLimitationId,
      }),
    options: {
      enabled: !!eaqLimitationId,
    },
  });

  const EvidenceHistory = useMemo(() => {
    if (!limitationsDetailQuery.data) return [];

    const allEvidence = Object.values(limitationsDetailQuery.data.eaqReports || {})
      .flat()
      .map((report) => report.eaqEvidenceUsageHistories)
      .flat()
      .filter((evidence) => evidence !== undefined);

    // Lọc trùng lặp dựa trên id
    const uniqueEvidence = allEvidence.filter(
      (evidence, index, self) =>
        index === self.findIndex((e) => e.id === evidence.id)
    );

    return uniqueEvidence;
  }, [limitationsDetailQuery.data]);

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
                data={EvidenceHistory ?? []}
              />
            ),
          },
          {
            label: "Danh mục minh chứng",
            children: (
              <EvidenceTable
                handleUse={handleUseTemp}
                data={evidenceQuery.data ?? []}
              />
            ),
          },
        ]}
      />
    </CustomButtonModal>
  );
}
